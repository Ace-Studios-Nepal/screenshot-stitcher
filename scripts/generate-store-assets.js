import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = path.resolve('artifacts/store-assets');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Common SVG components and styles
const svgDefs = `
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090D16" />
      <stop offset="50%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>

    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>

    <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.9" />
    </linearGradient>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6" />
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
`;

function createBrowserHeader(width, titleText) {
  return `
    <g>
      <rect width="${width}" height="44" rx="12" fill="#0B0F19" />
      <circle cx="28" cy="22" r="6" fill="#EF4444" opacity="0.9" />
      <circle cx="48" cy="22" r="6" fill="#F59E0B" opacity="0.9" />
      <circle cx="68" cy="22" r="6" fill="#10B981" opacity="0.9" />
      <rect x="100" y="8" width="${width - 200}" height="28" rx="6" fill="#1E293B" opacity="0.8" />
      <text x="${width / 2}" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" fill="#94A3B8" text-anchor="middle">${titleText}</text>
    </g>
  `;
}

// 1. Screenshot 1: 1280x800 - Capture Reel & Docked Side Panel
function getScreenshot1Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
    ${svgDefs}
    <rect width="1280" height="800" fill="url(#bgGrad)" />

    <!-- Ambient background orbs -->
    <circle cx="200" cy="150" r="220" fill="#3B82F6" opacity="0.12" filter="url(#softGlow)" />
    <circle cx="1080" cy="650" r="240" fill="#8B5CF6" opacity="0.12" filter="url(#softGlow)" />

    <!-- Top Headline Banner -->
    <text x="640" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">
      1-Click Multi-Viewport Capture &amp; Side Panel Reel
    </text>
    <text x="640" y="104" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">
      Docked capture reel lets you scroll and capture multiple webpage sections seamlessly with Alt + S hotkey
    </text>

    <!-- Main Window Mockup -->
    <g transform="translate(60, 140)" filter="url(#cardShadow)">
      <rect width="1160" height="600" rx="16" fill="#0F172A" stroke="#334155" stroke-width="2" />
      ${createBrowserHeader(1160, 'https://example.com/analytics-dashboard')}

      <!-- Main Webpage Content (Left 760px) -->
      <g transform="translate(24, 60)">
        <rect width="730" height="516" rx="8" fill="#1E293B" opacity="0.6" />
        <rect x="24" y="24" width="220" height="24" rx="4" fill="#3B82F6" opacity="0.4" />
        <rect x="24" y="60" width="360" height="12" rx="3" fill="#64748B" opacity="0.4" />

        <!-- Mock Webpage Cards -->
        <rect x="24" y="96" width="325" height="160" rx="8" fill="#0F172A" stroke="#334155" />
        <text x="44" y="130" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#38BDF8">Monthly Active Users</text>
        <text x="44" y="170" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF">128,450</text>
        <path d="M 44 230 Q 120 180 200 210 T 320 180" fill="none" stroke="#10B981" stroke-width="3" />

        <rect x="375" y="96" width="330" height="160" rx="8" fill="#0F172A" stroke="#334155" />
        <text x="395" y="130" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#A855F7">Conversion Rate</text>
        <text x="395" y="170" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF">4.82%</text>
        <path d="M 395 230 Q 470 200 550 220 T 670 170" fill="none" stroke="#A855F7" stroke-width="3" />

        <!-- Section 2 Mock Table -->
        <rect x="24" y="276" width="681" height="216" rx="8" fill="#0F172A" stroke="#334155" />
        <rect x="44" y="296" width="180" height="16" rx="4" fill="#64748B" opacity="0.5" />
        <line x1="44" y1="330" x2="685" y2="330" stroke="#334155" stroke-width="1" />
        <rect x="44" y="348" width="640" height="32" rx="4" fill="#1E293B" opacity="0.5" />
        <rect x="44" y="392" width="640" height="32" rx="4" fill="#1E293B" opacity="0.3" />
        <rect x="44" y="436" width="640" height="32" rx="4" fill="#1E293B" opacity="0.5" />
      </g>

      <!-- Docked Side Panel (Right 360px) -->
      <g transform="translate(778, 44)">
        <rect width="382" height="556" fill="#0B132B" stroke="#2563EB" stroke-width="2" />
        
        <!-- Side Panel Header -->
        <rect width="382" height="52" fill="#111C44" />
        <circle cx="28" cy="26" r="14" fill="#2563EB" />
        <text x="28" y="31" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFF" text-anchor="middle">S</text>
        <text x="52" y="31" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Stitchify Reel</text>
        <rect x="270" y="14" width="96" height="26" rx="6" fill="#2563EB" />
        <text x="318" y="31" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">Studio →</text>

        <!-- Capture Trigger Button -->
        <rect x="20" y="68" width="342" height="42" rx="8" fill="url(#accentGrad)" />
        <text x="191" y="94" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">📸 Capture Viewport (Alt + S)</text>

        <!-- Capture Thumbnails Reel -->
        <!-- Thumbnail 1 -->
        <g transform="translate(20, 126)">
          <rect width="342" height="96" rx="8" fill="#1E293B" stroke="#3B82F6" stroke-width="1.5" />
          <rect x="12" y="12" width="100" height="72" rx="6" fill="#0F172A" />
          <text x="62" y="52" font-family="monospace" font-size="10" fill="#60A5FA" text-anchor="middle">SLIDE 1</text>
          <text x="124" y="36" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Top Navigation &amp; KPIs</text>
          <text x="124" y="56" font-family="monospace" font-size="11" fill="#94A3B8">1280 × 540 px</text>
          <rect x="124" y="66" width="60" height="18" rx="4" fill="#22C55E" opacity="0.2" />
          <text x="154" y="79" font-family="sans-serif" font-size="10" font-weight="700" fill="#4ADE80" text-anchor="middle">Ready</text>
        </g>

        <!-- Thumbnail 2 -->
        <g transform="translate(20, 234)">
          <rect width="342" height="96" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
          <rect x="12" y="12" width="100" height="72" rx="6" fill="#0F172A" />
          <text x="62" y="52" font-family="monospace" font-size="10" fill="#60A5FA" text-anchor="middle">SLIDE 2</text>
          <text x="124" y="36" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Performance Metrics</text>
          <text x="124" y="56" font-family="monospace" font-size="11" fill="#94A3B8">1280 × 610 px</text>
          <rect x="124" y="66" width="60" height="18" rx="4" fill="#22C55E" opacity="0.2" />
          <text x="154" y="79" font-family="sans-serif" font-size="10" font-weight="700" fill="#4ADE80" text-anchor="middle">Ready</text>
        </g>

        <!-- Thumbnail 3 -->
        <g transform="translate(20, 342)">
          <rect width="342" height="96" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
          <rect x="12" y="12" width="100" height="72" rx="6" fill="#0F172A" />
          <text x="62" y="52" font-family="monospace" font-size="10" fill="#60A5FA" text-anchor="middle">SLIDE 3</text>
          <text x="124" y="36" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Conversion Data Table</text>
          <text x="124" y="56" font-family="monospace" font-size="11" fill="#94A3B8">1280 × 580 px</text>
          <rect x="124" y="66" width="60" height="18" rx="4" fill="#22C55E" opacity="0.2" />
          <text x="154" y="79" font-family="sans-serif" font-size="10" font-weight="700" fill="#4ADE80" text-anchor="middle">Ready</text>
        </g>

        <!-- Side Panel Footer -->
        <g transform="translate(20, 460)">
          <rect width="342" height="42" rx="8" fill="#1E293B" stroke="#334155" />
          <text x="171" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="600" fill="#94A3B8" text-anchor="middle">3 Captures Stored • Drag to Reorder</text>
        </g>
      </g>
    </g>
  </svg>`;
}

// 2. Screenshot 2: 1280x800 - Vertical Canvas Stitcher & Gap Spacing Controls
function getScreenshot2Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
    ${svgDefs}
    <rect width="1280" height="800" fill="url(#bgGrad)" />

    <circle cx="1100" cy="180" r="220" fill="#0284C7" opacity="0.12" filter="url(#softGlow)" />
    <circle cx="200" cy="700" r="220" fill="#6366F1" opacity="0.12" filter="url(#softGlow)" />

    <!-- Top Headline Banner -->
    <text x="640" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">
      Seamless Vertical Stitching with Configurable Gaps
    </text>
    <text x="640" y="104" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">
      Customize gap spacing, canvas margins, background colors, and drop shadows with real-time preview
    </text>

    <!-- Studio Window Mockup -->
    <g transform="translate(60, 140)" filter="url(#cardShadow)">
      <rect width="1160" height="600" rx="16" fill="#0F172A" stroke="#334155" stroke-width="2" />
      ${createBrowserHeader(1160, 'Stitchify Studio – Canvas Editor')}

      <!-- Studio Layout: Left Sidebar Controls (340px) -->
      <g transform="translate(24, 60)">
        <rect width="320" height="516" rx="10" fill="#111827" stroke="#334155" />
        <text x="20" y="36" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Stitch Settings</text>

        <!-- Gap Spacing Slider -->
        <g transform="translate(20, 60)">
          <text x="0" y="0" font-family="sans-serif" font-size="13" font-weight="600" fill="#E2E8F0">Gap Spacing</text>
          <text x="280" y="0" font-family="monospace" font-size="13" font-weight="700" fill="#38BDF8" text-anchor="end">24 px</text>
          <rect y="12" width="280" height="8" rx="4" fill="#334155" />
          <rect y="12" width="140" height="8" rx="4" fill="#3B82F6" />
          <circle cx="140" cy="16" r="8" fill="#FFFFFF" />
        </g>

        <!-- Canvas Padding Slider -->
        <g transform="translate(20, 120)">
          <text x="0" y="0" font-family="sans-serif" font-size="13" font-weight="600" fill="#E2E8F0">Canvas Padding</text>
          <text x="280" y="0" font-family="monospace" font-size="13" font-weight="700" fill="#38BDF8" text-anchor="end">32 px</text>
          <rect y="12" width="280" height="8" rx="4" fill="#334155" />
          <rect y="12" width="180" height="8" rx="4" fill="#3B82F6" />
          <circle cx="180" cy="16" r="8" fill="#FFFFFF" />
        </g>

        <!-- Background Color Selector -->
        <g transform="translate(20, 180)">
          <text x="0" y="0" font-family="sans-serif" font-size="13" font-weight="600" fill="#E2E8F0">Background Theme</text>
          <circle cx="20" cy="24" r="14" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
          <circle cx="60" cy="24" r="14" fill="#FFFFFF" stroke="#334155" stroke-width="1" />
          <circle cx="100" cy="24" r="14" fill="#1E293B" stroke="#334155" stroke-width="1" />
          <circle cx="140" cy="24" r="14" fill="#0284C7" stroke="#334155" stroke-width="1" />
          <circle cx="180" cy="24" r="14" fill="#6366F1" stroke="#334155" stroke-width="1" />
        </g>

        <!-- Drop Shadow Toggle -->
        <g transform="translate(20, 246)">
          <text x="0" y="16" font-family="sans-serif" font-size="13" font-weight="600" fill="#E2E8F0">Drop Shadows</text>
          <rect x="230" y="0" width="50" height="26" rx="13" fill="#22C55E" />
          <circle cx="267" cy="13" r="10" fill="#FFFFFF" />
        </g>

        <!-- Divider -->
        <line x1="20" y1="290" x2="300" y2="290" stroke="#334155" stroke-width="1" />

        <!-- Reel Items Reordering List -->
        <text x="20" y="320" font-family="sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Sequence (Drag to Sort)</text>
        <g transform="translate(20, 336)">
          <rect width="280" height="40" rx="6" fill="#1E293B" stroke="#3B82F6" />
          <text x="12" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#38BDF8">⋮⋮ 1. Hero Landing</text>
          <text x="268" y="25" font-family="monospace" font-size="11" fill="#94A3B8" text-anchor="end">1280px</text>
        </g>
        <g transform="translate(20, 386)">
          <rect width="280" height="40" rx="6" fill="#1E293B" stroke="#334155" />
          <text x="12" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#E2E8F0">⋮⋮ 2. Features Grid</text>
          <text x="268" y="25" font-family="monospace" font-size="11" fill="#94A3B8" text-anchor="end">1280px</text>
        </g>
        <g transform="translate(20, 436)">
          <rect width="280" height="40" rx="6" fill="#1E293B" stroke="#334155" />
          <text x="12" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#E2E8F0">⋮⋮ 3. Pricing Matrix</text>
          <text x="268" y="25" font-family="monospace" font-size="11" fill="#94A3B8" text-anchor="end">1280px</text>
        </g>
      </g>

      <!-- Center Canvas Preview (Right 770px) -->
      <g transform="translate(366, 60)">
        <rect width="770" height="516" rx="10" fill="#030712" stroke="#334155" />
        
        <!-- Live Stitched Result Card -->
        <g transform="translate(145, 24)" filter="url(#cardShadow)">
          <rect width="480" height="468" rx="12" fill="#0B132B" stroke="#2563EB" stroke-width="2" />

          <!-- Segment 1 -->
          <g transform="translate(20, 20)">
            <rect width="440" height="110" rx="6" fill="#1E293B" />
            <rect x="20" y="20" width="140" height="16" rx="4" fill="#38BDF8" opacity="0.6" />
            <rect x="20" y="48" width="260" height="10" rx="3" fill="#64748B" opacity="0.4" />
            <rect x="360" y="20" width="60" height="24" rx="4" fill="#2563EB" />
          </g>

          <!-- 24px Gap Visualizer -->
          <line x1="20" y1="142" x2="460" y2="142" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />
          <text x="240" y="148" font-family="monospace" font-size="10" font-weight="bold" fill="#60A5FA" text-anchor="middle">↕ 24px Gap Spacing</text>
          <line x1="20" y1="154" x2="460" y2="154" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />

          <!-- Segment 2 -->
          <g transform="translate(20, 166)">
            <rect width="440" height="120" rx="6" fill="#1E293B" />
            <rect x="20" y="20" width="120" height="70" rx="4" fill="#0F172A" />
            <rect x="160" y="20" width="120" height="70" rx="4" fill="#0F172A" />
            <rect x="300" y="20" width="120" height="70" rx="4" fill="#0F172A" />
          </g>

          <!-- 24px Gap Visualizer 2 -->
          <line x1="20" y1="298" x2="460" y2="298" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />
          <text x="240" y="304" font-family="monospace" font-size="10" font-weight="bold" fill="#60A5FA" text-anchor="middle">↕ 24px Gap Spacing</text>
          <line x1="20" y1="310" x2="460" y2="310" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />

          <!-- Segment 3 -->
          <g transform="translate(20, 322)">
            <rect width="440" height="110" rx="6" fill="#1E293B" />
            <rect x="20" y="20" width="200" height="14" rx="3" fill="#64748B" opacity="0.4" />
            <rect x="20" y="44" width="400" height="24" rx="4" fill="#0F172A" />
            <rect x="20" y="76" width="400" height="20" rx="4" fill="#0F172A" />
          </g>
        </g>
      </g>
    </g>
  </svg>`;
}

