import { NgDocGlobalKeyword } from '@ng-doc/core';

import { WithEnvironmentKeywords } from '../with-environment/_keywords';
import { WithInitializeHandlerKeywords } from '../with-initialize-handler/_keywords';
import { WithInitializeStateKeywords } from '../with-initialize-state/_keywords';

export const InitializerFeaturesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  WithInitializeStateKeywords,
  WithEnvironmentKeywords,
  WithInitializeHandlerKeywords,
);
