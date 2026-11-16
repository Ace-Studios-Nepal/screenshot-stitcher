import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, Type } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-100 transform transition-all scale-100"
        role="dialog"
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-xl flex-shrink-0 ${
              isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
            }`}
          >
            {isDestructive ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export interface AlertModalProps {
  isOpen: boolean;
  type?: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  type = 'info',
  title,
  message,
  buttonText = 'Got it',
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape' || e.key === 'Enter') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconMap = {
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  };

  const bgMap = {
    error: 'bg-red-500/10',
    warning: 'bg-amber-500/10',
    info: 'bg-blue-500/10',
    success: 'bg-emerald-500/10',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-100">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl flex-shrink-0 ${bgMap[type]}`}>{iconMap[type]}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed whitespace-pre-line">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export interface TextPromptModalProps {
  isOpen: boolean;
  strokeColor: string;
  onAddText: (text: string, fontSize: number) => void;
  onCancel: () => void;
}

export const TextPromptModal: React.FC<TextPromptModalProps> = ({
  isOpen,
  strokeColor,
  onAddText,
  onCancel,
}) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setText('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddText(text.trim(), fontSize);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-100">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Type className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Add Text Callout</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Annotation Text
            </label>
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Bug in navigation bar..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-400">Font Size</label>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[
                { label: 'S', size: 18 },
                { label: 'M', size: 24 },
                { label: 'L', size: 36 },
              ].map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => setFontSize(opt.size)}
                  className={`w-7 h-6 rounded text-xs font-semibold transition-all ${
                    fontSize === opt.size
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {text.trim() && (
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
              <span
                style={{
                  color: strokeColor,
                  fontSize: `${Math.min(fontSize, 20)}px`,
                }}
                className="font-semibold bg-slate-800/90 px-2 py-0.5 rounded-md truncate max-w-full"
              >
                {text}
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shadow-md transition-all cursor-pointer"
            >
              Add Callout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
