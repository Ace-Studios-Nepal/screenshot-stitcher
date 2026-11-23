import React from 'react';
import {
    ShieldCheck,
    Zap,
    Sliders,
    FileText,
    Download,
    ExternalLink,
    Github,
    Type,
    MousePointer,
    HelpCircle,
} from 'lucide-react';
import { StitchifyLogo } from '../components/StitchifyLogo';

const SAJILOTOOL_URL = 'https://sajilotool.com';
const FIREFOX_ADDON_URL = 'https://addons.mozilla.org/addon/screenshot-stitcher/';
const CHROME_STORE_URL = 'https://chrome.google.com/webstore';

const FirefoxIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Firefox</title>
        <path d="M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477-.091-.147-.184-.292-.273-.446a3.545 3.545 0 01-.13-.24 2.118 2.118 0 01-.172-.46.03.03 0 00-.027-.03.038.038 0 00-.021 0l-.006.001a.037.037 0 00-.01.005L15.624 0c-2.585 1.515-3.657 4.168-3.932 5.856a6.197 6.197 0 00-2.305.587.297.297 0 00-.147.37c.057.162.24.24.396.17a5.622 5.622 0 012.008-.523l.067-.005a5.847 5.847 0 011.957.222l.095.03a5.816 5.816 0 01.616.228c.08.036.16.073.238.112l.107.055a5.835 5.835 0 01.368.211 5.953 5.953 0 012.034 2.104c-.62-.437-1.733-.868-2.803-.681 4.183 2.09 3.06 9.292-2.737 9.02a5.164 5.164 0 01-1.513-.292 4.42 4.42 0 01-.538-.232c-1.42-.735-2.593-2.121-2.74-3.806 0 0 .537-2 3.845-2 .357 0 1.38-.998 1.398-1.287-.005-.095-2.029-.9-2.817-1.677-.422-.416-.622-.616-.8-.767a3.47 3.47 0 00-.301-.227 5.388 5.388 0 01-.032-2.842c-1.195.544-2.124 1.403-2.8 2.163h-.006c-.46-.584-.428-2.51-.402-2.913-.006-.025-.343.176-.389.206-.406.29-.787.616-1.136.974-.397.403-.76.839-1.085 1.303a9.816 9.816 0 00-1.562 3.52c-.003.013-.11.487-.19 1.073-.013.09-.026.181-.037.272a7.8 7.8 0 00-.069.667l-.002.034-.023.387-.001.06C.386 18.795 5.593 24 12.016 24c5.752 0 10.527-4.176 11.463-9.661.02-.149.035-.298.052-.448.232-1.994-.025-4.09-.753-5.844z" />
    </svg>
);

const ChromeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Google Chrome</title>
        <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z" />
    </svg>
);

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
            {/* Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/20 blur-[130px] rounded-full" />
                <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-indigo-600/15 blur-[140px] rounded-full" />
            </div>

            {/* Navigation */}
            <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <StitchifyLogo className="w-9 h-9" />
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-tight text-white leading-none">
                                Stitch<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">ify</span>
                            </span>
                            <a
                                href={SAJILOTOOL_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-slate-400 hover:text-blue-400 transition-colors font-medium mt-1 inline-flex items-center gap-0.5"
                                title="Powered by SajiloTool"
                            >
                                <span>by sajilotool.com</span>
                            </a>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
                        <a
                            href="#features"
                            className="hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="hover:text-white transition-colors"
                        >
                            How It Works
                        </a>
                        <a
                            href="#preview"
                            className="hover:text-white transition-colors"
                        >
                            Studio Preview
                        </a>
                        <a
                            href="#faq"
                            className="hover:text-white transition-colors"
                        >
                            FAQ
                        </a>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <a
                            href="editor.html"
                            className="text-xs font-semibold px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden md:inline-flex items-center gap-1.5"
                        >
                            <span>Open Studio Demo</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </a>
                        <a
                            href={FIREFOX_ADDON_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold px-3 sm:px-3.5 py-2 rounded-lg bg-orange-600/15 hover:bg-orange-600/25 text-orange-400 border border-orange-500/30 hover:border-orange-500/50 transition-all flex items-center gap-1.5"
                        >
                            <FirefoxIcon className="w-3.5 h-3.5" />
                            <span>Firefox</span>
                        </a>
                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold px-3 sm:px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5"
                        >
                            <ChromeIcon className="w-3.5 h-3.5" />
                            <span>Chrome</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                    <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>
                        Powered by{' '}
                        <a
                            href={SAJILOTOOL_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-blue-300 hover:text-white underline underline-offset-2 transition-colors"
                        >
                            SajiloTool
                        </a>
                        {' '}• Chrome & Firefox Extension • 100% Local & Free
                    </span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
                    Capture. Stitch. Annotate.{' '}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 mt-2">
                        In One Seamless Flow.
                    </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Stop manually cropping and gluing screenshots in clumsy
                    graphics editors. Capture multiple webpage sections with a
                    single shortcut, customize gap spacing, highlight details,
                    and export as high-res PNG or multi-page PDF.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href={FIREFOX_ADDON_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-sm font-semibold shadow-xl shadow-orange-600/25 transition-all flex items-center justify-center gap-2"
                    >
                        <FirefoxIcon className="w-4 h-4" />
                        <span>Add to Firefox</span>
                    </a>
                    <a
                        href={CHROME_STORE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                    >
                        <ChromeIcon className="w-4 h-4" />
                        <span>Add to Chrome</span>
                    </a>
                    <a
                        href="editor.html"
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        <span>Launch Web Studio Demo</span>
                        <ExternalLink className="w-4 h-4 opacity-70" />
                    </a>
                </div>

                {/* Shortcut Banner */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <span>Instant capture hotkey:</span>
                    <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px]">
                        Alt + S
                    </kbd>
                    <span className="text-slate-500">
                        (on both Windows & Mac)
                    </span>
                </div>
            </section>

            {/* Product Mockup Showcase */}
            <section
                id="preview"
                className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto"
            >
                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
                    {/* Mock Browser Header */}
                    <div className="h-10 bg-slate-950 border-b border-slate-800/80 px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="bg-slate-900 px-6 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800 flex items-center gap-1.5">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <a
                                href={SAJILOTOOL_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-blue-400 transition-colors"
                            >
                                stitchify.sajilotool.com
                            </a>
                        </div>
                        <div className="w-12" />
                    </div>

                    {/* Mock Studio UI Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
                        {/* Mock Left Sidebar */}
                        <div className="md:col-span-4 p-4 border-r border-slate-800/80 bg-slate-950/60 space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                                <span className="text-xs font-semibold text-slate-300">
                                    Captures (3)
                                </span>
                                <span className="text-[10px] text-blue-400 font-medium">
                                    Reorderable
                                </span>
                            </div>

                            {/* Sample capture items */}
                            <div className="space-y-2">
                                {[
                                    {
                                        title: 'Hero Banner Section',
                                        size: '1280 × 640px',
                                    },
                                    {
                                        title: 'Feature Comparison Table',
                                        size: '1280 × 580px',
                                    },
                                    {
                                        title: 'Checkout Pricing Card',
                                        size: '1280 × 520px',
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                                    >
                                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                        <div className="w-12 h-8 rounded bg-gradient-to-br from-blue-900/40 to-slate-800 border border-slate-700/50 flex items-center justify-center text-[10px] text-blue-400 font-mono">
                                            IMG
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-slate-200 truncate text-[11px]">
                                                {item.title}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-mono">
                                                {item.size}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mock Spacing Slider */}
                            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2 text-xs">
                                <div className="flex justify-between text-slate-300 font-medium text-[11px]">
                                    <span>Gap Spacing</span>
                                    <span className="font-mono text-blue-400">
                                        24px
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 w-1/4 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Mock Center Canvas */}
                        <div className="md:col-span-8 p-6 bg-slate-950 flex flex-col items-center justify-center relative">
                            {/* Floating Toolbar Badge */}
                            <div className="absolute top-4 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-lg flex items-center gap-3 text-xs text-slate-300">
                                <span className="flex items-center gap-1 text-blue-400 font-semibold">
                                    <MousePointer className="w-3.5 h-3.5" />{' '}
                                    Arrow
                                </span>
                                <span className="flex items-center gap-1 text-slate-400">
                                    <Type className="w-3.5 h-3.5" /> Callout
                                </span>
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="font-mono text-[10px] text-slate-400">
                                    100% Zoom
                                </span>
                            </div>

                            {/* Stitched Output Mock Card */}
                            <div className="w-72 bg-slate-900 rounded-xl border border-slate-700/80 p-3 shadow-2xl space-y-3 relative">
                                <div className="h-14 rounded-lg bg-blue-950/60 border border-blue-800/40 p-2 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="w-20 h-2 bg-blue-400/50 rounded" />
                                        <div className="w-28 h-2 bg-blue-400/30 rounded" />
                                    </div>
                                    <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded font-medium">
                                        Bug: Misaligned
                                    </span>
                                </div>

                                {/* 24px Gap Spacing Visualizer */}
                                <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-slate-400 py-0.5 border-y border-dashed border-slate-800">
                                    <span>↕ 24px Spacing Gap</span>
                                </div>

                                <div className="h-14 rounded-lg bg-slate-800/60 border border-slate-700/40 p-2 space-y-1">
                                    <div className="w-24 h-2 bg-slate-400/40 rounded" />
                                    <div className="w-36 h-2 bg-slate-400/20 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Highlights Grid */}
            <section
                id="features"
                className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-900"
            >
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Engineered for Fast, Frictionless Screenshotting
                    </h2>
                    <p className="mt-3 text-sm text-slate-400">
                        Every feature is focused on making multi-section web
                        documentation quick, accurate, and completely private.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Zap className="w-5 h-5 text-blue-400" />,
                            title: 'Pinned Side Panel',
                            desc: 'Keep the capture drawer open while scrolling and clicking through pages. Never lose popup state again.',
                        },
                        {
                            icon: (
                                <Sliders className="w-5 h-5 text-indigo-400" />
                            ),
                            title: 'Configurable Gap Spacing',
                            desc: 'Tweak spacing between stitched captures from 0 to 100px. Normalize widths or center items automatically.',
                        },
                        {
                            icon: <Type className="w-5 h-5 text-sky-400" />,
                            title: 'Rich Visual Annotations',
                            desc: 'Draw directional arrows, bounding rectangles, text callouts, highlighters, and freehand pens with undo/redo.',
                        },
                        {
                            icon: (
                                <Download className="w-5 h-5 text-emerald-400" />
                            ),
                            title: 'High-Res PNG Export',
                            desc: 'Download crisp composite images at native device pixel ratio (DPR) without pixelation or quality loss.',
                        },
                        {
                            icon: (
                                <FileText className="w-5 h-5 text-rose-400" />
                            ),
                            title: 'Multi-Page & Continuous PDF',
                            desc: 'Export as a single tall continuous document or auto-slice cleanly across standard A4 pages.',
                        },
                        {
                            icon: (
                                <ShieldCheck className="w-5 h-5 text-teal-400" />
                            ),
                            title: '100% Private & Local',
                            desc: 'All image rendering runs on HTML5 Canvas and IndexedDB. Zero servers, zero trackers, zero data leaving your machine.',
                        },
                    ].map((f, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all hover:shadow-xl space-y-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center">
                                {f.icon}
                            </div>
                            <h3 className="text-base font-semibold text-white">
                                {f.title}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section
                id="how-it-works"
                className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-slate-900"
            >
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Three Steps to the Perfect Stitch
                    </h2>
                    <p className="mt-3 text-sm text-slate-400">
                        From capture to export in under 30 seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {[
                        {
                            step: '01',
                            title: 'Capture Viewports',
                            desc: 'Scroll down to any section and press Alt+S or tap Capture in the side panel.',
                        },
                        {
                            step: '02',
                            title: 'Arrange & Annotate',
                            desc: 'Drag thumbnails to reorder, set the gap spacing, and draw arrows or callouts to highlight bugs.',
                        },
                        {
                            step: '03',
                            title: 'Export & Share',
                            desc: 'Download your composite PNG or paginated PDF with a single click, ready for Slack, Jira, or Docs.',
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3"
                        >
                            <span className="text-3xl font-black font-mono text-blue-500/40 block">
                                {s.step}
                            </span>
                            <h3 className="text-base font-semibold text-white">
                                {s.title}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section
                id="faq"
                className="py-20 px-4 sm:px-6 max-w-3xl mx-auto border-t border-slate-900"
            >
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                    {[
                        {
                            q: 'Does Stitchify upload my images to any server?',
                            a: 'No. All captures, stitching, and annotations happen locally inside your browser using the HTML5 Canvas API and IndexedDB. Nothing is ever sent to an external server.',
                        },
                        {
                            q: 'Can I export to PDF as well as PNG?',
                            a: 'Yes! You can choose between a continuous single-page PDF (ideal for scrolling) or auto-sliced standard A4 multi-page document mode.',
                        },
                        {
                            q: 'What browsers are supported?',
                            a: 'Stitchify officially supports Mozilla Firefox (available on Firefox Add-ons) as well as all modern Chromium-based browsers, including Google Chrome, Microsoft Edge, Brave, Arc, and Opera.',
                        },
                        {
                            q: 'Is there any limit to the number of screenshots I can stitch?',
                            a: 'We use IndexedDB instead of browser storage limits, so you can stitch dozens of high-res captures in one session.',
                        },
                        {
                            q: 'Is Stitchify free?',
                            a: 'Yes, Stitchify is 100% free and open-source under the MIT license.',
                        },
                    ].map((faq, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2"
                        >
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span>{faq.q}</span>
                            </h3>
                            <p className="text-slate-400 leading-relaxed pl-6">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Footer Banner */}
            <section className="py-16 px-4 sm:px-6 border-t border-slate-900">
                <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/30 text-center space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Ready to stitchify your screenshots?
                    </h2>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                        Install Stitchify on Firefox or Chrome, or jump right into the browser
                        Studio demo.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href={FIREFOX_ADDON_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
                        >
                            <FirefoxIcon className="w-4 h-4" />
                            <span>Add to Firefox</span>
                        </a>
                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                        >
                            <ChromeIcon className="w-4 h-4" />
                            <span>Add to Chrome</span>
                        </a>
                        <a
                            href="editor.html"
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <span>Launch Studio Demo</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 border-t border-slate-900 text-center text-xs text-slate-400">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
                        <div className="flex items-center gap-2">
                            <StitchifyLogo className="w-5 h-5" />
                            <span className="font-semibold text-slate-300">
                                Stitchify
                            </span>
                            <span>• MIT License</span>
                        </div>
                        <span className="hidden sm:inline text-slate-600">•</span>
                        <span>
                            Powered by{' '}
                            <a
                                href={SAJILOTOOL_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
                            >
                                sajilotool.com
                            </a>
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={SAJILOTOOL_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-slate-200 transition-colors flex items-center gap-1 text-slate-300"
                        >
                            <span>SajiloTool</span>
                            <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                        <a
                            href={FIREFOX_ADDON_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-slate-200 transition-colors flex items-center gap-1.5"
                        >
                            <FirefoxIcon className="w-3.5 h-3.5 text-orange-400" />
                            <span>Firefox Add-on</span>
                        </a>
                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-slate-200 transition-colors flex items-center gap-1.5"
                        >
                            <ChromeIcon className="w-3.5 h-3.5 text-blue-400" />
                            <span>Chrome Extension</span>
                        </a>
                        <a
                            href="editor.html"
                            className="hover:text-slate-200 transition-colors"
                        >
                            Studio Demo
                        </a>
                        <a
                            href="privacy.html"
                            className="hover:text-slate-200 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="https://github.com/Ace-Studios-Nepal/screenshot-stitcher"
                            className="hover:text-slate-200 transition-colors flex items-center gap-1"
                        >
                            <Github className="w-3.5 h-3.5" /> GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
