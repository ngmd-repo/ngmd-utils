import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const StateKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/state', [
  'State',
  'provideRootState',
  'useRootState',
  'provideState',
  'useApiHub',
  'StateManager',
  'StateConfig',
]);
