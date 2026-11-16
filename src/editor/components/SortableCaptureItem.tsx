import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { CaptureItem } from '../../types';

interface Props {
  capture: CaptureItem;
  index: number;
  onDelete: (id: string) => void;
}

export const SortableCaptureItem: React.FC<Props> = ({ capture, index, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: capture.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-3 p-2.5 rounded-lg border bg-white transition-all shadow-sm ${
        isDragging
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20'
          : 'border-slate-200 hover:border-slate-300 hover:shadow'
      }`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-100"
        title="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Index Badge */}
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center border border-slate-200">
        {index + 1}
      </div>

      {/* Thumbnail Preview */}
      <div className="w-16 h-12 rounded overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
        <img
          src={capture.dataUrl}
          alt={`Capture ${index + 1}`}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Metadata */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-800 truncate" title={capture.pageTitle}>
          {capture.pageTitle || 'Webpage Capture'}
        </p>
        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
          {capture.width} × {capture.height}px
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(capture.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-all flex-shrink-0"
        title="Delete screenshot"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
