import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="45%" stop-color="#1E1B4B" />
      <stop offset="100%" stop-color="#090D16" />
    </linearGradient>

    <linearGradient id="topRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="60%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>

    <linearGradient id="bottomRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="60%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#C026D3" />
    </linearGradient>

    <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.7" />
      <stop offset="50%" stop-color="#818CF8" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#C084FC" stop-opacity="0.7" />
    </linearGradient>

    <filter id="shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.6" />
    </filter>

    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="512" height="512" rx="116" fill="url(#bgGrad)" />
  <rect x="5" y="5" width="502" height="502" rx="111" fill="none" stroke="url(#borderGlow)" stroke-width="6" />

  <circle cx="256" cy="160" r="130" fill="#38BDF8" opacity="0.14" filter="url(#glow)" />
  <circle cx="256" cy="350" r="130" fill="#8B5CF6" opacity="0.14" filter="url(#glow)" />

  <g filter="url(#shadow)">
    <path d="M 374 158 C 374 102 324 68 244 68 C 164 68 122 112 122 164 C 122 220 164 246 236 268 L 296 286"
          fill="none"
          stroke="url(#topRibbon)"
          stroke-width="60"
          stroke-linecap="round" />

    <path d="M 216 258 L 276 276 C 348 298 390 324 390 380 C 390 432 348 476 268 476 C 188 476 138 442 138 386"
          fill="none"
          stroke="url(#bottomRibbon)"
          stroke-width="60"
          stroke-linecap="round" />

    <g stroke-width="11" stroke-linecap="round">
      <line x1="192" y1="228" x2="220" y2="298" stroke="#38BDF8" filter="url(#glow)" />
      <line x1="242" y1="244" x2="270" y2="314" stroke="#FFFFFF" filter="url(#glow)" />
      <line x1="292" y1="260" x2="320" y2="330" stroke="#F43F5E" filter="url(#glow)" />
    </g>

    <g fill="#FFFFFF" opacity="0.95">
      <circle cx="205" cy="112" r="6" />
      <circle cx="265" cy="112" r="6" />
      <circle cx="325" cy="132" r="6" />

      <circle cx="187" cy="412" r="6" />
      <circle cx="247" cy="432" r="6" />
      <circle cx="307" cy="432" r="6" />
    </g>
  </g>

  <g transform="translate(394, 82)">
    <path d="M 0 -36 Q 0 0 36 0 Q 0 0 0 36 Q 0 0 -36 0 Q 0 0 0 -36 Z" fill="#FBBF24" filter="url(#glow)" />
    <circle cx="0" cy="0" r="5" fill="#FFFBEB" />
  </g>
</svg>`;

async function run() {
  const iconsDir = path.resolve('public/icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  fs.writeFileSync(path.join(iconsDir, 'icon.svg'), masterSvg);
  fs.writeFileSync(path.resolve('public/favicon.svg'), masterSvg);

  const sizes = [16, 32, 48, 128, 512];
  for (const s of sizes) {
    const outPath = path.join(iconsDir, `icon${s}.png`);
    await sharp(Buffer.from(masterSvg))
      .resize(s, s)
      .png()
      .toFile(outPath);
    console.log(`Generated icon${s}.png`);
  }
}

run().catch(console.error);
