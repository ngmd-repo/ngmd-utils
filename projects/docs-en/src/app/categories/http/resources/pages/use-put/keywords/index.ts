import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpPutRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/resources/use-put',
  [
    'usePut',
    'PutRequest',
    'PutRequestOptions',
    'PutSendOptions',
  ],
);
