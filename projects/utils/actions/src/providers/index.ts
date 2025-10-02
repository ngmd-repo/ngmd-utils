/* eslint-disable @typescript-eslint/naming-convention */
import { inject, InjectionToken, Provider } from '@angular/core';

import { ChannelAction } from '../models/channel-action.model';
import { ActionsChannel } from '../services';
import { ROOT_ACTIONS_CHANNEL } from '../tokens';

export function provideRootActionsChannel<T extends ChannelAction<string, unknown>>(): Provider {
  return {
    provide: ROOT_ACTIONS_CHANNEL,
    useFactory(): ActionsChannel<T> {
      return new ActionsChannel();
    },
  };
}

export function provideActionsChannel<T extends ChannelAction<string, unknown>>(
  CHANNEL_TOKEN: InjectionToken<T>,
): Provider {
  return {
    provide: CHANNEL_TOKEN,
    useFactory(): ActionsChannel<T> {
      return new ActionsChannel();
    },
  };
}

export function useRootActionsChannel<
  T extends ChannelAction<string, unknown>,
>(): ActionsChannel<T> {
  return inject(ROOT_ACTIONS_CHANNEL) as unknown as ActionsChannel<T>;
}

export function useActionsChannel<T extends ChannelAction<string, unknown>>(
  CHANNEL_TOKEN: InjectionToken<T>,
): ActionsChannel<T> {
  return inject(CHANNEL_TOKEN) as unknown as ActionsChannel<T>;
}
