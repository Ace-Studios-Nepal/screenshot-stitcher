import { useState, useEffect, useCallback } from 'react';
import { Theme, getInitialTheme, applyTheme } from './theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('stitchify-theme');
      if (!saved) {
        const next = e.matches ? 'dark' : 'light';
        setThemeState(next);
        applyTheme(next);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail?.theme && customEvent.detail.theme !== theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    window.addEventListener('stitchify-theme-change', handleCustomChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('stitchify-theme-change', handleCustomChange);
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme, setTheme: setThemeState };
}
