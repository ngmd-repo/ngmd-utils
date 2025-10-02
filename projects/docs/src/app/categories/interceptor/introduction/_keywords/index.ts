import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers';

export const InterceptorIntroductionKeywords: Record<string, NgDocGlobalKeyword> =
  makeModuleKeywords('/interceptor/introduction', [
    'provideUtilsInterceptor',
    'UtilsInterceptorFeatures',
  ]);
