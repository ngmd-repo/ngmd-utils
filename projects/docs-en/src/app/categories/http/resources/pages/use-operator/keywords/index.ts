import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpOperatorRequestKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/http/resources/use-operator',
  [
    'useOperator',
    'OperatorRequest',
    'OperatorRequestMeta',
    'OperatorSendOptions',
  ],
);
