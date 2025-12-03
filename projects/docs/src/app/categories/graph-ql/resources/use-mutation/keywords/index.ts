import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const GqlMutationRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/graph-ql/resources/use-mutation',
  [
    'useMutation',
    'MutationRequest',
    'MutationRequestMeta',
  ],
);
