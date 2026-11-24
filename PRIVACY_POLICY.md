# Privacy Policy for Stitchify

**Last Updated:** November 23, 2026  
**Effective Date:** November 23, 2026  

Stitchify ("we", "our", or "the extension"), developed by **Ace Studios Nepal** and powered by **sajilotool.com**, is a browser extension and web studio designed to capture multiple webpage sections, vertically stitch them into continuous composite images, annotate details, and export them as PNG or PDF.

We are deeply committed to protecting your privacy. This Privacy Policy explains our practices regarding user data, permissions, and security.

---

## 1. 100% Client-Side & Local Processing

Stitchify operates **entirely on your local device**. 
* **Zero Remote Servers:** Stitchify does not operate any backend server, API, or database to collect, transmit, or process your captures.
* **Zero Tracking or Analytics:** Stitchify contains no analytics scripts, tracking beacons, telemetry, advertising libraries, or third-party SDKs.
* **Zero Image Uploads:** Every screenshot taken, stitched, or annotated remains strictly inside your browser's local memory and local storage.

---

## 2. Information We Handle and How It Is Used

When you use Stitchify, the following data is processed exclusively on your machine:

1. **Captured Viewport Images:** Screen pixels captured when you trigger a screenshot (via the popup, docked side panel, or `Alt+S` hotkey). These images are stored locally in your browser's **IndexedDB** (`stitchify-db`) to enable reordering, gap adjustments, and canvas stitching.
2. **Page Metadata:** The active tab's page title and URL are stored locally alongside each thumbnail strictly for organizing your captures and generating descriptive export filenames (e.g., `stitched-screenshot-YYYY-MM-DD.png`).
3. **Canvas Annotations:** Annotation strokes (arrows, boxes, text callouts, pen paths) and stitch settings (spacing, padding, background color) are saved locally so you can resume your editing session.

**None of this information is ever transmitted off your computer.**

---

## 3. Chrome Extension Permissions & Technical Justifications

Stitchify requests only the minimal set of permissions required to deliver its core functionality:

| Permission | Technical Purpose |
| :--- | :--- |
| **`activeTab`** | Grants temporary access to the active webpage when you invoke capture via the popup or shortcut to obtain viewport dimensions and capture visible pixels. |
| **`scripting`** | Injects a lightweight script into the active tab upon capture to query `window.devicePixelRatio`, ensuring screenshots are rendered at native Retina / HiDPI sharpness without blurriness. |
| **`sidePanel`** | Provides a persistent docked sidebar adjacent to your webpages so you can review captures, scroll, and reorder slides without closing the extension popup. |
| **`host_permissions: ["<all_urls>"]`** | Allows you to capture viewport sections across any webpage you browse. In Chromium Manifest V3, persistent side panels (`chrome.sidePanel`) and background listeners cannot access tab content with `activeTab` alone because clicks inside the side panel frame do not originate from the webpage DOM. Broad host permission is required solely to invoke `chrome.tabs.captureVisibleTab` on the active tab upon explicit user request. |

*(Note: Stitchify uses standard client-side browser IndexedDB for local screenshot retention and standard HTML5 client-side downloads for PNG/PDF saving; it requests no elevated storage or downloads extension permissions).*

Stitchify **never** monitors your background web activity, intercepts web traffic, modifies page content, or collects cookies or form data.

---

## 4. Data Retention and Deletion

All data created with Stitchify is stored in your browser's local storage:
* You can remove individual captures by clicking the trash icon in the side panel or studio editor.
* You can delete all captures at once by clearing the capture reel.
* Uninstalling the extension or clearing your browser's site data / cache immediately and permanently purges all stored screenshots and settings.

---

## 5. Third-Party Sharing and Sale of Data

* **We do not sell, rent, trade, or transfer any user data.**
* **We do not use user data for creditworthiness, lending, or advertising.**
* **We do not share any data with third parties, brokers, or AI model trainers.**

---

## 6. Open Source Verification

Stitchify is open source under the **MIT License**. Anyone can review and audit our complete source code, manifest declarations, and build processes at our official repository:  
[https://github.com/Ace-Studios-Nepal/screenshot-stitcher](https://github.com/Ace-Studios-Nepal/screenshot-stitcher)

---

## 7. Compliance with Chrome Web Store Policies

Stitchify adheres strictly to the **Google Chrome Web Store Developer Program Policies**, including the **Limited Use Policy** and **Single Purpose Policy**.

---

## 8. Changes to This Policy

If we make updates to this Privacy Policy, the revised date will be displayed at the top of this page. Any updates will remain aligned with our fundamental guarantee: **100% local, client-side processing with zero remote data collection.**

---

## 9. Contact Us

If you have any questions, feedback, or concerns regarding this Privacy Policy:
* **GitHub Issues:** [https://github.com/Ace-Studios-Nepal/screenshot-stitcher/issues](https://github.com/Ace-Studios-Nepal/screenshot-stitcher/issues)
* **Organization:** Ace Studios Nepal
* **Website:** [https://sajilotool.com](https://sajilotool.com)
