import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const GqlQueryRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/graph-ql/resources/use-query',
  [
    'useQuery',
    'QueryRequest',
    'QueryRequestMeta',
  ],
);
