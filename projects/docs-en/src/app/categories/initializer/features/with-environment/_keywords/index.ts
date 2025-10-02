import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const WithEnvironmentKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {
    InitializeEnvironmentFeature: {
      url: '/initializer/features/with-environment',
    },
  },
  makeModuleKeywords('/initializer/features/with-environment', [
    'withEnvironment',
  ]),
);
