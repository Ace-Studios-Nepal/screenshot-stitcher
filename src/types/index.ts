export interface CaptureItem {
  id: string;
  order: number;
  dataUrl: string;
  width: number;
  height: number;
  dpr: number;
  pageTitle: string;
  pageUrl: string;
  timestamp: number;
}

export interface StitchConfig {
  spacing: number;            // Gap between images in px (0 - 100)
  padding: number;            // Outer padding in px (0 - 50)
  backgroundColor: string;    // Canvas background color (e.g., '#ffffff', 'transparent')
  alignment: 'center' | 'left' | 'fit-width'; // Alignment when widths differ
  enableShadow: boolean;      // Subtle shadow between segments
}

export type AnnotationTool = 'select' | 'rectangle' | 'arrow' | 'text' | 'highlight' | 'pen';

export interface BaseAnnotation {
  id: string;
  type: AnnotationTool;
  color: string;
  strokeWidth: number;
}

export interface RectAnnotation extends BaseAnnotation {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
}

export interface ArrowAnnotation extends BaseAnnotation {
  type: 'arrow';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface TextAnnotation extends BaseAnnotation {
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
  backgroundColor?: string;
}

export interface HighlightAnnotation extends BaseAnnotation {
  type: 'highlight';
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
}

export interface PenAnnotation extends BaseAnnotation {
  type: 'pen';
  points: { x: number; y: number }[];
}

export type AnnotationItem =
  | RectAnnotation
  | ArrowAnnotation
  | TextAnnotation
  | HighlightAnnotation
  | PenAnnotation;

export type ExtensionMessage =
  | { type: 'CAPTURE_CURRENT_TAB' }
  | { type: 'CAPTURE_SUCCESS'; payload: CaptureItem }
  | { type: 'CAPTURE_ERROR'; error: string }
  | { type: 'GET_SESSION_CAPTURES' }
  | { type: 'OPEN_EDITOR_TAB' }
  | { type: 'OPEN_SIDE_PANEL' }
  | { type: 'CAPTURES_UPDATED' };
