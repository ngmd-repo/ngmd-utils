import { InjectionToken } from '@angular/core';

import { ChannelAction } from '../models/channel-action.model';

export const ROOT_ACTIONS_CHANNEL = new InjectionToken<ChannelAction<string, unknown>>(
  'ROOT_ACTIONS_CHANNEL',
);
