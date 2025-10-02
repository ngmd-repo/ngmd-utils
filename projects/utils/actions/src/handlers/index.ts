/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';

import { ChannelAction } from '../models/channel-action.model';

export function ActionsChannelToken<
  Actions extends ChannelAction<string, unknown>,
  TokenName extends Uppercase<string> = Uppercase<string>,
>(NAME: TokenName): InjectionToken<Actions> {
  return new InjectionToken(`ACTIONS_CHANNEL:${NAME}`);
}
