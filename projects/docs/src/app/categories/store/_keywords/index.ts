import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const StoreKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/db', [
  'Store',
  'provideRootStore',
  'useRootStore',
  'provideStore',
  'useStore',
  'StoreManager',
  'selectFirstDefinedValue',
  'StateConfig',
]);