// 3. Screenshot 3: 1280x800 - Rich Annotation Studio
function getScreenshot3Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
    ${svgDefs}
    <rect width="1280" height="800" fill="url(#bgGrad)" />

    <circle cx="300" cy="200" r="240" fill="#EC4899" opacity="0.1" filter="url(#softGlow)" />
    <circle cx="950" cy="650" r="220" fill="#3B82F6" opacity="0.12" filter="url(#softGlow)" />

    <!-- Top Headline Banner -->
    <text x="640" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">
      Precision Markup &amp; Visual Annotation Studio
    </text>
    <text x="640" y="104" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">
      Highlight bugs, draw directional arrows, callouts, rectangles, and freehand markup with undo/redo
    </text>

    <!-- Studio Window Mockup -->
    <g transform="translate(60, 140)" filter="url(#cardShadow)">
      <rect width="1160" height="600" rx="16" fill="#0F172A" stroke="#334155" stroke-width="2" />
      ${createBrowserHeader(1160, 'Stitchify Studio – Markup &amp; Annotations')}

      <!-- Floating Annotation Toolbar -->
      <g transform="translate(280, 56)">
        <rect width="600" height="48" rx="10" fill="#1E293B" stroke="#475569" stroke-width="1.5" filter="url(#cardShadow)" />

        <!-- Select Tool -->
        <rect x="12" y="8" width="56" height="32" rx="6" fill="#334155" />
        <text x="40" y="28" font-family="sans-serif" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="middle">Select</text>

        <!-- Arrow Tool (Active) -->
        <rect x="76" y="8" width="60" height="32" rx="6" fill="#2563EB" />
        <text x="106" y="28" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">➔ Arrow</text>

        <!-- Rectangle Tool -->
        <rect x="144" y="8" width="56" height="32" rx="6" fill="#334155" />
        <text x="172" y="28" font-family="sans-serif" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="middle">▢ Box</text>

        <!-- Callout Text Tool -->
        <rect x="208" y="8" width="64" height="32" rx="6" fill="#334155" />
        <text x="240" y="28" font-family="sans-serif" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="middle">T Text</text>

        <!-- Highlighter Tool -->
        <rect x="280" y="8" width="70" height="32" rx="6" fill="#334155" />
        <text x="315" y="28" font-family="sans-serif" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="middle">🖊 Highlight</text>

        <!-- Color Palette -->
        <circle cx="390" cy="24" r="10" fill="#EF4444" stroke="#FFF" stroke-width="2" />
        <circle cx="420" cy="24" r="10" fill="#F59E0B" />
        <circle cx="450" cy="24" r="10" fill="#10B981" />
        <circle cx="480" cy="24" r="10" fill="#3B82F6" />

        <!-- Undo / Redo -->
        <rect x="520" y="8" width="32" height="32" rx="6" fill="#334155" />
        <text x="536" y="28" font-family="sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">↶</text>
        <rect x="558" y="8" width="32" height="32" rx="6" fill="#334155" />
        <text x="574" y="28" font-family="sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">↷</text>
      </g>

      <!-- Canvas Area with Active Markup -->
      <g transform="translate(180, 120)">
        <rect width="800" height="450" rx="12" fill="#0B132B" stroke="#2563EB" stroke-width="2" />
        
        <!-- Web Page Section 1 Mockup -->
        <g transform="translate(40, 30)">
          <rect width="720" height="160" rx="8" fill="#1E293B" />
          <rect x="24" y="24" width="160" height="20" rx="4" fill="#38BDF8" opacity="0.6" />
          <rect x="24" y="58" width="400" height="12" rx="3" fill="#64748B" opacity="0.4" />
          <rect x="24" y="80" width="320" height="12" rx="3" fill="#64748B" opacity="0.4" />
          <rect x="520" y="24" width="170" height="110" rx="8" fill="#0F172A" />

          <!-- Annotation 1: Red Box & Arrow marking up an issue -->
          <rect x="18" y="50" width="414" height="50" rx="6" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="6 4" />
          
          <path d="M 480 85 L 440 75" fill="none" stroke="#EF4444" stroke-width="4" marker-end="url(#arrow)" />
          <!-- Callout pill -->
          <rect x="470" y="65" width="160" height="36" rx="8" fill="#EF4444" />
          <text x="550" y="88" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Fix: Outdated Copy</text>
        </g>

        <!-- Web Page Section 2 Mockup -->
        <g transform="translate(40, 220)">
          <rect width="720" height="190" rx="8" fill="#1E293B" />
          <rect x="24" y="24" width="200" height="18" rx="4" fill="#64748B" opacity="0.6" />

          <!-- Three Column Cards -->
          <rect x="24" y="60" width="210" height="100" rx="6" fill="#0F172A" />
          <rect x="254" y="60" width="210" height="100" rx="6" fill="#0F172A" />
          <rect x="484" y="60" width="210" height="100" rx="6" fill="#0F172A" />

          <!-- Annotation 2: Yellow Highlighter -->
          <rect x="254" y="60" width="210" height="100" rx="6" fill="#FBBF24" opacity="0.25" stroke="#F59E0B" stroke-width="2" />
          
          <!-- Annotation 3: Arrow & Success Callout -->
          <path d="M 360 30 L 360 55" fill="none" stroke="#10B981" stroke-width="4" />
          <rect x="270" y="4" width="180" height="30" rx="6" fill="#10B981" />
          <text x="360" y="23" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✓ Selected Pricing Tier</text>
        </g>
      </g>
    </g>
  </svg>`;
}

// 4. Screenshot 4: 1280x800 - High-Res PNG & Multi-Page PDF Export
function getScreenshot4Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
    ${svgDefs}
    <rect width="1280" height="800" fill="url(#bgGrad)" />

    <circle cx="200" cy="180" r="220" fill="#10B981" opacity="0.1" filter="url(#softGlow)" />
    <circle cx="1080" cy="650" r="240" fill="#3B82F6" opacity="0.12" filter="url(#softGlow)" />

    <!-- Top Headline Banner -->
    <text x="640" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">
      Lossless Export to Crisp PNG &amp; Multi-Page PDF
    </text>
    <text x="640" y="104" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">
      Export at native device pixel ratio (HiDPI) with zero compression artifacts or cloud uploads
    </text>

    <!-- Studio Window Mockup with Export Modal Center -->
    <g transform="translate(60, 140)" filter="url(#cardShadow)">
      <rect width="1160" height="600" rx="16" fill="#0F172A" stroke="#334155" stroke-width="2" />
      ${createBrowserHeader(1160, 'Stitchify Studio – Export Stitched Image')}

      <!-- Background Faded Canvas Workspace -->
      <g opacity="0.2" transform="translate(20, 60)">
        <rect width="1120" height="516" rx="8" fill="#1E293B" />
        <rect x="360" y="20" width="400" height="476" rx="8" fill="#0F172A" />
      </g>

      <!-- High-Fidelity Export Modal Dialog (Center 580px) -->
      <g transform="translate(290, 70)" filter="url(#cardShadow)">
        <rect width="580" height="480" rx="16" fill="#0B132B" stroke="#2563EB" stroke-width="2" />

        <!-- Modal Header -->
        <g transform="translate(30, 36)">
          <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Export Your Stitched Composite</text>
          <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" fill="#94A3B8">Choose output format, dimensions, and document distribution options</text>
        </g>

        <!-- Format Options Cards -->
        <!-- PNG Card -->
        <g transform="translate(30, 84)">
          <rect width="250" height="120" rx="10" fill="#1E293B" stroke="#3B82F6" stroke-width="2" />
          <circle cx="36" cy="36" r="16" fill="#2563EB" />
          <text x="36" y="42" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFF" text-anchor="middle">PNG</text>
          <text x="64" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">Lossless PNG</text>
          <text x="64" y="50" font-family="sans-serif" font-size="11" fill="#4ADE80">Native 2x DPR Sharpness</text>
          <text x="24" y="80" font-family="sans-serif" font-size="11" fill="#94A3B8">Ideal for Jira, Slack, Figma, and design reviews</text>
          <rect x="24" y="94" width="80" height="16" rx="4" fill="#3B82F6" opacity="0.2" />
          <text x="64" y="106" font-family="monospace" font-size="9" font-weight="bold" fill="#60A5FA" text-anchor="middle">2560 × 3840 px</text>
        </g>

        <!-- PDF Card -->
        <g transform="translate(300, 84)">
          <rect width="250" height="120" rx="10" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
          <circle cx="36" cy="36" r="16" fill="#EF4444" />
          <text x="36" y="42" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFF" text-anchor="middle">PDF</text>
          <text x="64" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">Document PDF</text>
          <text x="64" y="50" font-family="sans-serif" font-size="11" fill="#94A3B8">Continuous or Multi-Page A4</text>
          <text x="24" y="80" font-family="sans-serif" font-size="11" fill="#94A3B8">Perfect for client reports, bug logs, and printing</text>
          <rect x="24" y="94" width="90" height="16" rx="4" fill="#EF4444" opacity="0.2" />
          <text x="69" y="106" font-family="monospace" font-size="9" font-weight="bold" fill="#F87171" text-anchor="middle">A4 Auto-Sliced</text>
        </g>

        <!-- Filename Input -->
        <g transform="translate(30, 226)">
          <text x="0" y="0" font-family="sans-serif" font-size="12" font-weight="600" fill="#E2E8F0">Export Filename</text>
          <rect y="10" width="520" height="38" rx="8" fill="#0F172A" stroke="#334155" />
          <text x="16" y="34" font-family="monospace" font-size="12" fill="#38BDF8">stitched-audit-dashboard-2026-11-23.png</text>
        </g>

        <!-- Privacy & Local Security Guarantee Badge -->
        <g transform="translate(30, 296)">
          <rect width="520" height="54" rx="8" fill="#10B981" opacity="0.1" stroke="#10B981" stroke-width="1" />
          <text x="24" y="24" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" fill="#34D399">🛡️ 100% Client-Side Local Generation</text>
          <text x="24" y="42" font-family="sans-serif" font-size="11" fill="#A7F3D0">Rendered via HTML5 Canvas in browser memory. No servers or telemetry involved.</text>
        </g>

        <!-- Action Buttons -->
        <g transform="translate(30, 380)">
          <!-- Download PNG Button -->
          <rect width="250" height="46" rx="8" fill="url(#accentGrad)" />
          <text x="125" y="28" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">⬇ Download PNG</text>

          <!-- Download PDF Button -->
          <rect x="270" width="250" height="46" rx="8" fill="#1E293B" stroke="#475569" stroke-width="1.5" />
          <text x="395" y="28" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">📄 Export as PDF</text>
        </g>
      </g>
    </g>
  </svg>`;
}

