import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../common/handlers';

export const TitleStrategyKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/strategies/provide-title-strategy',
  [
    'provideTitleStrategy',
    'TitleStrategyConfig',
    'TitleStrategyHandler',
  ],
);
