import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpDeleteRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/resources/use-delete',
  [
    'useDelete',
    'DeleteRequest',
    'DeleteRequestOptions',
    'DeleteSendOptions',
  ],
);