// 5. Small Promo Tile: 440x280
function getPromoSmallSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="280" viewBox="0 0 440 280">
    ${svgDefs}
    <rect width="440" height="280" fill="url(#bgGrad)" />

    <circle cx="80" cy="80" r="120" fill="#38BDF8" opacity="0.15" filter="url(#softGlow)" />
    <circle cx="360" cy="220" r="120" fill="#8B5CF6" opacity="0.15" filter="url(#softGlow)" />

    <!-- App Logo Icon -->
    <g transform="translate(40, 44)">
      <rect width="64" height="64" rx="16" fill="#1E1B4B" stroke="#38BDF8" stroke-width="2" />
      <circle cx="32" cy="32" r="18" fill="url(#accentGrad)" />
      <text x="32" y="38" font-family="sans-serif" font-size="20" font-weight="bold" fill="#FFF" text-anchor="middle">S</text>
    </g>

    <!-- App Titles -->
    <text x="120" y="74" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF">Stitchify</text>
    <text x="120" y="98" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="600" fill="#38BDF8">Screenshot Stitcher &amp; Studio</text>

    <!-- Tagline & Features -->
    <text x="40" y="148" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="600" fill="#E2E8F0">Capture. Stitch. Annotate. Export.</text>
    <text x="40" y="174" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" fill="#94A3B8">• 1-Click Multi-Viewport Capture (Alt + S)</text>
    <text x="40" y="196" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" fill="#94A3B8">• Configurable Gaps, Spacing &amp; Shadows</text>
    <text x="40" y="218" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" fill="#94A3B8">• Arrows, Callouts &amp; Markup Tools</text>
    
    <!-- Footer Badge -->
    <rect x="40" y="238" width="160" height="22" rx="6" fill="#10B981" opacity="0.15" stroke="#10B981" stroke-width="1" />
    <text x="120" y="253" font-family="sans-serif" font-size="10" font-weight="bold" fill="#34D399" text-anchor="middle">100% Client-Side &amp; Private</text>
  </svg>`;
}

// 6. Marquee Promo Tile: 1400x560
function getPromoMarqueeSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="560" viewBox="0 0 1400 560">
    ${svgDefs}
    <rect width="1400" height="560" fill="url(#bgGrad)" />

    <circle cx="200" cy="200" r="300" fill="#0284C7" opacity="0.15" filter="url(#softGlow)" />
    <circle cx="1200" cy="350" r="300" fill="#8B5CF6" opacity="0.15" filter="url(#softGlow)" />

    <!-- Left Side: Brand & Hero Copy -->
    <g transform="translate(100, 100)">
      <!-- Badge -->
      <rect width="210" height="32" rx="16" fill="#38BDF8" opacity="0.15" stroke="#38BDF8" stroke-width="1" />
      <text x="105" y="21" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="bold" fill="#38BDF8" text-anchor="middle">Chrome Extension &amp; Web Studio</text>

      <!-- Main Headline -->
      <text x="0" y="90" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF">Stitchify</text>
      <text x="0" y="140" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="700" fill="#93C5FD">Capture, Stitch &amp; Annotate Screenshots</text>

      <!-- Subtitle Description -->
      <text x="0" y="185" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" fill="#CBD5E1">Take multiple webpage screenshots with 1 click, align them with custom gap spacing,</text>
      <text x="0" y="210" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" fill="#CBD5E1">draw visual markup, and export crisp PNG or multi-page PDF documents.</text>

      <!-- Feature Pill Badges -->
      <g transform="translate(0, 250)">
        <rect width="150" height="36" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="75" y="22" font-family="sans-serif" font-size="12" font-weight="bold" fill="#E2E8F0" text-anchor="middle">⚡ Docked Side Panel</text>

        <rect x="165" width="165" height="36" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="247" y="22" font-family="sans-serif" font-size="12" font-weight="bold" fill="#E2E8F0" text-anchor="middle">🧩 0-100px Gap Spacing</text>

        <rect x="345" width="150" height="36" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="420" y="22" font-family="sans-serif" font-size="12" font-weight="bold" fill="#E2E8F0" text-anchor="middle">✏️ Visual Markup</text>

        <rect x="510" width="160" height="36" rx="8" fill="#1E293B" stroke="#334155" />
        <text x="590" y="22" font-family="sans-serif" font-size="12" font-weight="bold" fill="#E2E8F0" text-anchor="middle">🔒 100% Client-Side</text>
      </g>
    </g>

    <!-- Right Side: Graphic Visual Showcase -->
    <g transform="translate(860, 70)" filter="url(#cardShadow)">
      <rect width="440" height="420" rx="16" fill="#0F172A" stroke="#2563EB" stroke-width="2" />
      ${createBrowserHeader(440, 'Stitchify Composite Preview')}
      
      <g transform="translate(24, 64)">
        <rect width="392" height="90" rx="8" fill="#1E293B" />
        <rect x="16" y="16" width="120" height="14" rx="3" fill="#38BDF8" opacity="0.6" />
        <rect x="16" y="40" width="220" height="10" rx="2" fill="#64748B" opacity="0.4" />

        <line x1="16" y1="102" x2="376" y2="102" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />

        <rect y="114" width="392" height="100" rx="8" fill="#1E293B" />
        <rect x="16" y="130" width="80" height="50" rx="4" fill="#0F172A" />
        <rect x="110" y="130" width="80" height="50" rx="4" fill="#0F172A" />
        <rect x="204" y="130" width="80" height="50" rx="4" fill="#0F172A" />

        <!-- Markup Annotation Callout -->
        <rect x="250" y="130" width="130" height="30" rx="6" fill="#EF4444" />
        <text x="315" y="150" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFF" text-anchor="middle">Bug Highlight</text>

        <line x1="16" y1="226" x2="376" y2="226" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />

        <rect y="238" width="392" height="90" rx="8" fill="#1E293B" />
        <rect x="16" y="254" width="160" height="14" rx="3" fill="#64748B" opacity="0.5" />
      </g>
    </g>
  </svg>`;
}

