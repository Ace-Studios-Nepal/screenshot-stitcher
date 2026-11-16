import { AnnotationItem } from '../types';

/**
 * Draws an arrow from (startX, startY) to (endX, endY) with a standard arrowhead
 */
function drawArrow(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string,
  width: number
) {
  const headLength = Math.max(12, width * 3.5);
  const angle = Math.atan2(endY - startY, endX - startX);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Draw main shaft
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Draw arrowhead
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    endX - headLength * Math.cos(angle + Math.PI / 6),
    endY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Draws a rounded rectangle outline or fill
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  const r = Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2);
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

/**
 * Render all annotations onto a target 2D context
 */
export function renderAnnotations(
  ctx: CanvasRenderingContext2D,
  annotations: AnnotationItem[]
) {
  for (const item of annotations) {
    ctx.save();

    switch (item.type) {
      case 'rectangle': {
        ctx.strokeStyle = item.color;
        ctx.lineWidth = item.strokeWidth;
        drawRoundedRect(ctx, item.x, item.y, item.width, item.height, 4);
        if (item.fill) {
          ctx.fillStyle = item.fill;
          ctx.fill();
        }
        ctx.stroke();
        break;
      }

      case 'arrow': {
        drawArrow(
          ctx,
          item.startX,
          item.startY,
          item.endX,
          item.endY,
          item.color,
          item.strokeWidth
        );
        break;
      }

      case 'highlight': {
        ctx.save();
        ctx.fillStyle = item.color;
        ctx.globalAlpha = item.opacity || 0.35;
        ctx.fillRect(item.x, item.y, item.width, item.height);
        ctx.restore();
        break;
      }

      case 'text': {
        ctx.font = `600 ${item.fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        const textMetrics = ctx.measureText(item.text);
        const textWidth = textMetrics.width;
        const textHeight = item.fontSize * 1.2;

        // Draw background badge for readability
        const padX = 8;
        const padY = 4;
        ctx.fillStyle = item.backgroundColor || 'rgba(15, 23, 42, 0.85)';
        drawRoundedRect(
          ctx,
          item.x - padX,
          item.y - item.fontSize - padY / 2,
          textWidth + padX * 2,
          textHeight + padY,
          6
        );
        ctx.fill();

        ctx.fillStyle = item.color;
        ctx.fillText(item.text, item.x, item.y);
        break;
      }

      case 'pen': {
        if (item.points.length < 2) break;
        ctx.strokeStyle = item.color;
        ctx.lineWidth = item.strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(item.points[0].x, item.points[0].y);
        for (let i = 1; i < item.points.length; i++) {
          ctx.lineTo(item.points[i].x, item.points[i].y);
        }
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  }
}

/**
 * Creates a composite clone of baseCanvas with all annotations flattened onto it
 */
export function getCompositedCanvas(
  baseCanvas: HTMLCanvasElement,
  annotations: AnnotationItem[]
): HTMLCanvasElement {
  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = baseCanvas.width;
  resultCanvas.height = baseCanvas.height;

  const ctx = resultCanvas.getContext('2d');
  if (!ctx) return baseCanvas;

  // Draw base stitched screenshot
  ctx.drawImage(baseCanvas, 0, 0);

  // Overlay annotations
  renderAnnotations(ctx, annotations);

  return resultCanvas;
}
