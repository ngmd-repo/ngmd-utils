/* eslint-disable @typescript-eslint/naming-convention */
import { ChannelAction } from '../models/channel-action.model';

export type ActionPayload<
  Actions extends ChannelAction<string, unknown>,
  T extends Actions['type'],
> = Extract<Actions, { type: T }>['payload'];

export type ActionByType<
  Actions extends ChannelAction<string, unknown>,
  T extends Actions['type'],
> = Extract<Actions, { type: T }>;
