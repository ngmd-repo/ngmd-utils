import { inject, Provider } from '@angular/core';
import { getProvideKey, TProvideKey } from '@ngmd/utils/src';

import { BrowserStorage } from '../services';
import { BROWSER_STORAGE_CONFIG } from '../tokens';
import { BrowserStorageConfig } from '../types';

function addBrowserStorageConfigProvider(
  config: BrowserStorageConfig | (() => BrowserStorageConfig),
  providers: Provider[],
): void {
  if (config) {
    const useKey: TProvideKey = getProvideKey(config);
    const configProvider: Provider = {
      provide: BROWSER_STORAGE_CONFIG,
      [useKey]: config,
    } as unknown as Provider;

    providers.push(configProvider);
  }
}

export function provideBrowserStorage(
  config?: BrowserStorageConfig | (() => BrowserStorageConfig),
): Provider[] {
  const providers: Provider[] = [BrowserStorage];

  addBrowserStorageConfigProvider(config, providers);

  return providers;
}

export function useBrowserStorage<T extends object>(): BrowserStorage<T> {
  return inject<BrowserStorage<T>>(BrowserStorage);
}
