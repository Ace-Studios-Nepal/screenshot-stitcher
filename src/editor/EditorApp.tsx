import React, { useEffect, useState, useCallback, useRef, useTransition } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  CaptureItem,
  StitchConfig,
  AnnotationItem,
  AnnotationTool,
} from '../types';
import {
  getAllCaptures,
  addCapture,
  deleteCapture,
  reorderCaptures,
  clearAllCaptures,
  getSavedStitchConfig,
  saveStitchConfig,
  defaultStitchConfig,
} from '../storage/db';
import { stitchScreenshots, StitchResult } from '../utils/stitch';
import { exportToPng, exportToPdf } from '../utils/export';
import { getCompositedCanvas } from '../utils/annotation';
import { generateSampleCaptures } from '../utils/sampleData';
import { SortableCaptureItem } from './components/SortableCaptureItem';
import { StitchControls } from './components/StitchControls';
import { AnnotationToolbar } from './components/AnnotationToolbar';
import { CanvasWorkspace } from './components/CanvasWorkspace';
import { ConfirmModal, AlertModal } from '../components/Modal';
import { StitchifyLogo } from '../components/StitchifyLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  Download,
  FileText,
  Camera,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Upload,
} from 'lucide-react';

export const EditorApp: React.FC = () => {
  const [, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect whether running inside Chrome extension context
  const isExtension = typeof chrome !== 'undefined' && Boolean(chrome?.runtime?.id);

  // Core state
  const [captures, setCaptures] = useState<CaptureItem[]>([]);
  const [config, setConfig] = useState<StitchConfig>(defaultStitchConfig);
  const [stitchResult, setStitchResult] = useState<StitchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isStitching, setIsStitching] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // In-app Modals state
  const [clearConfirmOpen, setClearConfirmOpen] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'warning' | 'info' | 'success';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = (
    title: string,
    message: string,
    type: 'error' | 'warning' | 'info' | 'success' = 'error'
  ) => {
    setAlertState({ isOpen: true, title, message, type });
  };

  // Annotation state & Undo/Redo stack
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [history, setHistory] = useState<AnnotationItem[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Active annotation tool options
  const [activeTool, setActiveTool] = useState<AnnotationTool>('select');
  const [strokeColor, setStrokeColor] = useState<string>('#ef4444');
  const [strokeWidth, setStrokeWidth] = useState<number>(4);

  // UI view state
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Load initial captures and config
  const loadData = useCallback(async () => {
    try {
      const [storedCaptures, storedConfig] = await Promise.all([
        getAllCaptures(),
        getSavedStitchConfig(),
      ]);
      setCaptures(storedCaptures);
      setConfig(storedConfig);
    } catch (err) {
      console.error('Failed to load storage data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Safely listen for new captures from background or sidepanel in extension context
    if (typeof chrome !== 'undefined' && chrome?.runtime?.onMessage) {
      const messageListener = (msg: any) => {
        if (msg.type === 'CAPTURES_UPDATED') {
          loadData();
        }
      };
      chrome.runtime.onMessage.addListener(messageListener);
      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    }
  }, [loadData]);

  // Re-stitch whenever captures or config change
  useEffect(() => {
    let isCancelled = false;

    async function runStitch() {
      if (captures.length === 0) {
        setStitchResult(null);
        return;
      }
      setIsStitching(true);
      try {
        const result = await stitchScreenshots(captures, config);
        if (!isCancelled) {
          startTransition(() => {
            setStitchResult(result);
          });
        }
      } catch (err) {
        console.error('Stitching failed:', err);
      } finally {
        if (!isCancelled) setIsStitching(false);
      }
    }

    runStitch();

    return () => {
      isCancelled = true;
    };
  }, [captures, config]);

  // Handle configuration changes
  const handleConfigChange = (newConfig: StitchConfig) => {
    setConfig(newConfig);
    saveStitchConfig(newConfig).catch(console.error);
  };

  // Reorder captures via Drag and Drop
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = captures.findIndex((c) => c.id === active.id);
    const newIndex = captures.findIndex((c) => c.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(captures, oldIndex, newIndex);
      setCaptures(newItems);
      await reorderCaptures(newItems.map((c) => c.id));
    }
  };

  // Delete a capture
  const handleDeleteCapture = async (id: string) => {
    await deleteCapture(id);
    const updated = await getAllCaptures();
    setCaptures(updated);
    if (typeof chrome !== 'undefined' && chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: 'UPDATE_BADGE' }).catch(() => {});
    }
  };

  // Clear session with in-app modal
  const handleConfirmClearAll = async () => {
    setClearConfirmOpen(false);
    await clearAllCaptures();
    setCaptures([]);
    setStitchResult(null);
    setAnnotations([]);
    setHistory([[]]);
    setHistoryIndex(0);
    if (typeof chrome !== 'undefined' && chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: 'UPDATE_BADGE' }).catch(() => {});
    }
  };

  // Load sample demo captures
  const handleLoadDemo = async () => {
    try {
      const samples = generateSampleCaptures();
      for (const item of samples) {
        await addCapture(item);
      }
      await loadData();
      showNotice('Loaded 3 sample screenshots into studio!');
    } catch (err: any) {
      showAlert('Demo Error', `Could not load sample data: ${err.message}`, 'error');
    }
  };

  // Upload local images
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentCount = captures.length;
    let addedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const el = new Image();
          el.onload = () => resolve(el);
          el.onerror = reject;
          el.src = dataUrl;
        });

        const newCapture: CaptureItem = {
          id: `upload_${Date.now()}_${i}`,
          order: currentCount + addedCount,
          dataUrl,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          dpr: 1,
          pageTitle: file.name.replace(/\.[^/.]+$/, ''),
          pageUrl: 'local://file',
          timestamp: Date.now(),
        };

        await addCapture(newCapture);
        addedCount++;
      } catch (err) {
        console.error('Failed to parse uploaded image:', err);
      }
    }

    if (e.target) e.target.value = '';
    await loadData();
    showNotice(`Added ${addedCount} uploaded image(s)!`);
  };

  // Annotations history management
  const pushAnnotation = (item: AnnotationItem) => {
    const newAnnotations = [...annotations, item];
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setAnnotations(newAnnotations);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setAnnotations(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setAnnotations(history[newIndex]);
    }
  };

  const handleClearAnnotations = () => {
    if (annotations.length === 0) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setAnnotations([]);
  };

  // Trigger browser capture from editor
  const handleTriggerCapture = async () => {
    if (!isExtension || !chrome?.runtime?.sendMessage) {
      showAlert(
        'Web Demo Mode',
        'Direct webpage capture requires the extension installed in a Chromium-based browser (Chrome, Brave, Edge, Opera, Arc) or Firefox.\n\nIn this web studio demo, you can click "Load 3 Sample Screenshots" or "Upload Images" to test stitching, spacing, annotations, and PNG/PDF exports!',
        'info'
      );
      return;
    }

    try {
      const res = await chrome.runtime.sendMessage({ type: 'CAPTURE_CURRENT_TAB' });
      if (res && res.success) {
        await loadData();
      } else if (res?.error) {
        showAlert('Capture Notice', res.error, 'warning');
      }
    } catch (err: any) {
      showAlert('Capture Failed', err.message || 'Could not communicate with background script.', 'error');
    }
  };

  // Export actions
  const getExportCanvas = () => {
    if (!stitchResult?.canvas) return null;
    return getCompositedCanvas(stitchResult.canvas, annotations);
  };

  const handleExportPng = async () => {
    const canvas = getExportCanvas();
    if (!canvas) return;
    setIsExporting(true);
    setExportDropdownOpen(false);
    try {
      await exportToPng(canvas);
      showNotice('PNG downloaded successfully!');
    } catch (err: any) {
      showAlert('PNG Export Failed', err.message || 'Could not generate PNG image.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = async (mode: 'single-page' | 'multi-page') => {
    const canvas = getExportCanvas();
    if (!canvas) return;
    setIsExporting(true);
    setExportDropdownOpen(false);
    try {
      await exportToPdf(canvas, undefined, mode);
      showNotice(`PDF (${mode === 'single-page' ? 'Continuous' : 'Paged A4'}) downloaded!`);
    } catch (err: any) {
      showAlert('PDF Export Failed', err.message || 'Could not generate PDF document.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const showNotice = (msg: string) => {
    setExportNotice(msg);
    setTimeout(() => setExportNotice(null), 3500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading studio session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">
      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Navbar */}
      <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-5 flex items-center justify-between flex-shrink-0 z-30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <StitchifyLogo className="w-8 h-8" />
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              Stitch<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">ify</span>{' '}
              <span className="text-xs font-normal text-blue-600 dark:text-blue-400 ml-1">Studio</span>
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              {captures.length} {captures.length === 1 ? 'capture' : 'captures'}
            </span>
            {stitchResult && (
              <span className="font-mono text-slate-500 dark:text-slate-400">
                {stitchResult.width} × {stitchResult.height}px
              </span>
            )}
            {isStitching && (
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 animate-pulse">
                <Sparkles className="w-3 h-3" /> Stitching...
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Load Sample Demo Button */}
          <button
            type="button"
            onClick={handleLoadDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-colors"
            title="Load 3 sample screenshots to test the studio"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Load Demo</span>
          </button>

          {/* Upload Images Button */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent transition-colors"
            title="Upload screenshots from your device"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Upload</span>
          </button>

          {/* Capture Tab (Extension) */}
          <button
            type="button"
            onClick={handleTriggerCapture}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent transition-colors"
            title={isExtension ? 'Capture current tab viewport' : 'Browser Extension required for live capture'}
          >
            <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Capture Tab</span>
          </button>

          {captures.length > 0 && (
            <button
              type="button"
              onClick={() => setClearConfirmOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              title="Clear all captures"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              disabled={captures.length === 0 || isExporting}
              onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting...' : 'Export Output'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {exportDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs">
                <button
                  type="button"
                  onClick={handleExportPng}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">PNG Image</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">High-resolution continuous image</p>
                  </div>
                </button>

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                <button
                  type="button"
                  onClick={() => handleExportPdf('single-page')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">PDF (Continuous)</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Single long document</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleExportPdf('multi-page')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">PDF (Paged A4)</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Auto-sliced standard A4 pages</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Reorderable List & Settings */}
        <aside className="w-80 bg-slate-50/95 dark:bg-slate-900/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0 z-20 overflow-hidden transition-colors">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Captured Screenshots
            </h2>
            <p className="text-[11px] text-slate-500">
              Drag handles to reorder vertical sequence.
            </p>
          </div>

          {/* Draggable Captures List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {captures.length === 0 ? (
              <div className="text-center py-8 px-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl space-y-3 bg-white/60 dark:bg-transparent">
                <Camera className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">No screenshots loaded</p>
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleLoadDemo}
                    className="w-full py-1.5 px-3 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-medium transition-colors"
                  >
                    ✨ Load 3 Sample Screenshots
                  </button>
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-transparent text-xs font-medium transition-colors"
                  >
                    📁 Upload Image Files
                  </button>
                </div>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={captures.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {captures.map((c, idx) => (
                    <SortableCaptureItem
                      key={c.id}
                      capture={c}
                      index={idx}
                      onDelete={handleDeleteCapture}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>

          {/* Stitch Configuration Controls */}
          {captures.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <StitchControls config={config} onChange={handleConfigChange} />
            </div>
          )}
        </aside>

        {/* Center: Canvas Workspace & Annotation Overlay */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-200/60 dark:bg-slate-950 transition-colors">
          {/* Top floating annotation toolbar */}
          {captures.length > 0 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <AnnotationToolbar
                activeTool={activeTool}
                onSelectTool={setActiveTool}
                strokeColor={strokeColor}
                onSelectColor={setStrokeColor}
                strokeWidth={strokeWidth}
                onSelectStrokeWidth={setStrokeWidth}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onClearAnnotations={handleClearAnnotations}
                annotationCount={annotations.length}
              />
            </div>
          )}

          {/* Canvas viewport */}
          <CanvasWorkspace
            baseCanvas={stitchResult?.canvas || null}
            annotations={annotations}
            activeTool={activeTool}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            onAddAnnotation={pushAnnotation}
            onLoadDemo={handleLoadDemo}
            onUploadClick={handleUploadClick}
          />

          {/* Export Success Notification Toast */}
          {exportNotice && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-xl shadow-xl animate-bounce">
              {exportNotice}
            </div>
          )}
        </main>
      </div>

      {/* In-app Confirm Reset Modal */}
      <ConfirmModal
        isOpen={clearConfirmOpen}
        title="Reset Studio Session?"
        message="This will permanently delete all captured screenshots and annotations in this session. This action cannot be undone."
        confirmText="Yes, Clear All"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmClearAll}
        onCancel={() => setClearConfirmOpen(false)}
      />

      {/* In-app Alert Modal */}
      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={() => setAlertState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
