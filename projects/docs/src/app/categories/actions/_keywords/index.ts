import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const ActionsKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/db', [
  'provideRootActionsChannel',
  'useRootActionsChannel',
  'provideActionsChannel',
  'useActionsChannel',
  'ActionsChannelToken',
  'ChannelAction',
  'ActionsChannel',
  'ActionByType',
  'ActionPayload',
]);
