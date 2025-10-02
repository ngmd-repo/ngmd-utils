import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpFetchRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/classes/fetch-request',
  [
    'FetchRequest',
    'FetchRequestMeta',
    'FetchRequestOptions',
    'FetchSendOptions',
  ],
);
