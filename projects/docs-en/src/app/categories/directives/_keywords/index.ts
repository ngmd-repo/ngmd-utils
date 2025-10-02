import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const DirectivesKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords(
  '/decorators',
  [
    'AfkDirective',
    'BackgroundImageDirective',
    'ClosestDirective',
    'CopyDirective',
    'FocusDirective',
    'InsertDirective',
    'IntersectionDirective',
    'LinkDirective',
    'PageEndpointDirective',
    'SelectorStylesDirective',
    'SwitchContainDirective',
    'DownloadDirective',
  ],
);
