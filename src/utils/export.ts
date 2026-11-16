import { jsPDF } from 'jspdf';

export function getTimestampFilename(ext: string, prefix = 'stitched-screenshot'): string {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return `${prefix}-${dateStr}.${ext}`;
}

/**
 * Downloads a canvas as PNG image
 */
export async function exportToPng(
  canvas: HTMLCanvasElement,
  customFilename?: string
): Promise<void> {
  const filename = customFilename || getTimestampFilename('png');

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        return reject(new Error('Failed to create PNG blob from canvas.'));
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up object URL after small delay
      setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve();
      }, 500);
    }, 'image/png');
  });
}

/**
 * Exports a canvas as PDF (continuous single page or auto-paged A4)
 */
export async function exportToPdf(
  canvas: HTMLCanvasElement,
  customFilename?: string,
  mode: 'single-page' | 'multi-page' = 'single-page'
): Promise<void> {
  const filename = customFilename || getTimestampFilename('pdf');
  const imgData = canvas.toDataURL('image/png');

  if (mode === 'single-page') {
    // 1 pt = 1/72 inch; scaling canvas pixels (96dpi) to 72dpi points
    const pxToPt = 0.75;
    const widthPt = canvas.width * pxToPt;
    const heightPt = canvas.height * pxToPt;

    const orientation = heightPt >= widthPt ? 'p' : 'l';

    const pdf = new jsPDF({
      orientation,
      unit: 'pt',
      format: [widthPt, heightPt],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, widthPt, heightPt, undefined, 'FAST');
    pdf.save(filename);
    return;
  }

  // Multi-page A4 mode
  const a4WidthPt = 595.28;
  const a4HeightPt = 841.89;
  const marginPt = 20;

  const printableWidthPt = a4WidthPt - marginPt * 2;
  const printableHeightPt = a4HeightPt - marginPt * 2;

  // Scale canvas to fit printable width
  const scaleRatio = printableWidthPt / canvas.width;
  const totalScaledHeightPt = canvas.height * scaleRatio;

  const pdf = new jsPDF('p', 'pt', 'a4');

  let heightLeftPt = totalScaledHeightPt;
  let currentSourceYPx = 0;

  const sliceCanvas = document.createElement('canvas');
  const sliceCtx = sliceCanvas.getContext('2d');
  if (!sliceCtx) {
    throw new Error('Could not create slice canvas context.');
  }

  const sliceHeightPx = Math.floor(printableHeightPt / scaleRatio);

  let pageIndex = 0;
  while (heightLeftPt > 0) {
    if (pageIndex > 0) {
      pdf.addPage('a4', 'p');
    }

    const currentChunkHeightPx = Math.min(sliceHeightPx, canvas.height - currentSourceYPx);
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = currentChunkHeightPx;

    sliceCtx.clearRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    sliceCtx.drawImage(
      canvas,
      0,
      currentSourceYPx,
      canvas.width,
      currentChunkHeightPx,
      0,
      0,
      canvas.width,
      currentChunkHeightPx
    );

    const chunkData = sliceCanvas.toDataURL('image/png');
    const chunkHeightPt = currentChunkHeightPx * scaleRatio;

    pdf.addImage(chunkData, 'PNG', marginPt, marginPt, printableWidthPt, chunkHeightPt, undefined, 'FAST');

    currentSourceYPx += currentChunkHeightPx;
    heightLeftPt -= chunkHeightPt;
    pageIndex++;
  }

  pdf.save(filename);
}
