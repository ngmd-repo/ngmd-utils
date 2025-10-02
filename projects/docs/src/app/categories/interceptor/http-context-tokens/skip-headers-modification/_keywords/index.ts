import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const SkipHeadersModificationKeywords: Record<string, NgDocGlobalKeyword> =
  makeModuleKeywords('/interceptor/http-context-tokens/skip-headers-modification', [
    'SKIP_HEADERS_MODIFICATION',
  ]);
