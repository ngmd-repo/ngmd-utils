import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers/index';

export const WithSsrCookiesKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/ssr/features/with-ssr-cookies',
  [
    'withSsrCookies',
    'CookiesSsrManagerFeature',
  ],
);
