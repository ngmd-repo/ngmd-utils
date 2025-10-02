/* eslint-disable @typescript-eslint/naming-convention */
import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const WithInitializeHandlerKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {
    InitializeHandlerFeature: {
      url: '/initializer/features/with-initialize-handler',
    },
  },
  makeModuleKeywords('/initializer/features/with-initialize-handler', [
    'withInitializeHandler',
    'InitializeHandler',
  ]),
);
