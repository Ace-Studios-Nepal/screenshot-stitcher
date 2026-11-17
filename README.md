<div align="center">

# 📸 Screenshot Stitcher

**Capture, stitch, annotate, and export clean web screenshots — directly in your browser.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-success.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Vite](https://img.shields.io/badge/Bundled%20with-Vite-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/UI-React%2018-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Cross Browser](https://img.shields.io/badge/Browsers-Chrome%20%7C%20Firefox%20%7C%20Edge%20%7C%20Brave-orange.svg)](#-browser-installation-developer-mode)

[**Live Web Studio Demo**](https://screenshot-stitcher.vercel.app/editor.html) • [**Report Bug**](https://github.com/Ace-Studios-Nepal/screenshot-stitcher/issues) • [**Request Feature**](https://github.com/Ace-Studios-Nepal/screenshot-stitcher/issues)

</div>

---

## 🌟 Highlights

* ⚡ **1-Click Viewport Capture**: Grab the visible area instantly with keyboard shortcut `Alt + S` or via the popup.
* 🧩 **Side Panel Reel**: View captured slides in real-time, drag-and-drop to reorder sequence, or delete unwanted captures.
* 🧵 **Seamless Vertical Stitcher**: Automatically align and stitch multiple screenshots into a single continuous high-resolution image with configurable spacing, margins, background colors, and drop shadows.
* ✏️ **Annotation Studio**: Draw with freehand pen, draw arrows, rectangles, text labels, and highlights to mark up important details.
* 📦 **Lossless Export**: Download the stitched result as a high-fidelity **PNG** or multi-page **PDF** with custom document margins.
* 🔒 **100% Private & Client-Side**: No analytics, no tracking, and zero remote image uploads. Everything is stored and processed locally on your machine using IndexedDB and HTML5 Canvas.

---

## 🌐 Chromium Compatibility & Architecture

Screenshot Stitcher is **100% compatible with Chromium-based browsers** and strictly adheres to Google's **Manifest V3** standard.

### Supported Chromium Browsers
* 🟢 **Google Chrome** (v116+)
* 🦁 **Brave Browser**
* 🌊 **Microsoft Edge** (v116+)
* ⭕ **Opera / Opera GX**
* 🧭 **Vivaldi**
* 🎨 **Arc Browser**

### Technical Implementation Details for Chromium:
* **Background Service Worker**: Operates via a native Manifest V3 ES module service worker (`background.js`) with event-driven lifecycle management.
* **Native Side Panel API**: Fully implements Chromium's `chrome.sidePanel` API (`side_panel` declaration and `"sidePanel"` permission) to provide a dockable slide reel adjacent to active tabs.
* **User Gesture Preservation**: Opening the side panel from the popup preserves Chromium's required user gesture context directly in the click event handler before delegating to background routines.
* **Broad Host Permissions**: Declares `"host_permissions": ["<all_urls>"]` to enable capturing visible tabs (`chrome.tabs.captureVisibleTab`) and querying device pixel ratios (`chrome.scripting.executeScript`) from both the popup and persistent side panel frames without `activeTab` permission drops.
* **Internal Protocol Safety**: Automatically detects and guards against scripting or capturing restricted browser internal pages (`chrome://`, `edge://`, `brave://`, `opera://`, `vivaldi://`, `arc://`, `devtools://`, `chrome-untrusted://`).
* **Offline IndexedDB Storage**: Uses standard IndexedDB (`idb`) which operates consistently across Chromium service workers and extension pages.

---

## 🚀 Browser Installation (Developer Mode)

You can load and use Screenshot Stitcher directly without waiting for store approval.

### 🔷 Google Chrome / Brave / Microsoft Edge / Arc / Opera

1. **Download / Build the Extension**:
   * Download the latest release `.zip` from [GitHub Releases](https://github.com/Ace-Studios-Nepal/screenshot-stitcher/releases) and extract it, **OR**
   * Clone this repo and build it locally:
     ```bash
     git clone https://github.com/Ace-Studios-Nepal/screenshot-stitcher.git
     cd screenshot-stitcher
     npm install
     npm run build
     ```
     *(The unpacked extension files will be in the `dist/` directory).*

2. **Open Extensions Manager**:
   * **Chrome**: Visit `chrome://extensions`
   * **Brave**: Visit `brave://extensions`
   * **Edge**: Visit `edge://extensions`
   * **Opera**: Visit `opera://extensions`
   * **Vivaldi**: Visit `vivaldi://extensions`
3. **Enable Developer Mode**:
   * Toggle the **Developer mode** switch (usually located at the top-right corner).
4. **Load the Extension**:
   * Click the **"Load unpacked"** button in the top toolbar.
   * Select the **`dist/`** directory (or your extracted release folder).
5. **Pin & Use**:
   * Click the puzzle icon in your browser toolbar, pin **Screenshot Stitcher**, and start capturing with `Alt + S`!

---

### 🦊 Mozilla Firefox

1. Build or locate the extension package:
   ```bash
   npm run package
   ```
2. Open Firefox and navigate to:
   ```text
   about:debugging#/runtime/this-firefox
   ```
3. Click **"Load Temporary Add-on..."**.
4. Select `manifest.json` inside the `dist/` folder, or select `artifacts/screenshot_stitcher-1.0.0.zip`.
5. The extension is now active in Firefox.

---

## ☁️ Deploying to Vercel (Web App & Demo)

Screenshot Stitcher doubles as a standalone web application! The landing page (`index.html`) and canvas editor (`editor.html`) run directly in modern browsers with sample data and local image upload support.

### One-Click Deploy or GitHub Integration:
1. Push your repository to GitHub.
2. Go to your [Vercel Dashboard](https://vercel.com/) and click **"Add New Project"**.
3. Import the `screenshot-stitcher` repository.
4. Vercel automatically detects the Vite framework preset:
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
   * **Install Command**: `npm install`
5. Click **Deploy**.
6. Once deployed, users can visit your Vercel URL to:
   * View the product landing page (`/`)
   * Try the live studio editor (`/editor.html`)
   * Upload custom images to stitch and annotate without installing the extension!

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
| :--- | :--- |
| <kbd>Alt</kbd> + <kbd>S</kbd> | Capture currently active viewport tab |
| <kbd>Cmd/Ctrl</kbd> + <kbd>Z</kbd> | Undo last annotation stroke |
| <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Redo last annotation stroke |

> [!TIP]
> You can customize shortcut keys in Chrome at `chrome://extensions/shortcuts` or Firefox at `about:addons` ➜ Cog icon ➜ Manage Extension Shortcuts.

---

## 🛠 Local Development & Build Scripts

### Prerequisites
* **Node.js**: `v20.x` or `v22.x` (LTS recommended)
* **npm**: `v10.x` or higher

```bash
# 1. Clone the repository
git clone https://github.com/Ace-Studios-Nepal/screenshot-stitcher.git
cd screenshot-stitcher

# 2. Install dependencies
npm install

# 3. Start local development server with HMR
npm run dev

# 4. Run tests
npm test

# 5. Production build (outputs to dist/)
npm run build

# 6. Package extension zip for Firefox Add-ons (AMO):
npm run package

# 7. Package unminified source code for Mozilla Reviewers:
npm run package:source
```

---

## 📁 Repository Structure

```text
screenshot-stitcher/
├── dist/                  # Production build output (loaded in developer mode)
├── public/                # Static assets & Manifest V3 configuration
│   ├── icons/             # 16px, 48px, 128px extension icons
│   └── manifest.json      # Cross-browser Manifest V3 config
├── src/
│   ├── background/        # Service worker & capture handler
│   ├── components/        # Reusable UI components & dialogs
│   ├── editor/            # Annotation canvas, stitcher controls, preview
│   ├── landing/           # Landing page UI components
│   ├── popup/             # Extension popup view
│   ├── sidepanel/         # Side panel live captures view
│   ├── storage/           # IndexedDB client-side database
│   ├── types/             # TypeScript interfaces & types
│   └── utils/             # Stitching math, annotation renderer, PDF export
├── tests/                 # Vitest automated test suite
├── index.html             # Landing page entry point
├── editor.html            # Studio editor entry point
├── popup.html             # Popup entry point
├── sidepanel.html         # Side panel entry point
├── package.json           # Dependencies and build scripts
└── vite.config.ts         # Multi-page Vite build configuration
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/Ace-Studios-Nepal/screenshot-stitcher/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](file:///Users/aashish-cd/Desktop/cd/Projects/screenshot-stitcher/LICENSE) for more information.

Developed with ❤️ by **[Ace Studios Nepal](https://github.com/Ace-Studios-Nepal)**.
