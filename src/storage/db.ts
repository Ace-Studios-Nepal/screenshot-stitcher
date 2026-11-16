import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { CaptureItem, StitchConfig } from '../types';

interface StitcherDB extends DBSchema {
  captures: {
    key: string;
    value: CaptureItem;
    indexes: { 'by-order': number };
  };
  settings: {
    key: string;
    value: any;
  };
}

const DB_NAME = 'screenshot_stitcher_db';
const DB_VERSION = 1;

export const defaultStitchConfig: StitchConfig = {
  spacing: 24,
  padding: 0,
  backgroundColor: '#ffffff',
  alignment: 'fit-width',
  enableShadow: true,
};

let dbPromise: Promise<IDBPDatabase<StitcherDB>> | null = null;

function getDb(): Promise<IDBPDatabase<StitcherDB>> {
  if (!dbPromise) {
    dbPromise = openDB<StitcherDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('captures')) {
          const captureStore = db.createObjectStore('captures', { keyPath: 'id' });
          captureStore.createIndex('by-order', 'order');
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings');
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllCaptures(): Promise<CaptureItem[]> {
  const db = await getDb();
  const captures = await db.getAllFromIndex('captures', 'by-order');
  return captures.sort((a, b) => a.order - b.order);
}

export async function addCapture(capture: CaptureItem): Promise<void> {
  const db = await getDb();
  await db.put('captures', capture);
}

export async function deleteCapture(id: string): Promise<void> {
  const db = await getDb();
  await db.delete('captures', id);
  // Re-normalize order
  const remaining = await getAllCaptures();
  const tx = db.transaction('captures', 'readwrite');
  for (let i = 0; i < remaining.length; i++) {
    if (remaining[i].order !== i) {
      remaining[i].order = i;
      await tx.store.put(remaining[i]);
    }
  }
  await tx.done;
}

export async function reorderCaptures(orderedIds: string[]): Promise<void> {
  const db = await getDb();
  const tx = db.transaction('captures', 'readwrite');
  for (let i = 0; i < orderedIds.length; i++) {
    const item = await tx.store.get(orderedIds[i]);
    if (item) {
      item.order = i;
      await tx.store.put(item);
    }
  }
  await tx.done;
}

export async function clearAllCaptures(): Promise<void> {
  const db = await getDb();
  await db.clear('captures');
}

export async function getSavedStitchConfig(): Promise<StitchConfig> {
  const db = await getDb();
  const saved = await db.get('settings', 'stitchConfig');
  return saved ? { ...defaultStitchConfig, ...saved } : defaultStitchConfig;
}

export async function saveStitchConfig(config: StitchConfig): Promise<void> {
  const db = await getDb();
  await db.put('settings', config, 'stitchConfig');
}
