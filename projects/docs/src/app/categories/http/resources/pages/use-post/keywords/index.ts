import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpPostRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/resources/use-post',
  [
    'usePost',
    'PostRequest',
    'PostRequestOptions',
    'PostSendOptions',
  ],
);
