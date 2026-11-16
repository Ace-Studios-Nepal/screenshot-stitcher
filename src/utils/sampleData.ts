import { CaptureItem } from '../types';

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function generateSampleCaptures(): CaptureItem[] {
  const timestamp = Date.now();

  // 1. Hero Section
  const c1 = document.createElement('canvas');
  c1.width = 1280;
  c1.height = 480;
  const ctx1 = c1.getContext('2d')!;

  // Background
  const grad1 = ctx1.createLinearGradient(0, 0, 1280, 480);
  grad1.addColorStop(0, '#0f172a');
  grad1.addColorStop(1, '#1e293b');
  ctx1.fillStyle = grad1;
  ctx1.fillRect(0, 0, 1280, 480);

  // Mock Navbar
  ctx1.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx1.fillRect(0, 0, 1280, 64);
  ctx1.fillStyle = '#38bdf8';
  drawRoundedRect(ctx1, 48, 18, 28, 28, 6);
  ctx1.fill();

  ctx1.font = 'bold 18px sans-serif';
  ctx1.fillStyle = '#f8fafc';
  ctx1.fillText('Acme Cloud Studio', 88, 38);

  // Nav links
  ctx1.font = '14px sans-serif';
  ctx1.fillStyle = '#94a3b8';
  ctx1.fillText('Products', 380, 38);
  ctx1.fillText('Solutions', 480, 38);
  ctx1.fillText('Pricing', 580, 38);
  ctx1.fillText('Documentation', 660, 38);

  // Hero Headline
  ctx1.font = 'bold 44px sans-serif';
  ctx1.fillStyle = '#ffffff';
  ctx1.fillText('Build, Deploy & Scale Systems', 48, 170);

  ctx1.font = '20px sans-serif';
  ctx1.fillStyle = '#94a3b8';
  ctx1.fillText('High-performance cloud infrastructure designed for modern engineering teams.', 48, 220);

  // CTA Buttons
  ctx1.fillStyle = '#2563eb';
  drawRoundedRect(ctx1, 48, 260, 160, 48, 10);
  ctx1.fill();
  ctx1.font = 'bold 16px sans-serif';
  ctx1.fillStyle = '#ffffff';
  ctx1.fillText('Get Started Free', 68, 290);

  ctx1.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx1.lineWidth = 1.5;
  drawRoundedRect(ctx1, 224, 260, 150, 48, 10);
  ctx1.stroke();
  ctx1.fillStyle = '#e2e8f0';
  ctx1.fillText('Live Showcase', 252, 290);

  // Decorative grid / code block on right
  ctx1.fillStyle = 'rgba(15, 23, 42, 0.7)';
  drawRoundedRect(ctx1, 800, 100, 430, 320, 16);
  ctx1.fill();
  ctx1.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  drawRoundedRect(ctx1, 800, 100, 430, 320, 16);
  ctx1.stroke();

  // Mac dots
  ctx1.fillStyle = '#ef4444';
  ctx1.beginPath();
  ctx1.arc(824, 124, 6, 0, Math.PI * 2);
  ctx1.fill();
  ctx1.fillStyle = '#f59e0b';
  ctx1.beginPath();
  ctx1.arc(842, 124, 6, 0, Math.PI * 2);
  ctx1.fill();
  ctx1.fillStyle = '#10b981';
  ctx1.beginPath();
  ctx1.arc(860, 124, 6, 0, Math.PI * 2);
  ctx1.fill();

  // Code lines
  ctx1.font = '13px monospace';
  ctx1.fillStyle = '#38bdf8';
  ctx1.fillText('import { deployApp } from "@acme/core";', 824, 170);
  ctx1.fillStyle = '#a855f7';
  ctx1.fillText('const cluster = await deployApp({', 824, 205);
  ctx1.fillStyle = '#94a3b8';
  ctx1.fillText('  region: "us-east-1",', 844, 235);
  ctx1.fillText('  replicas: 4,', 844, 265);
  ctx1.fillText('  autoscale: true', 844, 295);
  ctx1.fillStyle = '#a855f7';
  ctx1.fillText('});', 824, 325);

  // 2. Metrics & Feature Grid Section
  const c2 = document.createElement('canvas');
  c2.width = 1280;
  c2.height = 420;
  const ctx2 = c2.getContext('2d')!;

  ctx2.fillStyle = '#090d16';
  ctx2.fillRect(0, 0, 1280, 420);

  ctx2.font = 'bold 28px sans-serif';
  ctx2.fillStyle = '#ffffff';
  ctx2.fillText('Real-Time Infrastructure Analytics', 48, 60);

  ctx2.font = '15px sans-serif';
  ctx2.fillStyle = '#64748b';
  ctx2.fillText('Monitor system throughput, latency percentiles, and resource utilization across regions.', 48, 92);

  // 3 Metric Cards
  const cards = [
    { label: 'Network Throughput', val: '4.8 GB/s', color: '#38bdf8', change: '+14.2% vs yesterday' },
    { label: 'Avg Latency (p99)', val: '18.4 ms', color: '#10b981', change: '-4.6ms improved' },
    { label: 'Cluster Health', val: '99.99%', color: '#a855f7', change: 'All 24 nodes healthy' },
  ];

  for (let i = 0; i < cards.length; i++) {
    const cx = 48 + i * 400;
    ctx2.fillStyle = '#111827';
    drawRoundedRect(ctx2, cx, 130, 370, 240, 14);
    ctx2.fill();
    ctx2.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx2.lineWidth = 1;
    drawRoundedRect(ctx2, cx, 130, 370, 240, 14);
    ctx2.stroke();

    ctx2.font = '14px sans-serif';
    ctx2.fillStyle = '#94a3b8';
    ctx2.fillText(cards[i].label, cx + 24, 170);

    ctx2.font = 'bold 36px sans-serif';
    ctx2.fillStyle = cards[i].color;
    ctx2.fillText(cards[i].val, cx + 24, 225);

    ctx2.font = '13px sans-serif';
    ctx2.fillStyle = '#64748b';
    ctx2.fillText(cards[i].change, cx + 24, 265);

    // Decorative mini-bar
    ctx2.fillStyle = 'rgba(255, 255, 255, 0.05)';
    drawRoundedRect(ctx2, cx + 24, 300, 320, 8, 4);
    ctx2.fill();
    ctx2.fillStyle = cards[i].color;
    drawRoundedRect(ctx2, cx + 24, 300, 180 + i * 40, 8, 4);
    ctx2.fill();
  }

  // 3. Pricing & Call-to-Action Section
  const c3 = document.createElement('canvas');
  c3.width = 1280;
  c3.height = 380;
  const ctx3 = c3.getContext('2d')!;

  ctx3.fillStyle = '#0f172a';
  ctx3.fillRect(0, 0, 1280, 380);

  // Big Banner
  ctx3.fillStyle = 'rgba(30, 41, 59, 0.8)';
  drawRoundedRect(ctx3, 48, 40, 1184, 290, 20);
  ctx3.fill();
  ctx3.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx3.lineWidth = 1.5;
  drawRoundedRect(ctx3, 48, 40, 1184, 290, 20);
  ctx3.stroke();

  ctx3.font = 'bold 32px sans-serif';
  ctx3.fillStyle = '#ffffff';
  ctx3.fillText('Start Building with Acme Today', 96, 120);

  ctx3.font = '16px sans-serif';
  ctx3.fillStyle = '#94a3b8';
  ctx3.fillText('Join over 40,000 teams building faster and more reliable web applications.', 96, 160);

  // Pricing pills
  ctx3.fillStyle = 'rgba(255, 255, 255, 0.06)';
  drawRoundedRect(ctx3, 96, 200, 360, 50, 10);
  ctx3.fill();
  ctx3.font = 'bold 15px sans-serif';
  ctx3.fillStyle = '#f8fafc';
  ctx3.fillText('Developer Plan: $0 / month (Unlimited builds)', 116, 232);

  ctx3.fillStyle = '#2563eb';
  drawRoundedRect(ctx3, 980, 140, 200, 50, 12);
  ctx3.fill();
  ctx3.font = 'bold 15px sans-serif';
  ctx3.fillStyle = '#ffffff';
  ctx3.fillText('Create Free Account', 1010, 172);

  return [
    {
      id: `sample_1_${timestamp}`,
      order: 0,
      dataUrl: c1.toDataURL('image/png'),
      width: c1.width,
      height: c1.height,
      dpr: 1,
      pageTitle: 'Acme Cloud – Developer Platform Hero',
      pageUrl: 'https://acme.example.com/',
      timestamp: timestamp - 3000,
    },
    {
      id: `sample_2_${timestamp}`,
      order: 1,
      dataUrl: c2.toDataURL('image/png'),
      width: c2.width,
      height: c2.height,
      dpr: 1,
      pageTitle: 'Acme Cloud – Infrastructure Analytics',
      pageUrl: 'https://acme.example.com/analytics',
      timestamp: timestamp - 2000,
    },
    {
      id: `sample_3_${timestamp}`,
      order: 2,
      dataUrl: c3.toDataURL('image/png'),
      width: c3.width,
      height: c3.height,
      dpr: 1,
      pageTitle: 'Acme Cloud – Developer Pricing Banner',
      pageUrl: 'https://acme.example.com/pricing',
      timestamp: timestamp - 1000,
    },
  ];
}
