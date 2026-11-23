import React from 'react';
import { StitchConfig } from '../../types';
import { Sliders, AlignCenter, Maximize2, Shield } from 'lucide-react';

interface Props {
  config: StitchConfig;
  onChange: (config: StitchConfig) => void;
}

const BG_PRESETS = [
  { label: 'White', value: '#ffffff', class: 'bg-white border-slate-300' },
  { label: 'Light', value: '#f8fafc', class: 'bg-slate-50 border-slate-300' },
  { label: 'Dark', value: '#0f172a', class: 'bg-slate-900 border-slate-700' },
  { label: 'Transparent', value: 'transparent', class: 'bg-transparent border-dashed border-slate-400' },
];

export const StitchControls: React.FC<Props> = ({ config, onChange }) => {
  const update = (partial: Partial<StitchConfig>) => {
    onChange({ ...config, ...partial });
  };

  return (
    <div className="space-y-5 p-4 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs text-sm transition-colors">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100">
        <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>Stitch Settings</span>
      </div>

      {/* Spacing Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <label className="font-medium text-slate-700 dark:text-slate-300">Gap / Spacing</label>
          <span className="font-mono text-slate-500 dark:text-slate-400 font-medium">{config.spacing}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="2"
          value={config.spacing}
          onChange={(e) => update({ spacing: Number(e.target.value) })}
          className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
        />
      </div>

      {/* Padding Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <label className="font-medium text-slate-700 dark:text-slate-300">Outer Margin</label>
          <span className="font-mono text-slate-500 dark:text-slate-400 font-medium">{config.padding}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          step="2"
          value={config.padding}
          onChange={(e) => update({ padding: Number(e.target.value) })}
          className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
        />
      </div>

      {/* Alignment */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Width Normalization</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => update({ alignment: 'fit-width' })}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
              config.alignment === 'fit-width'
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300 font-semibold shadow-xs'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Fit Width
          </button>
          <button
            type="button"
            onClick={() => update({ alignment: 'center' })}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
              config.alignment === 'center'
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300 font-semibold shadow-xs'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
            Center
          </button>
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Canvas Background</label>
        <div className="flex items-center gap-2">
          {BG_PRESETS.map((bg) => (
            <button
              key={bg.value}
              type="button"
              onClick={() => update({ backgroundColor: bg.value })}
              className={`w-7 h-7 rounded-full border-2 transition-transform ${bg.class} ${
                config.backgroundColor === bg.value
                  ? 'ring-2 ring-blue-500 ring-offset-2 scale-110'
                  : 'hover:scale-105'
              }`}
              title={bg.label}
            />
          ))}
        </div>
      </div>

      {/* Shadow Toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          Segment Shadows
        </label>
        <input
          type="checkbox"
          checked={config.enableShadow}
          onChange={(e) => update({ enableShadow: e.target.checked })}
          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
        />
      </div>
    </div>
  );
};
