import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const InterceptorWithHeadersKeywords: Record<string, NgDocGlobalKeyword> =
  makeModuleKeywords('/interceptor/features/with-headers', [
    'withHeaders',
    'HeadersFeature',
    'InterceptorHeaders',
  ]);
