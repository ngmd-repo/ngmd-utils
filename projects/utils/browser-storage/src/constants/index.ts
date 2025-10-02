import { BrowserStorageConfig } from '../types';

export const DEFAULT_BROWSER_STORAGE_CONFIG: Required<Readonly<BrowserStorageConfig>> = {
  storage: 'localStorage',
  strategy: 'json',
} as const;
