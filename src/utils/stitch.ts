import { CaptureItem, StitchConfig } from '../types';

export interface StitchResult {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  segmentBounds: {
    id: string;
    y: number;
    height: number;
    width: number;
  }[];
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
    img.src = src;
  });
}

export async function stitchScreenshots(
  captures: CaptureItem[],
  config: StitchConfig
): Promise<StitchResult> {
  if (captures.length === 0) {
    const emptyCanvas = document.createElement('canvas');
    emptyCanvas.width = 1;
    emptyCanvas.height = 1;
    return { canvas: emptyCanvas, width: 1, height: 1, segmentBounds: [] };
  }

  // Pre-load all captured images
  const images = await Promise.all(captures.map((c) => loadImage(c.dataUrl)));

  // Determine base target width
  const maxNaturalWidth = Math.max(...images.map((img) => img.naturalWidth || img.width));

  // Compute rendered dimensions for each segment
  const segments = images.map((img, idx) => {
    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;

    let targetW = naturalW;
    let targetH = naturalH;

    if (config.alignment === 'fit-width' && naturalW > 0) {
      targetW = maxNaturalWidth;
      targetH = Math.round((naturalH * maxNaturalWidth) / naturalW);
    }

    return {
      id: captures[idx].id,
      img,
      width: targetW,
      height: targetH,
    };
  });

  const spacing = Math.max(0, config.spacing);
  const padding = Math.max(0, config.padding);

  const canvasWidth = maxNaturalWidth + padding * 2;
  const contentHeight = segments.reduce((sum, seg) => sum + seg.height, 0);
  const gapsHeight = (segments.length - 1) * spacing;
  const canvasHeight = contentHeight + gapsHeight + padding * 2;

  // Enforce browser canvas safety limits
  const MAX_DIMENSION = 32767;
  let finalWidth = canvasWidth;
  let finalHeight = canvasHeight;
  let scale = 1;

  if (finalHeight > MAX_DIMENSION) {
    scale = MAX_DIMENSION / finalHeight;
    finalWidth = Math.floor(finalWidth * scale);
    finalHeight = MAX_DIMENSION;
  }

  const canvas = document.createElement('canvas');
  canvas.width = finalWidth;
  canvas.height = finalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('Failed to create canvas 2D rendering context.');
  }

  if (scale !== 1) {
    ctx.scale(scale, scale);
  }

  // Draw background fill
  if (config.backgroundColor && config.backgroundColor !== 'transparent') {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  } else {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  let currentY = padding;
  const segmentBounds: StitchResult['segmentBounds'] = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];

    let x = padding;
    if (config.alignment === 'center') {
      x = padding + Math.round((maxNaturalWidth - seg.width) / 2);
    }

    // Optional segment drop shadow
    if (config.enableShadow && spacing > 0) {
      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.12)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 4;
      ctx.fillRect(x, currentY, seg.width, seg.height);
      ctx.restore();
    }

    ctx.drawImage(seg.img, x, currentY, seg.width, seg.height);

    segmentBounds.push({
      id: seg.id,
      y: currentY,
      height: seg.height,
      width: seg.width,
    });

    currentY += seg.height + spacing;
  }

  return {
    canvas,
    width: finalWidth,
    height: finalHeight,
    segmentBounds,
  };
}
