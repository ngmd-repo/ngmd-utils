import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const GqlResponseInterfaceKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  makeModuleKeywords('/graph-ql/interfaces/igql-response', [
    'IGqlResponse',
  ]),
);
