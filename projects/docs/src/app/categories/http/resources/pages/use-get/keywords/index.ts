import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpGetRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/resources/use-get',
  [
    'useGet',
    'GetRequest',
    'GetRequestMeta',
    'ForceMetaOptions',
    'GetLoadOptions',
    'LoadResult',
    'load',
    'force',
  ],
);
