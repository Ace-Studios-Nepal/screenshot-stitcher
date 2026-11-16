import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AnnotationItem, AnnotationTool } from '../../types';
import { renderAnnotations } from '../../utils/annotation';
import { TextPromptModal } from '../../components/Modal';
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCcw,
  Sparkles,
  Upload,
  Layers,
} from 'lucide-react';

interface Props {
  baseCanvas: HTMLCanvasElement | null;
  annotations: AnnotationItem[];
  activeTool: AnnotationTool;
  strokeColor: string;
  strokeWidth: number;
  onAddAnnotation: (item: AnnotationItem) => void;
  onLoadDemo: () => void;
  onUploadClick: () => void;
}

export const CanvasWorkspace: React.FC<Props> = ({
  baseCanvas,
  annotations,
  activeTool,
  strokeColor,
  strokeWidth,
  onAddAnnotation,
  onLoadDemo,
  onUploadClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [zoom, setZoom] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentAnnotation, setCurrentAnnotation] = useState<AnnotationItem | null>(null);

  // In-app Text Prompt Modal state
  const [textModalOpen, setTextModalOpen] = useState<boolean>(false);
  const [textClickPos, setTextClickPos] = useState<{ x: number; y: number } | null>(null);

  // Auto-fit zoom on initial load
  useEffect(() => {
    if (baseCanvas && containerRef.current) {
      const containerW = containerRef.current.clientWidth - 80;
      if (baseCanvas.width > containerW && containerW > 0) {
        const fitZoom = Math.max(0.1, Math.min(1, containerW / baseCanvas.width));
        setZoom(fitZoom);
      } else {
        setZoom(1);
      }
    }
  }, [baseCanvas?.width]);

  // Synchronize overlay canvas with base canvas dimensions
  useEffect(() => {
    const overlay = overlayCanvasRef.current;
    if (!overlay || !baseCanvas) return;

    overlay.width = baseCanvas.width;
    overlay.height = baseCanvas.height;

    const ctx = overlay.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, overlay.width, overlay.height);

    // Draw saved annotations
    renderAnnotations(ctx, annotations);

    // Draw active drawing preview
    if (currentAnnotation) {
      renderAnnotations(ctx, [currentAnnotation]);
    }
  }, [baseCanvas, annotations, currentAnnotation]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return { x: 0, y: 0 };

    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'select' || !baseCanvas) return;

    const coords = getCanvasCoords(e);

    if (activeTool === 'text') {
      setTextClickPos(coords);
      setTextModalOpen(true);
      return;
    }

    setIsDrawing(true);
    setStartPos(coords);

    const id = `annot_${Date.now()}`;

    if (activeTool === 'rectangle') {
      setCurrentAnnotation({
        id,
        type: 'rectangle',
        x: coords.x,
        y: coords.y,
        width: 0,
        height: 0,
        color: strokeColor,
        strokeWidth,
      });
    } else if (activeTool === 'arrow') {
      setCurrentAnnotation({
        id,
        type: 'arrow',
        startX: coords.x,
        startY: coords.y,
        endX: coords.x,
        endY: coords.y,
        color: strokeColor,
        strokeWidth,
      });
    } else if (activeTool === 'highlight') {
      setCurrentAnnotation({
        id,
        type: 'highlight',
        x: coords.x,
        y: coords.y,
        width: 0,
        height: 0,
        color: strokeColor,
        strokeWidth: 0,
        opacity: 0.35,
      });
    } else if (activeTool === 'pen') {
      setCurrentAnnotation({
        id,
        type: 'pen',
        points: [coords],
        color: strokeColor,
        strokeWidth,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !currentAnnotation) return;

    const coords = getCanvasCoords(e);

    if (currentAnnotation.type === 'rectangle' || currentAnnotation.type === 'highlight') {
      const x = Math.min(startPos.x, coords.x);
      const y = Math.min(startPos.y, coords.y);
      const width = Math.abs(coords.x - startPos.x);
      const height = Math.abs(coords.y - startPos.y);

      setCurrentAnnotation({
        ...currentAnnotation,
        x,
        y,
        width,
        height,
      });
    } else if (currentAnnotation.type === 'arrow') {
      setCurrentAnnotation({
        ...currentAnnotation,
        endX: coords.x,
        endY: coords.y,
      });
    } else if (currentAnnotation.type === 'pen') {
      setCurrentAnnotation({
        ...currentAnnotation,
        points: [...currentAnnotation.points, coords],
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    if (currentAnnotation) {
      let isValid = true;
      if (currentAnnotation.type === 'rectangle' || currentAnnotation.type === 'highlight') {
        if (currentAnnotation.width < 5 || currentAnnotation.height < 5) isValid = false;
      } else if (currentAnnotation.type === 'arrow') {
        const dist = Math.hypot(
          currentAnnotation.endX - currentAnnotation.startX,
          currentAnnotation.endY - currentAnnotation.startY
        );
        if (dist < 8) isValid = false;
      } else if (currentAnnotation.type === 'pen') {
        if (currentAnnotation.points.length < 2) isValid = false;
      }

      if (isValid) {
        onAddAnnotation(currentAnnotation);
      }
    }

    setIsDrawing(false);
    setStartPos(null);
    setCurrentAnnotation(null);
  };

  const handleAddTextAnnotation = (text: string, fontSize: number) => {
    if (!textClickPos) return;
    onAddAnnotation({
      id: `annot_${Date.now()}`,
      type: 'text',
      x: textClickPos.x,
      y: textClickPos.y,
      text,
      fontSize,
      color: strokeColor,
      strokeWidth,
    });
    setTextModalOpen(false);
    setTextClickPos(null);
  };

  const fitToWidth = useCallback(() => {
    if (baseCanvas && containerRef.current) {
      const containerW = containerRef.current.clientWidth - 80;
      setZoom(Math.max(0.1, containerW / baseCanvas.width));
    }
  }, [baseCanvas]);

  const displayWidth = baseCanvas ? Math.round(baseCanvas.width * zoom) : 0;
  const displayHeight = baseCanvas ? Math.round(baseCanvas.height * zoom) : 0;

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950 overflow-hidden select-none">
      {/* Zoom / View Controls Floating Overlay */}
      {baseCanvas && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 shadow-xl text-slate-300">
          <button
            onClick={() => setZoom((z) => Math.max(0.1, parseFloat((z - 0.1).toFixed(2))))}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs w-12 text-center text-slate-200">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(3, parseFloat((z + 0.1).toFixed(2))))}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-slate-700 mx-1" />
          <button
            onClick={fitToWidth}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Fit to Width"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset to 100%"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Canvas Scroll Area */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-auto cursor-default"
      >
        <div className="w-fit min-w-full min-h-full flex items-start justify-center p-8 m-auto">
          {baseCanvas ? (
            <div
              className="relative shadow-2xl flex-shrink-0 transition-all duration-75"
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`,
                minWidth: `${displayWidth}px`,
                minHeight: `${displayHeight}px`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
            >
              {/* Base Stitched Image Layer */}
              <img
                src={baseCanvas.toDataURL('image/png')}
                alt="Stitched Preview"
                className="block pointer-events-none select-none max-w-none"
                style={{
                  width: `${displayWidth}px`,
                  height: `${displayHeight}px`,
                  minWidth: `${displayWidth}px`,
                  minHeight: `${displayHeight}px`,
                  maxWidth: 'none',
                  maxHeight: 'none',
                }}
              />

              {/* Interactive Annotation Overlay Canvas */}
              <canvas
                ref={overlayCanvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className={`absolute inset-0 block ${
                  activeTool === 'select'
                    ? 'cursor-default'
                    : activeTool === 'text'
                    ? 'cursor-text'
                    : 'cursor-crosshair'
                }`}
                style={{
                  width: `${displayWidth}px`,
                  height: `${displayHeight}px`,
                }}
              />
            </div>
          ) : (
            /* Rich Welcome & Demo Action Center */
            <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl my-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 border border-blue-400/30">
                <Layers className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Screenshot Stitcher Studio
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Stitch multiple viewport screenshots into one vertical image, configure custom gap spacing, and draw annotations.
                </p>
              </div>

              {/* Demo Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={onLoadDemo}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Load 3 Sample Screenshots</span>
                </button>

                <button
                  type="button"
                  onClick={onUploadClick}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span>Upload Images</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
                <span>In Chrome? Use the extension side panel or shortcut </span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                  Alt+S
                </kbd>
                <span> to capture live pages.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* In-app Text Callout Prompt Modal */}
      <TextPromptModal
        isOpen={textModalOpen}
        strokeColor={strokeColor}
        onAddText={handleAddTextAnnotation}
        onCancel={() => {
          setTextModalOpen(false);
          setTextClickPos(null);
        }}
      />
    </div>
  );
};
