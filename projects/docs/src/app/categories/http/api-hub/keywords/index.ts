import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers';

export const HttpApiHubKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/api-hub',
  [
    'provideRootApiHub',
    'useRootApiHub',
    'provideApiHub',
    'useApiHub',
    'ApiHubManager',
    'TApiHub',
    'ApiHub',
    'ApiHubConfig',
  ],
);
