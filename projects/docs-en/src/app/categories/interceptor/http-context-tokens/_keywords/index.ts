import { NgDocGlobalKeyword } from '@ng-doc/core';

import { SkipHeadersModificationKeywords } from '../skip-headers-modification/_keywords';
import { SkipRequestModificationKeywords } from '../skip-request-modification/_keywords';

export const HttpContextTokensKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  SkipHeadersModificationKeywords,
  SkipRequestModificationKeywords,
);
