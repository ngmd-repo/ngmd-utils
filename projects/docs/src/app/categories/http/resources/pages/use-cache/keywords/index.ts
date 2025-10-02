import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpCacheRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/resources/use-cache',
  [
    'useCache',
    'CacheRequest',
    'CacheRequestMeta',
    'CacheMetaOptions',
    'SetWithRequest',
    'SetUrlOptions',
    'cache',
  ],
);
