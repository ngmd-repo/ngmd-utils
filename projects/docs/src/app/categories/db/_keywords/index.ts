import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const DBKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/db', [
  'StaticDB',
  'provideRootDB',
  'getDataFromDB',
]);
