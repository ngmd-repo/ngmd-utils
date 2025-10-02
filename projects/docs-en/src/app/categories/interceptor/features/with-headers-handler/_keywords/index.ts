import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const InterceptorWithHeadersHandlerKeywords: Record<string, NgDocGlobalKeyword> =
  makeModuleKeywords('/interceptor/features/with-headers-handler', [
    'withHeadersHandler',
    'HeadersHandlerFeature',
  ]);
