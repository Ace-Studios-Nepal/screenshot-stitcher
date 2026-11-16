import React, { useEffect, useState, useCallback } from 'react';
import { CaptureItem } from '../types';
import { getAllCaptures, deleteCapture, clearAllCaptures } from '../storage/db';
import { ConfirmModal } from '../components/Modal';
import {
  Camera,
  ExternalLink,
  Trash2,
  RotateCcw,
  Layers,
  Sparkles,
  Command,
} from 'lucide-react';

export const SidePanel: React.FC = () => {
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

    const listener = (msg: any) => {
      if (msg.type === 'CAPTURES_UPDATED') {
        loadCaptures();
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
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
      setErrorMessage(err.message || 'Error communicating with extension background.');
    } finally {
      setCapturing(false);
    }
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

  const handleOpenEditor = () => {
    chrome.runtime.sendMessage({ type: 'OPEN_EDITOR_TAB' }).catch(() => {
      window.open(chrome.runtime.getURL('editor.html'), '_blank');
    });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans text-xs">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900">
            Screenshot Stitcher
          </span>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[11px]">
          {captures.length} {captures.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Main Action Bar */}
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

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <Command className="w-3 h-3" />
          <span>Shortcut: <kbd className="bg-slate-100 border border-slate-200 px-1 py-0.5 rounded font-mono text-slate-600">Alt+S</kbd></span>
        </div>

        {errorMessage && (
          <div className="p-2 rounded bg-red-50 border border-red-200 text-red-600 text-[11px]">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Captures List */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
        {captures.length === 0 ? (
          <div className="text-center py-10 px-4 text-slate-400 space-y-2">
            <Camera className="w-7 h-7 mx-auto opacity-40 text-slate-500" />
            <p className="font-medium text-slate-600">No screenshots yet</p>
            <p className="text-[11px] leading-relaxed">
              Scroll down on any webpage and click <strong>Capture Viewport</strong> to take screenshots.
            </p>
          </div>
        ) : (
          captures.map((item, idx) => (
            <div
              key={item.id}
              className="group relative flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </div>

              <div className="w-14 h-10 rounded overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                <img
                  src={item.dataUrl}
                  alt={`Capture ${idx + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-800 truncate text-[11px]" title={item.pageTitle}>
                  {item.pageTitle || 'Webpage Capture'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {item.width} × {item.height}px
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-all"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Actions */}
      {captures.length > 0 && (
        <div className="p-3 bg-white border-t border-slate-200 space-y-2">
          <button
            type="button"
            onClick={handleOpenEditor}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Studio & Stitch</span>
            <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setClearConfirmOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] text-slate-400 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All Captures</span>
          </button>
        </div>
      )}

      {/* In-app Clear Confirmation Modal */}
      <ConfirmModal
        isOpen={clearConfirmOpen}
        title="Clear All Captures?"
        message="This will remove all captured screenshots from this session."
        confirmText="Clear All"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmClear}
        onCancel={() => setClearConfirmOpen(false)}
      />
    </div>
  );
};
