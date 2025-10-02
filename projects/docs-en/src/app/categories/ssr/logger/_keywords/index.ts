import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers/index';

export const SSRLoggerKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/ssr/logger',
  [
    'provideSsrLogger',
    'withSsrLoggerErrorHandler',
    'SsrLoggerFeatures',
    'SsrLoggerErrorHandler',
  ],
);
