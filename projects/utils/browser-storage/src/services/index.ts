/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { inject, Injectable } from '@angular/core';
import { assign, isInstance, wrapToArray } from '@ngmd/utils/handlers';
import { WINDOW } from '@ngmd/utils/injection';
import { TRequiredArray } from '@ngmd/utils/types';

import { BrowserStorageStub } from '../classes/browser-storage-stub.class';
import { DEFAULT_BROWSER_STORAGE_CONFIG } from '../constants';
import { isEnabledBrowserStorage } from '../handlers';
import { BROWSER_STORAGE_CONFIG } from '../tokens';
import { BrowserStorageConfig, BrowserStorageType } from '../types';

@Injectable()
export class BrowserStorage<T extends object> {
  private config: BrowserStorageConfig = assign(
    DEFAULT_BROWSER_STORAGE_CONFIG,
    inject(BROWSER_STORAGE_CONFIG, { optional: true }),
  );
  private stub: BrowserStorageStub<T> = new BrowserStorageStub();
  private window: Document['defaultView'] = inject(WINDOW);

  private getStorage(storage: BrowserStorageType = this.config.storage): Storage {
    return isEnabledBrowserStorage(storage)
      ? (this.window[storage] as unknown as Storage)
      : (this.stub as unknown as Storage);
  }

  public get<K extends keyof T>(keys: K, options?: BrowserStorageConfig): T[K];
  public get<K extends TRequiredArray<keyof T>>(
    keys: K,
    options?: BrowserStorageConfig,
  ): { [Key in K[number]]: T[Key] };
  public get(keys: TRequiredArray<keyof T> | keyof T, options?: BrowserStorageConfig): unknown {
    const opts: BrowserStorageConfig = assign(this.config, options);
    const storage: Storage = this.getStorage(opts.storage);
    const isJsonStrategy: boolean = opts.strategy === 'json';

    if (Array.isArray(keys)) {
      return keys.reduce(
        (accum, key) => {
          const result = storage.getItem(key as string);
          const value = isJsonStrategy ? JSON.parse(result) : result;

          accum[key] = value;

          return accum;
        },
        {} as { [Key in Array<keyof T>[number]]: T[Key] },
      );
    } else {
      const result: string = storage.getItem(keys as string) as string;

      return isJsonStrategy ? JSON.parse(result) : result;
    }
  }

  public set<K extends keyof T>(key: K, value: T[K], options?: BrowserStorageConfig): void {
    const opts: BrowserStorageConfig = assign(this.config, options);
    const storageValue: T[K] | string = opts.strategy === 'json' ? JSON.stringify(value) : value;

    this.getStorage(opts.storage).setItem(key as string, storageValue as string);
  }

  public patch(obj: Partial<T>, options?: BrowserStorageConfig): void {
    Object.entries(obj).forEach(([key, value]) =>
      this.set(key as keyof T, value as T[keyof T], options),
    );
  }

  public remove<K extends keyof T>(
    key: K | TRequiredArray<keyof T>,
    storage: BrowserStorageType = this.config.storage,
  ): void {
    const keys: (keyof T)[] = wrapToArray(key);

    keys.forEach(k => this.getStorage(storage).removeItem(k as string));
  }

  public clear(storage: BrowserStorageType = this.config.storage): void {
    this.getStorage(storage).clear();
  }

  public keys(storageType: BrowserStorageType = this.config.storage): keyof T[] {
    const storage: Storage = this.getStorage(storageType);

    if (isInstance(storage, BrowserStorageStub)) {
      return (storage as unknown as BrowserStorageStub<T>).keys() as unknown as keyof T[];
    }

    return Object.keys(storage) as unknown as keyof T[];
  }

  public isEnabledBrowserStorage(storage: BrowserStorageType = this.config.storage): boolean {
    return isEnabledBrowserStorage(storage);
  }
}
