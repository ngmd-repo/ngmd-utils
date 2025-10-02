import { inject, Injectable } from '@angular/core';
import { TWindowDocument, WINDOW } from '@ngmd/utils/injection';

import { Storage } from './classes/Storage';
import { isEnabledLocalStorage } from './handlers/storage.handlers';
import { TWindowStorage } from './types/storage.types';

/**
 * @deprecated use only BrowserStorage (https://md-utils.web.app/browser-storage#usebrowserstorage)
 */
@Injectable({
  providedIn: 'root',
})
export class UtilsStorageService {
  private storage: Storage = new Storage();
  private window: TWindowDocument = inject(WINDOW);

  private getStorage(storage: TWindowStorage = 'localStorage'): Storage {
    return isEnabledLocalStorage(storage)
      ? (this.window[storage] as unknown as Storage)
      : this.storage;
  }

  public setItem(key: string, value: unknown, storage?: TWindowStorage): void {
    this.getStorage(storage).setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string, storage?: TWindowStorage, isParse: boolean = true): T {
    const result: string = this.getStorage(storage).getItem(key);

    return isParse ? (JSON.parse(result) as T) : (result as T);
  }

  public removeItem(key: string, storage?: TWindowStorage): void {
    this.getStorage(storage).removeItem(key);
  }

  public clear(storage?: TWindowStorage): void {
    this.getStorage(storage).clear();
  }

  public getKeys(type?: TWindowStorage): string[] {
    const storage = this.getStorage(type);

    if ('getKeys' in storage) {
      return storage.getKeys();
    }

    return Object.keys(storage);
  }
}
