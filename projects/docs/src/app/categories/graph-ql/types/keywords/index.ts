import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers';

export const GqlTypesKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/graph-ql/types',
  [
    'ID',
  ],
);
