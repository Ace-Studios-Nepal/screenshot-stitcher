import React, { useEffect, useState, useCallback } from 'react';
import { CaptureItem } from '../types';
import { getAllCaptures, deleteCapture, clearAllCaptures } from '../storage/db';
import { ConfirmModal } from '../components/Modal';
import {
  Camera,
  ExternalLink,
  PanelRightOpen,
  Trash2,
  RotateCcw,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Popup: React.FC = () => {
  const [captures, setCaptures] = useState<CaptureItem[]>([]);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clearConfirmOpen, setClearConfirmOpen] = useState<boolean>(false);

  const loadCaptures = useCallback(async () => {
    try {
      const items = await getAllCaptures();
      setCaptures(items);
    } catch (err) {
      console.error('Failed to load captures:', err);
    }
  }, []);

  useEffect(() => {
    loadCaptures();
  }, [loadCaptures]);

  const handleCapture = async () => {
    setCapturing(true);
    setErrorMessage(null);
    try {
      const res = await chrome.runtime.sendMessage({ type: 'CAPTURE_CURRENT_TAB' });
      if (res && res.success) {
        await loadCaptures();
      } else {
        setErrorMessage(res?.error || 'Failed to capture screenshot.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with extension.');
    } finally {
      setCapturing(false);
    }
  };

  const handleOpenSidePanel = async () => {
    // In Chromium, chrome.sidePanel.open() requires a user gesture.
    // Opening it directly from this click event handler preserves the user gesture.
    if (typeof chrome !== 'undefined' && chrome.sidePanel && chrome.sidePanel.open) {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.windowId) {
          await chrome.sidePanel.open({ windowId: tab.windowId });
          window.close();
          return;
        }
      } catch (err) {
        console.warn('Could not open side panel directly from popup:', err);
      }
    }
    chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' }).catch(() => {});
    window.close();
  };

  const handleOpenEditor = () => {
    chrome.runtime.sendMessage({ type: 'OPEN_EDITOR_TAB' }).catch(() => {
      window.open(chrome.runtime.getURL('editor.html'), '_blank');
    });
    window.close();
  };

  const handleDelete = async (id: string) => {
    await deleteCapture(id);
    await loadCaptures();
    chrome.runtime.sendMessage({ type: 'UPDATE_BADGE' }).catch(() => {});
  };

  const handleConfirmClear = async () => {
    setClearConfirmOpen(false);
    await clearAllCaptures();
    await loadCaptures();
    chrome.runtime.sendMessage({ type: 'UPDATE_BADGE' }).catch(() => {});
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-xs font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900">
            Screenshot Stitcher
          </span>
        </div>

        <button
          type="button"
          onClick={handleOpenSidePanel}
          className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
          title="Open pinned side panel"
        >
          <PanelRightOpen className="w-3.5 h-3.5" />
          <span>Side Panel</span>
        </button>
      </div>

      {/* Main Buttons */}
      <div className="p-3.5 bg-white border-b border-slate-200 space-y-2">
        <button
          type="button"
          onClick={handleCapture}
          disabled={capturing}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold shadow-sm transition-all cursor-pointer"
        >
          {capturing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Capturing...</span>
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              <span>Capture Viewport</span>
            </>
          )}
        </button>

        {errorMessage && (
          <div className="p-2 rounded bg-red-50 border border-red-200 text-red-600 text-[11px]">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Captures List */}
      <div className="max-h-56 overflow-y-auto p-3 space-y-2">
        {captures.length === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <p className="font-medium text-slate-600">No captures yet</p>
            <p className="text-[11px] mt-0.5">Click 'Capture Viewport' to begin.</p>
          </div>
        ) : (
          captures.map((item, idx) => (
            <div
              key={item.id}
              className="group flex items-center gap-2 p-1.5 bg-white rounded-lg border border-slate-200 shadow-xs"
            >
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <div className="w-10 h-7 rounded overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                <img
                  src={item.dataUrl}
                  alt={`Capture ${idx + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-slate-800">
                  {item.pageTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 p-1 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {captures.length > 0 && (
        <div className="p-3 bg-white border-t border-slate-200 space-y-1.5 mt-auto">
          <button
            type="button"
            onClick={handleOpenEditor}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Studio Editor ({captures.length})</span>
            <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setClearConfirmOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] text-slate-400 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Session</span>
          </button>
        </div>
      )}

      {/* In-app Clear Confirmation Modal */}
      <ConfirmModal
        isOpen={clearConfirmOpen}
        title="Clear Session Captures?"
        message="This will remove all captures in this session."
        confirmText="Clear All"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmClear}
        onCancel={() => setClearConfirmOpen(false)}
      />
    </div>
  );
};
