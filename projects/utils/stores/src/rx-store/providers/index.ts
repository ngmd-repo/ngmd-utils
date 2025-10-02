/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken, Provider } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { RxStore } from '../services';
import { ROOT_RX_STORE } from '../tokens';

/**
 * @deprecated use provideRootStore
 */
export function provideRxRootStore<T extends object>(Store: TConstructor<T>): Provider {
  return {
    provide: ROOT_RX_STORE,
    useValue: new RxStore(Store),
  };
}

/**
 *
 * @deprecated use provideStore
 */
export function provideRxChildStore<T extends object>(
  storeToken: InjectionToken<RxStore<T>>,
  Store: TConstructor<T>,
): Provider[] {
  return [
    {
      provide: storeToken,
      useValue: new RxStore(Store),
    },
  ];
}

/**
 *
 * @deprecated use provideStore
 */
export function provideRxStore<T extends TConstructor>(Store: T): Provider {
  return {
    provide: Store,
    useValue: new RxStore(Store),
  };
}