async function generateAll() {
  ensureDir(outDir);
  console.log('🎨 Generating Chrome Web Store promotional assets & screenshots...');

  const assets = [
    {
      name: 'screenshot-1-capture-docked-sidepanel.png',
      svg: getScreenshot1Svg(),
      width: 1280,
      height: 800,
    },
    {
      name: 'screenshot-2-vertical-stitcher-spacing.png',
      svg: getScreenshot2Svg(),
      width: 1280,
      height: 800,
    },
    {
      name: 'screenshot-3-annotation-markup-studio.png',
      svg: getScreenshot3Svg(),
      width: 1280,
      height: 800,
    },
    {
      name: 'screenshot-4-lossless-png-pdf-export.png',
      svg: getScreenshot4Svg(),
      width: 1280,
      height: 800,
    },
    {
      name: 'promo-small-440x280.png',
      svg: getPromoSmallSvg(),
      width: 440,
      height: 280,
    },
    {
      name: 'promo-marquee-1400x560.png',
      svg: getPromoMarqueeSvg(),
      width: 1400,
      height: 560,
    },
  ];

  for (const asset of assets) {
    const dest = path.join(outDir, asset.name);
    await sharp(Buffer.from(asset.svg))
      .resize(asset.width, asset.height)
      .png({ quality: 100 })
      .toFile(dest);
    console.log(`✓ Generated ${asset.name} (${asset.width}x${asset.height}px)`);
  }

  // Also copy icon128.png into store-assets for convenient upload
  const iconSrc = path.resolve('public/icons/icon128.png');
  const iconDest = path.join(outDir, 'store-icon-128x128.png');
  if (fs.existsSync(iconSrc)) {
    fs.copyFileSync(iconSrc, iconDest);
    console.log('✓ Copied store-icon-128x128.png (128x128px)');
  }

  console.log(`\n🎉 All Chrome Web Store visual assets created in: artifacts/store-assets/\n`);
}

generateAll().catch(console.error);