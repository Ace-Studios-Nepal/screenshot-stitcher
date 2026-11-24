import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

describe('Chrome Web Store Package & Manifest Compliance', () => {
  const artifactsDir = path.resolve(__dirname, '../artifacts');
  const pkgJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
  const chromeZipPath = path.join(artifactsDir, `stitchify-chrome-v${pkgJson.version}.zip`);

  it('generates a clean Chrome-compliant Manifest V3 package', () => {
    // Run the chrome packaging script
    execSync('node scripts/package-chrome.js', { stdio: 'pipe' });
    expect(fs.existsSync(chromeZipPath)).toBe(true);

    // Unzip manifest.json to a temp inspection location
    const tempExtractDir = path.join(artifactsDir, 'temp-chrome-inspect');
    if (fs.existsSync(tempExtractDir)) {
      fs.rmSync(tempExtractDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempExtractDir, { recursive: true });

    try {
      execSync(`unzip -q "${chromeZipPath}" manifest.json -d "${tempExtractDir}"`);
      const extractedManifestPath = path.join(tempExtractDir, 'manifest.json');
      expect(fs.existsSync(extractedManifestPath)).toBe(true);

      const manifest = JSON.parse(fs.readFileSync(extractedManifestPath, 'utf-8'));

      // Validate strict Manifest V3 Chrome compliance
      expect(manifest.manifest_version).toBe(3);
      expect(manifest.name).toBe('Stitchify');
      expect(manifest.version).toBe(pkgJson.version);

      // Verify no Firefox-specific keys remain in Chrome package
      expect(manifest.browser_specific_settings).toBeUndefined();
      expect(manifest.background.scripts).toBeUndefined();

      // Verify valid Chrome service worker declaration
      expect(manifest.background.service_worker).toBe('background.js');
      expect(manifest.background.type).toBe('module');

      // Verify permissions and sidePanel
      expect(manifest.permissions).toContain('activeTab');
      expect(manifest.permissions).toContain('scripting');
      expect(manifest.permissions).toContain('sidePanel');
      expect(manifest.permissions).not.toContain('storage');
      expect(manifest.permissions).not.toContain('downloads');
      expect(manifest.host_permissions).toContain('<all_urls>');
      expect(manifest.side_panel?.default_path).toBe('sidepanel.html');

      // Verify icons
      expect(manifest.icons['128']).toBe('icons/icon128.png');
    } finally {
      fs.rmSync(tempExtractDir, { recursive: true, force: true });
    }
  });
});