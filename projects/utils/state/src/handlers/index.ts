/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { inject, Injector, signal } from '@angular/core';
import { assign } from '@ngmd/utils/handlers';
import { TConstructor } from '@ngmd/utils/types';

import { StateManager } from '../services';
import { State, TState, TStateItem } from '../types';

export function checkForReservedStateKeys<T extends object>(state: T): never | void {
  const isExistReservedKeys: boolean = new Set(Object.keys(state)).has('state');

  if (isExistReservedKeys)
    throw new Error('State cannot contain the following reserved keys for fields: "state"');
}

export function makeStateFromClass<T extends object>(StateClass: TConstructor<T>): TState<T> {
  const candidate: T = new StateClass();

  checkForReservedStateKeys(candidate);

  const instance: TState<T> = Object.entries(candidate).reduce((accum, [key, value]) => {
    accum[key as keyof T] = signal(value);

    return accum;
  }, {} as TState<T>);

  return instance;
}

export function makeStateProviderFactory<T extends object>(
  StateClass: TConstructor<T>,
): () => State<T> {
  return () => {
    const instance: TState<T> = makeStateFromClass(StateClass);
    const injector: Injector = inject(Injector);
    const stateItem: TStateItem<T> = {
      class: StateClass,
      instance,
    };

    return assign(instance, {
      state: new StateManager(stateItem, injector),
    });
  };
}
