import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers';

export const HttpTypesKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/types',
  [
    'TApiRequest',
    'DestroyConfig',
    'OnDestroyOptions',
    'TObserver',
    'ReloadConnection',
    'ConnectWith',
    'WithConnection',
    'ConnectionOptions',
    'RequestConnection',
    'ConnectionRef',
  ],
);
