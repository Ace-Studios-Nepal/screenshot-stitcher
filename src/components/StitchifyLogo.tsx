import React from 'react';

interface StitchifyLogoProps {
  className?: string;
  withWordmark?: boolean;
  wordmarkClassName?: string;
}

export const StitchifyLogo: React.FC<StitchifyLogoProps> = ({
  className = 'w-8 h-8',
  withWordmark = false,
  wordmarkClassName = 'font-bold text-lg tracking-tight text-white',
}) => {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 drop-shadow-md`}
      >
        <defs>
          <linearGradient id="stkBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="45%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>

          <linearGradient id="stkTopRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="stkBottomRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="60%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#C026D3" />
          </linearGradient>

          <linearGradient id="stkBorderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Base Squircle */}
        <rect width="512" height="512" rx="116" fill="url(#stkBgGrad)" />
        <rect
          x="5"
          y="5"
          width="502"
          height="502"
          rx="111"
          fill="none"
          stroke="url(#stkBorderGlow)"
          strokeWidth="6"
        />

        {/* Top Strip of S */}
        <path
          d="M 374 158 C 374 102 324 68 244 68 C 164 68 122 112 122 164 C 122 220 164 246 236 268 L 296 286"
          fill="none"
          stroke="url(#stkTopRibbon)"
          strokeWidth="60"
          strokeLinecap="round"
        />

        {/* Bottom Strip of S */}
        <path
          d="M 216 258 L 276 276 C 348 298 390 324 390 380 C 390 432 348 476 268 476 C 188 476 138 442 138 386"
          fill="none"
          stroke="url(#stkBottomRibbon)"
          strokeWidth="60"
          strokeLinecap="round"
        />

        {/* Stitching Seam Ties */}
        <g strokeWidth="11" strokeLinecap="round">
          <line x1="192" y1="228" x2="220" y2="298" stroke="#38BDF8" />
          <line x1="242" y1="244" x2="270" y2="314" stroke="#FFFFFF" />
          <line x1="292" y1="260" x2="320" y2="330" stroke="#F43F5E" />
        </g>

        {/* Perforations */}
        <g fill="#FFFFFF" opacity="0.95">
          <circle cx="205" cy="112" r="6" />
          <circle cx="265" cy="112" r="6" />
          <circle cx="325" cy="132" r="6" />

          <circle cx="187" cy="412" r="6" />
          <circle cx="247" cy="432" r="6" />
          <circle cx="307" cy="432" r="6" />
        </g>

        {/* Golden Magic Sparkle (-ify magic) */}
        <g transform="translate(394, 82)">
          <path d="M 0 -36 Q 0 0 36 0 Q 0 0 0 36 Q 0 0 -36 0 Q 0 0 0 -36 Z" fill="#FBBF24" />
          <circle cx="0" cy="0" r="5" fill="#FFFBEB" />
        </g>
      </svg>

      {withWordmark && (
        <span className={wordmarkClassName}>
          Stitch<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">ify</span>
        </span>
      )}
    </div>
  );
};
