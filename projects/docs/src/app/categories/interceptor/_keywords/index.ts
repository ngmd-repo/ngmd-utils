import { NgDocGlobalKeyword } from '@ng-doc/core';

import { InterceptorFeaturesKeywords } from '../features/_keywords';
import { HttpContextTokensKeywords } from '../http-context-tokens/_keywords';
import { InterceptorIntroductionKeywords } from '../introduction/_keywords';

export const InterceptorKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  InterceptorIntroductionKeywords,
  InterceptorFeaturesKeywords,
  HttpContextTokensKeywords,
);
