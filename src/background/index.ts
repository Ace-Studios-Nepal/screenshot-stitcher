import { addCapture, getAllCaptures } from '../storage/db';
import { CaptureItem } from '../types';

async function updateBadgeCount(): Promise<void> {
  try {
    const captures = await getAllCaptures();
    const count = captures.length;
    if (count > 0) {
      await chrome.action.setBadgeText({ text: String(count) });
      await chrome.action.setBadgeBackgroundColor({ color: '#2563eb' });
    } else {
      await chrome.action.setBadgeText({ text: '' });
    }
  } catch (err) {
    console.error('Failed to update badge:', err);
  }
}

async function captureActiveTab(): Promise<CaptureItem> {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab || !activeTab.id || activeTab.windowId === undefined) {
    throw new Error('No active tab found to capture.');
  }

  const url = activeTab.url || '';
  const restrictedProtocols = [
    'chrome://',
    'chrome-extension://',
    'edge://',
    'brave://',
    'opera://',
    'vivaldi://',
    'arc://',
    'about:',
    'devtools://',
    'chrome-untrusted://',
    'view-source:',
  ];
  if (restrictedProtocols.some((protocol) => url.startsWith(protocol))) {
    throw new Error('Browser internal pages cannot be captured due to browser security restrictions.');
  }

  // Get viewport dimensions and DPR from the active tab if possible
  let dpr = 1;
  try {
    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: () => ({
        dpr: window.devicePixelRatio || 1,
        title: document.title,
      }),
    });
    if (injectionResults && injectionResults[0]?.result) {
      dpr = injectionResults[0].result.dpr || 1;
    }
  } catch {
    // Content script might not run on some pages (e.g. web store), fall back to dpr 1
    dpr = 1;
  }

  // Capture visible viewport as PNG
  const dataUrl = await chrome.tabs.captureVisibleTab(activeTab.windowId, { format: 'png' });
  if (!dataUrl) {
    throw new Error('Failed to capture viewport: image data is empty.');
  }

  // Retrieve intrinsic dimensions from Blob
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const width = bitmap.width;
  const height = bitmap.height;
  bitmap.close();

  const existingCaptures = await getAllCaptures();
  const newCapture: CaptureItem = {
    id: `capture_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    order: existingCaptures.length,
    dataUrl,
    width,
    height,
    dpr,
    pageTitle: activeTab.title || 'Untitled Page',
    pageUrl: activeTab.url || '',
    timestamp: Date.now(),
  };

  await addCapture(newCapture);
  await updateBadgeCount();

  // Notify active extension views (sidepanel, popup, editor)
  try {
    chrome.runtime.sendMessage({ type: 'CAPTURES_UPDATED' }).catch(() => {});
  } catch {
    // Ignore when no listener is currently mounted
  }

  return newCapture;
}

// Handle runtime messages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'CAPTURE_CURRENT_TAB') {
    captureActiveTab()
      .then((item) => sendResponse({ success: true, capture: item }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // Keep channel open for async response
  }

  if (message.type === 'OPEN_EDITOR_TAB') {
    const editorUrl = chrome.runtime.getURL('editor.html');
    chrome.tabs.query({ url: editorUrl }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.update(tabs[0].id, { active: true });
      } else {
        chrome.tabs.create({ url: editorUrl });
      }
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.type === 'OPEN_SIDE_PANEL') {
    // Chrome SidePanel API support
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.windowId && chrome.sidePanel && chrome.sidePanel.open) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId }).catch((err) => {
          console.warn('Side panel open error in background handler:', err);
        });
      }
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.type === 'UPDATE_BADGE') {
    updateBadgeCount().then(() => sendResponse({ success: true }));
    return true;
  }
});

// Handle keyboard shortcut commands
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'capture-viewport') {
    try {
      await captureActiveTab();
    } catch (err) {
      console.error('Command capture failed:', err);
    }
  }
});

// Update badge on service worker startup
updateBadgeCount();
