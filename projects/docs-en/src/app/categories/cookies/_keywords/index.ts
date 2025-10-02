import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const CookiesKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/cookies', [
  'provideUtilsCookies',
  'CookiesService',
  'CookiesFeatures',
  'ICookieOptions',
  'TSameSite',
]);
