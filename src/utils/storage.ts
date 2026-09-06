import { PortfolioData } from '../types';
import { DEFAULT_PORTFOLIO_DATA, STORAGE_KEY } from '../data/defaultData';

const DB_NAME = 'PhotoPortfolioStorageDB_v2';
const DB_VERSION = 1;
const STORE_NAME = 'portfolioStore';
const IDB_KEY = 'currentPortfolio';

/**
 * Open or initialize IndexedDB
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };
  });
}

/**
 * Save data to IndexedDB
 */
async function saveToIndexedDB(data: PortfolioData): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const putRequest = store.put(data, IDB_KEY);

      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, relying on localStorage:', err);
  }
}

/**
 * Load data from IndexedDB
 */
export async function loadFromIndexedDB(): Promise<PortfolioData | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(IDB_KEY);

      getRequest.onsuccess = () => {
        const result = getRequest.result;
        if (result?.banner && Array.isArray(result?.categories) && result.categories.length === 3) {
          resolve(result);
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = () => {
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}

/**
 * Get initial portfolio data synchronously for first render
 */
export function getInitialPortfolioData(): PortfolioData {
  if (typeof window === 'undefined') {
    return DEFAULT_PORTFOLIO_DATA;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.banner && Array.isArray(parsed?.categories) && parsed.categories.length === 3) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Unable to read initial data from localStorage:', e);
  }

  return DEFAULT_PORTFOLIO_DATA;
}

/**
 * Save data safely to both IndexedDB and localStorage (with quota exceeded safety)
 */
export async function savePortfolioData(newData: PortfolioData): Promise<void> {
  // 1. Always save to IndexedDB first (virtually unlimited quota for high-res photos)
  await saveToIndexedDB(newData);

  // 2. Try saving to localStorage as well for fast sync access
  try {
    const serialized = JSON.stringify(newData);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err: any) {
    // If quota is exceeded in localStorage, catch and handle safely
    if (
      err?.name === 'QuotaExceededError' ||
      err?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err?.code === 22 ||
      err?.code === 1014
    ) {
      console.warn('localStorage quota exceeded. Data safely stored in IndexedDB.');
      try {
        const lightweightData: PortfolioData = {
          banner: {
            ...newData.banner,
            imageUrl: newData.banner.imageUrl.startsWith('data:')
              ? DEFAULT_PORTFOLIO_DATA.banner.imageUrl
              : newData.banner.imageUrl
          },
          categories: newData.categories.map((cat, i) => ({
            ...cat,
            imageUrl: cat.imageUrl.startsWith('data:')
              ? DEFAULT_PORTFOLIO_DATA.categories[i].imageUrl
              : cat.imageUrl,
            sampleImages: cat.sampleImages.map((s, si) =>
              s.startsWith('data:') ? DEFAULT_PORTFOLIO_DATA.categories[i].sampleImages[si] || s : s
            )
          })) as [any, any, any]
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweightData));
      } catch {
        // Fallback suppressed since IndexedDB already persisted
      }
    } else {
      console.warn('localStorage save warning:', err);
    }
  }
}

/**
 * Clear data from both stores
 */
export async function clearPortfolioData(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear localStorage:', e);
  }

  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(IDB_KEY);
  } catch (e) {
    console.warn('Failed to clear IndexedDB:', e);
  }
}
