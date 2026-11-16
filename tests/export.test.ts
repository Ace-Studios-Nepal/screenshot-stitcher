import { describe, it, expect } from 'vitest';
import { getTimestampFilename } from '../src/utils/export';

describe('Export utilities', () => {
  it('generates a valid timestamped filename with custom prefix and extension', () => {
    const filename = getTimestampFilename('png', 'my-stitch');
    expect(filename).toMatch(/^my-stitch-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.png$/);
  });

  it('generates a pdf filename with default prefix', () => {
    const filename = getTimestampFilename('pdf');
    expect(filename).toMatch(/^stitched-screenshot-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.pdf$/);
  });
});
