import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers';

export const HttpHelpersKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/helpers',
  [
    'routeParams',
    'routeQuery',
    'routeQueryParams',
    'getFromRoute',
    'toHttpHeaders',
    'toHttpParams',
    'toHttpContext',
    'getQueryParam',
    'isExistQueryParams',
    'makeURL',
    'getHostTag',
  ],
);
