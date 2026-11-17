import React from 'react';
import {
    Layers,
    ArrowRight,
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
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
                            <Layers className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">
                            Screenshot Stitcher
                        </span>
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

                    <div className="flex items-center gap-3">
                        <a
                            href="editor.html"
                            className="text-xs font-semibold px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden sm:inline-flex items-center gap-1.5"
                        >
                            <span>Open Studio Demo</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </a>
                        <a
                            href="https://chrome.google.com/webstore"
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5"
                        >
                            <span>Add to Chrome</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6 animate-pulse">
                    <Zap className="w-3.5 h-3.5" />
                    <span>
                        Chrome Manifest V3 Extension • 100% Local & Free
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
                        href="https://chrome.google.com/webstore"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>Install Extension (Free)</span>
                    </a>
                    <a
                        href="editor.html"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
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
                            <span>screenshot-stitcher.sajilotool.com</span>
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
                            q: 'Does Screenshot Stitcher upload my images to any server?',
                            a: 'No. All captures, stitching, and annotations happen locally inside your browser using the HTML5 Canvas API and IndexedDB. Nothing is ever sent to an external server.',
                        },
                        {
                            q: 'Can I export to PDF as well as PNG?',
                            a: 'Yes! You can choose between a continuous single-page PDF (ideal for scrolling) or auto-sliced standard A4 multi-page document mode.',
                        },
                        {
                            q: 'What browsers are supported?',
                            a: 'Any modern Chromium-based browser, including Google Chrome, Microsoft Edge, Brave, Arc, and Opera (Manifest V3).',
                        },
                        {
                            q: 'Is there any limit to the number of screenshots I can stitch?',
                            a: 'We use IndexedDB instead of Chrome’s 10MB storage limit, so you can stitch dozens of high-res captures in one session.',
                        },
                        {
                            q: 'Is this extension free?',
                            a: 'Yes, Screenshot Stitcher is 100% free and open-source under the MIT license.',
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
                        Ready to stitch your first screenshot?
                    </h2>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                        Install the extension or jump right into the browser
                        Studio demo.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="https://chrome.google.com/webstore"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg transition-all"
                        >
                            Add to Chrome
                        </a>
                        <a
                            href="editor.html"
                            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                        >
                            Launch Studio Demo
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 border-t border-slate-900 text-center text-xs text-slate-400">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-slate-300">
                            Screenshot Stitcher
                        </span>
                        <span>• MIT License</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="editor.html"
                            className="hover:text-slate-200 transition-colors"
                        >
                            Studio
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
