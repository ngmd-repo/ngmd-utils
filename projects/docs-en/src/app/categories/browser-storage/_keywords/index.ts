import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const BrowserStorageKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/browser-storage',
  [
    'provideBrowserStorage',
    'useBrowserStorage',
    'BrowserStorage',
    'BrowserStorageType',
    'BrowserStorageStrategy',
    'BrowserStorageConfig',
    'isEnabledBrowserStorage',
  ],
);
