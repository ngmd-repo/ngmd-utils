import { BrowserStorageType } from '../types';

export function isEnabledBrowserStorage(storage: BrowserStorageType = 'localStorage'): boolean {
  try {
    const isEnabled: boolean = Boolean(window[storage]);

    return isEnabled;
  } catch (e: unknown) {
    return false;
  }
}
