/* eslint-disable @typescript-eslint/naming-convention */
import { inject, InjectionToken } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { SignalStore } from '../services';
import { ROOT_SIGNAL_STORE } from '../tokens';

/**
 *
 * @deprecated use useStore
 */
export function SignalStoreToken<T extends object>(
  storeName: Uppercase<string>,
): InjectionToken<SignalStore<InstanceType<TConstructor<T>>>> {
  return new InjectionToken(`SIGNAL-STORE:${storeName}`);
}

/**
 *
 * @deprecated use useRootStore
 */
export function useSignalRootStore<T extends object>(): SignalStore<T> {
  return inject(ROOT_SIGNAL_STORE) as SignalStore<T>;
}

/**
 *
 * @deprecated use useStore
 */
export function useSignalStore<T extends TConstructor>(Store: T): SignalStore<InstanceType<T>> {
  return inject(Store);
}
