import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Manifest V3 Chromium & Cross-Browser Compatibility', () => {
  const manifestPath = path.resolve(__dirname, '../public/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  it('uses Manifest V3 specification', () => {
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.name).toBe('Stitchify');
    expect(manifest.version).toBeDefined();
  });

  it('declares Chromium Manifest V3 background service worker', () => {
    expect(manifest.background).toBeDefined();
    expect(manifest.background.service_worker).toBe('background.js');
    expect(manifest.background.type).toBe('module');
  });

  it('includes host_permissions for unrestricted cross-origin tab capture', () => {
    // In Chromium, activeTab alone is not sufficient when capturing from the side panel
    // because user interactions in the side panel frame do not grant activeTab to the web page.
    expect(manifest.host_permissions).toBeDefined();
    expect(manifest.host_permissions).toContain('<all_urls>');
  });

  it('declares the required Chromium extension permissions', () => {
    const requiredPermissions = [
      'activeTab',
      'scripting',
      'storage',
      'sidePanel',
      'downloads',
    ];
    for (const perm of requiredPermissions) {
      expect(manifest.permissions).toContain(perm);
    }
  });

  it('declares side_panel and action popup entry points', () => {
    expect(manifest.side_panel?.default_path).toBe('sidepanel.html');
    expect(manifest.action?.default_popup).toBe('popup.html');
    expect(manifest.action?.default_icon).toBeDefined();
  });

  it('has all declared icon assets existing on disk', () => {
    const iconSizes = ['16', '48', '128'];
    for (const size of iconSizes) {
      const iconRelPath = manifest.icons[size];
      expect(iconRelPath).toBeDefined();
      const iconFullPath = path.resolve(__dirname, '../public', iconRelPath);
      expect(fs.existsSync(iconFullPath)).toBe(true);
    }
  });

  it('maintains Firefox compatibility keys alongside Chromium keys', () => {
    // Dual compatibility: gecko settings and background scripts for Firefox
    expect(manifest.browser_specific_settings?.gecko?.id).toBeDefined();
    expect(manifest.background.scripts).toContain('background.js');
  });
});
