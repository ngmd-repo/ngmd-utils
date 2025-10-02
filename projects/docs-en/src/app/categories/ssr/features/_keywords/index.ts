import { NgDocGlobalKeyword } from '@ng-doc/core';

import { WithSsrCookiesKeywords } from '../with-ssr-cookies/_keywords';

export const SsrFeaturesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  WithSsrCookiesKeywords,
);
