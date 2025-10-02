import { NgDocGlobalKeyword } from '@ng-doc/core';

import { SsrFeaturesKeywords } from '../features/_keywords';
import { SSRLoggerKeywords } from '../logger/_keywords';
import { SSRProvidersKeywords } from '../providers/_keywords';

export const SsrKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  SSRProvidersKeywords,
  SSRLoggerKeywords,
  SsrFeaturesKeywords,
);
