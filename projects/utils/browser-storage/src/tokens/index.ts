import { InjectionToken } from '@angular/core';

import { BrowserStorageConfig } from '../types';

export const BROWSER_STORAGE_CONFIG: InjectionToken<BrowserStorageConfig> =
  new InjectionToken<BrowserStorageConfig>('BROWSER_STORAGE_CONFIG');
