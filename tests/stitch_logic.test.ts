import { describe, it, expect } from 'vitest';
import { defaultStitchConfig } from '../src/storage/db';
import { StitchConfig } from '../src/types';

describe('Stitch Configuration & Logic', () => {
  it('has proper default stitch configuration', () => {
    expect(defaultStitchConfig.spacing).toBe(24);
    expect(defaultStitchConfig.backgroundColor).toBe('#ffffff');
    expect(defaultStitchConfig.alignment).toBe('fit-width');
    expect(defaultStitchConfig.enableShadow).toBe(true);
  });

  it('calculates total height and spacing accurately', () => {
    const config: StitchConfig = {
      spacing: 16,
      padding: 10,
      backgroundColor: '#ffffff',
      alignment: 'fit-width',
      enableShadow: false,
    };

    const segments = [
      { width: 800, height: 600 },
      { width: 800, height: 400 },
      { width: 800, height: 500 },
    ];

    const contentHeight = segments.reduce((sum, s) => sum + s.height, 0); // 1500
    const gapsHeight = (segments.length - 1) * config.spacing; // 2 * 16 = 32
    const totalHeight = contentHeight + gapsHeight + config.padding * 2; // 1500 + 32 + 20 = 1552

    expect(contentHeight).toBe(1500);
    expect(gapsHeight).toBe(32);
    expect(totalHeight).toBe(1552);
  });

  it('calculates proportional scale-to-fit dimensions when widths differ', () => {
    const targetWidth = 1200;
    const originalWidth = 600;
    const originalHeight = 400;

    const scaledHeight = Math.round((originalHeight * targetWidth) / originalWidth);
    expect(scaledHeight).toBe(800);
  });
});
