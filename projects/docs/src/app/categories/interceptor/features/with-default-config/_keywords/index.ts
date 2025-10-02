import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const InterceptorWithDefaultConfigKeywords: Record<string, NgDocGlobalKeyword> =
  makeModuleKeywords('/interceptor/features/with-default-config', [
    'withDefaultConfig',
    'DefaultConfigFeature',
    'InterceptorDefaultConfig',
  ]);
