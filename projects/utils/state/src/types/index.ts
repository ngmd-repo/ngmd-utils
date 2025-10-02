/* eslint-disable @typescript-eslint/naming-convention */
import { WritableSignal } from '@angular/core';
import { TConstructor, TRequiredArray } from '@ngmd/utils/types';

import { StateManager } from '../services';

export type StateDestroyConfig<T extends object> = {
  reset: TRequiredArray<keyof T> | true;
};
export type StateConfig<T extends object> = {
  onDestroy: StateDestroyConfig<T>;
};

export type TStateSelectOptions<StateValue, TransformValue> = {
  transform(param: StateValue): TransformValue;
};

export type TState<T extends object> = {
  [K in keyof T]: WritableSignal<T[K]>;
};

export type TStateResetOptions = {
  nonNullable: boolean;
};

export type TStateItem<T extends object> = {
  class: TConstructor<T>;
  instance: TState<T>;
};

export type State<T extends object> = TState<T> & {
  state: StateManager<T>;
};
