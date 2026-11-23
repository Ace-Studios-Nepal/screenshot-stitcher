// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest';
import { getInitialTheme, applyTheme } from '../src/utils/theme';

describe('Theme utility', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('applies dark theme correctly and saves to localStorage', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('stitchify-theme')).toBe('dark');
  });

  it('applies light theme correctly and removes dark class', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    applyTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('stitchify-theme')).toBe('light');
  });

  it('retrieves saved theme from localStorage', () => {
    localStorage.setItem('stitchify-theme', 'light');
    expect(getInitialTheme()).toBe('light');

    localStorage.setItem('stitchify-theme', 'dark');
    expect(getInitialTheme()).toBe('dark');
  });
});
