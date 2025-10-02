import { NgDocGlobalKeyword } from '@ng-doc/core';

import { InitializerFeaturesKeywords } from '../features/_keywords';
import { InitializerIntroductionKeywords } from '../introduction/_keywords';

export const InitializerKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  InitializerIntroductionKeywords,
  InitializerFeaturesKeywords,
);
