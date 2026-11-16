import React from 'react';
import {
  AnnotationTool,
} from '../../types';
import {
  MousePointer,
  Square,
  MoveUpRight,
  Highlighter,
  Type,
  Pencil,
  Undo2,
  Redo2,
  Trash2,
} from 'lucide-react';

interface Props {
  activeTool: AnnotationTool;
  onSelectTool: (tool: AnnotationTool) => void;
  strokeColor: string;
  onSelectColor: (color: string) => void;
  strokeWidth: number;
  onSelectStrokeWidth: (width: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClearAnnotations: () => void;
  annotationCount: number;
}

const COLORS = [
  '#ef4444', // Red
  '#f59e0b', // Amber/Yellow
  '#10b981', // Green
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#0f172a', // Slate/Black
  '#ffffff', // White
];

const STROKE_WIDTHS = [2, 4, 8];

export const AnnotationToolbar: React.FC<Props> = ({
  activeTool,
  onSelectTool,
  strokeColor,
  onSelectColor,
  strokeWidth,
  onSelectStrokeWidth,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClearAnnotations,
  annotationCount,
}) => {
  const tools: { id: AnnotationTool; label: string; icon: React.ReactNode }[] = [
    { id: 'select', label: 'Select / Pan', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'rectangle', label: 'Rectangle Box', icon: <Square className="w-4 h-4" /> },
    { id: 'arrow', label: 'Arrow Pointer', icon: <MoveUpRight className="w-4 h-4" /> },
    { id: 'highlight', label: 'Highlight Area', icon: <Highlighter className="w-4 h-4" /> },
    { id: 'text', label: 'Text Callout', icon: <Type className="w-4 h-4" /> },
    { id: 'pen', label: 'Freehand Pen', icon: <Pencil className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-lg text-slate-700">
      {/* Tool Selector */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
        {tools.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelectTool(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTool === t.id
                ? 'bg-white text-blue-600 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
            title={t.label}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-slate-200" />

      {/* Color Palette */}
      {activeTool !== 'select' && (
        <>
          <div className="flex items-center gap-1.5">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onSelectColor(color)}
                style={{ backgroundColor: color }}
                className={`w-5 h-5 rounded-full border border-slate-300 transition-transform ${
                  strokeColor === color
                    ? 'ring-2 ring-blue-500 ring-offset-2 scale-110'
                    : 'hover:scale-110'
                }`}
                title={color}
              />
            ))}
          </div>

          {/* Stroke Width Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {STROKE_WIDTHS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onSelectStrokeWidth(w)}
                className={`w-7 h-6 flex items-center justify-center rounded text-xs font-semibold transition-all ${
                  strokeWidth === w
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {w}px
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200" />
        </>
      )}

      {/* Undo / Redo / Clear */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
        {annotationCount > 0 && (
          <button
            type="button"
            onClick={onClearAnnotations}
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
            title="Clear all annotations"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
