/* eslint-disable @typescript-eslint/naming-convention */
import { inject, InjectionToken } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { ROOT_RX_STORE } from '../public-api';
import { RxStore } from '../services';

/**
 *
 * @deprecated use useStore
 */
export function RxStoreToken<T extends object = any>(
  storeName: Uppercase<string>,
): InjectionToken<RxStore<InstanceType<TConstructor<T>>>> {
  return new InjectionToken(`RX-STORE:${storeName}`);
}

/**
 *
 * @deprecated use useRootStore
 */
export function useRxRootStore<T extends object>(): RxStore<T> {
  return inject(ROOT_RX_STORE) as RxStore<T>;
}

/**
 *
 * @deprecated use useStore
 */
export function useRxStore<T extends TConstructor>(Store: T): RxStore<InstanceType<T>> {
  return inject(Store);
}
