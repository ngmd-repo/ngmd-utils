import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const SkipRequestModificationKeywords: Record<string, NgDocGlobalKeyword> =
  makeModuleKeywords('/interceptor/http-context-tokens/skip-request-modification', [
    'SKIP_REQUEST_MODIFICATION',
  ]);
