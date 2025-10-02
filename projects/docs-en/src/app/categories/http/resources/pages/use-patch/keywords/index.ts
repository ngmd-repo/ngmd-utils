import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpPatchRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/resources/use-patch',
  [
    'usePatch',
    'PatchRequest',
    'PatchRequestOptions',
    'PatchSendOptions',
  ],
);
