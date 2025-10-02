import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers';

export const InitializerIntroductionKeywords: Record<string, NgDocGlobalKeyword> =
  makeModuleKeywords('/initializer/introduction', [
    'provideUtilsInitializer',
    'InitializeMeta',
    'UtilsInitializerFeatures',
    'StrategyInitializerFeatures',
  ]);
