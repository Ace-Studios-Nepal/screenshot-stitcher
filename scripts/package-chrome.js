import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = path.resolve('.');
const distDir = path.join(rootDir, 'dist');
const artifactsDir = path.join(rootDir, 'artifacts');
const stagingDir = path.join(rootDir, 'dist-chrome');

function main() {
  console.log('📦 Starting Chrome Web Store packaging pipeline...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const pkgJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
  const version = pkgJson.version || '1.0.0';
  const zipFileName = `stitchify-chrome-v${version}.zip`;
  const zipFilePath = path.join(artifactsDir, zipFileName);

  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  // Clean staging directory
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
  fs.mkdirSync(stagingDir, { recursive: true });

  // Read base manifest from dist/manifest.json
  const originalManifest = JSON.parse(
    fs.readFileSync(path.join(distDir, 'manifest.json'), 'utf-8')
  );

  // Clean manifest strictly for Chrome Web Store compliance
  const chromeManifest = { ...originalManifest };

  // 1. Remove Firefox-specific gecko settings
  delete chromeManifest.browser_specific_settings;

  // 2. Ensure background is strict Chrome MV3 service worker
  if (chromeManifest.background) {
    chromeManifest.background = {
      service_worker: chromeManifest.background.service_worker || 'background.js',
      type: 'module',
    };
  }

  // Write cleaned manifest
  fs.writeFileSync(
    path.join(stagingDir, 'manifest.json'),
    JSON.stringify(chromeManifest, null, 2),
    'utf-8'
  );
  console.log('✓ Created clean Chrome Manifest V3 (stripped Firefox keys)');

  // Copy extension entry files
  const filesToCopy = [
    'background.js',
    'editor.html',
    'popup.html',
    'sidepanel.html',
    'favicon.svg',
  ];

  for (const file of filesToCopy) {
    const src = path.join(distDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(stagingDir, file));
    }
  }

  // Copy icons directory
  const iconsSrc = path.join(distDir, 'icons');
  const iconsDest = path.join(stagingDir, 'icons');
  if (fs.existsSync(iconsSrc)) {
    fs.cpSync(iconsSrc, iconsDest, { recursive: true });
    console.log('✓ Copied icons assets (16px, 32px, 48px, 128px, 512px)');
  }

  // Copy assets directory
  const assetsSrc = path.join(distDir, 'assets');
  const assetsDest = path.join(stagingDir, 'assets');
  if (fs.existsSync(assetsSrc)) {
    fs.cpSync(assetsSrc, assetsDest, { recursive: true });
    console.log('✓ Copied compiled UI assets');
  }

  // Remove existing chrome zip if present
  if (fs.existsSync(zipFilePath)) {
    fs.unlinkSync(zipFilePath);
  }

  // Create zip using system zip with -X to exclude Mac OS extended attributes (__MACOSX)
  try {
    execSync(
      `cd "${stagingDir}" && zip -r -X -q "${zipFilePath}" . -x "*.DS_Store*"`,
      { stdio: 'inherit' }
    );
    console.log(`✓ Packaged extension into: ${zipFilePath}`);
  } catch (err) {
    console.error('Failed to create zip package:', err);
    process.exit(1);
  } finally {
    // Cleanup staging folder
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }

  // Print summary verification
  const stat = fs.statSync(zipFilePath);
  const sizeKb = (stat.size / 1024).toFixed(1);
  console.log(`\n🎉 Success! Chrome Web Store bundle ready:`);
  console.log(`   File: ${zipFileName}`);
  console.log(`   Path: artifacts/${zipFileName}`);
  console.log(`   Size: ${sizeKb} KB`);
  console.log(`   Manifest: V3 (Chrome Service Worker compliant, no unrecognized keys)\n`);
}

main();