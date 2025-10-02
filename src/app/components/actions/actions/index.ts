import { ActionPayload, ActionsChannelToken, ChannelAction } from '@ngmd/utils/actions';
import { TEnvironmentMode, TShowState, TSortDirection } from '@ngmd/utils/types';

export type TModalActions =
  | ChannelAction<'hide-modal'>
  | ChannelAction<'show-modal', boolean>
  | ChannelAction<'toggle-modal', TShowState>;
export const MODAL_ACTIONS = ActionsChannelToken<TModalActions>('MODAL');

export type TRootActions =
  | ChannelAction<'env', TEnvironmentMode>
  | ChannelAction<'sort', TSortDirection>;

export type TogglePayload = ActionPayload<TModalActions, 'toggle-modal'>;
