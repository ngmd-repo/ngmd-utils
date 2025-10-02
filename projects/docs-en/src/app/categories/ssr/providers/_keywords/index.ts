import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers/index';

export const SSRProvidersKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/ssr/providers',
  [
    'provideUtilsSsr',
  ],
);
