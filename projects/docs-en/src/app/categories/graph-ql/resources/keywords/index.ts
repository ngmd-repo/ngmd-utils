import { NgDocGlobalKeyword } from '@ng-doc/core';

import { GqlMutationRequestKeywords } from '../use-mutation/keywords';
import { GqlQueryRequestKeywords } from '../use-query/keywords';

export const GqlResourcesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  GqlQueryRequestKeywords,
  GqlMutationRequestKeywords,
);
