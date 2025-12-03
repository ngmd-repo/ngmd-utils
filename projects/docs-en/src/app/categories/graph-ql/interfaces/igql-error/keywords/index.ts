import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const GqlErrorInterfaceKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  makeModuleKeywords('/graph-ql/interfaces/igql-error', [
    'IGqlError',
    'GqlExtension',
    'GqlLocation',
  ]),
);
