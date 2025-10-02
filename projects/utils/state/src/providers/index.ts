/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Provider } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { makeStateProviderFactory } from '../handlers';
import { ROOT_STATE } from '../tokens';
import { State, StateConfig } from '../types';

export function provideRootState<T extends object>(StateClass: TConstructor<T>): Provider {
  return {
    provide: ROOT_STATE,
    useFactory: makeStateProviderFactory(StateClass),
  };
}

export function provideState<T extends object>(StateClass: TConstructor<T>): Provider {
  return {
    provide: StateClass,
    useFactory: makeStateProviderFactory(StateClass),
  };
}

export function useRootState<T extends object>(cfg?: StateConfig<T>): State<T> {
  const state: State<T> = inject(ROOT_STATE);

  if (cfg) state.state['initConfigInUseContext'](cfg);

  return state;
}

export function useState<T extends object>(
  StateClass: TConstructor<T>,
  cfg?: StateConfig<T>,
): State<T> {
  const state: State<T> = inject(StateClass);

  if (cfg) state.state['initConfigInUseContext'](cfg);

  return state;
}
