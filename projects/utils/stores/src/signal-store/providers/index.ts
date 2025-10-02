/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken, Provider } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { SignalStore } from '../services';
import { ROOT_SIGNAL_STORE } from '../tokens';

/**
 * @deprecated use provideRootStore
 */
export function provideSignalRootStore<T extends TConstructor>(store: T): Provider {
  return {
    provide: ROOT_SIGNAL_STORE,
    useValue: new SignalStore(store),
  };
}

/**
 *
 * @deprecated use provideStore
 */
export function provideChildSignalStore<T extends object>(
  storeToken: InjectionToken<SignalStore<T>>,
  store: TConstructor<T>,
): Provider {
  return {
    provide: storeToken,
    useValue: new SignalStore(store),
  };
}

/**
 *
 * @deprecated use provideStore
 */
export function provideSignalStore<T extends TConstructor>(Store: T): Provider {
  return {
    provide: Store,
    useValue: new SignalStore(Store),
  };
}
