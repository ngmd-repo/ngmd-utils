/* eslint-disable @typescript-eslint/naming-convention */
import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const WithInitializeStateKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {
    InitializeStateFeature: {
      url: '/initializer/features/with-initialize-state',
    },
  },
  makeModuleKeywords('/initializer/features/with-initialize-state', [
    'withInitializeState',
    'InitializeState',
    'InitializeStateOptions',
  ]),
);
