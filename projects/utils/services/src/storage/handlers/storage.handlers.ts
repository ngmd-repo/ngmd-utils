import { TWindowStorage } from '../types/storage.types';

export function isEnabledLocalStorage(storage: TWindowStorage): boolean {
  try {
    const isEnabled: boolean = Boolean(window[storage]);

    return isEnabled;
  } catch (e: unknown) {
    return false;
  }
}
