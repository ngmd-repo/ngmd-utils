/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Provider } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { createStoreFactory } from '../handlers';
import { ROOT_STORE } from '../tokens';
import { Store, StoreConfig } from '../types';

export function provideRootStore<T extends TConstructor>(StoreClass: T): Provider {
  return {
    provide: ROOT_STORE,
    useFactory: createStoreFactory(StoreClass),
  };
}

export function provideStore<T extends TConstructor>(StoreClass: T): Provider {
  return {
    provide: StoreClass,
    useFactory: createStoreFactory(StoreClass),
  };
}

export function useRootStore<T extends object>(cfg?: StoreConfig<T>): Store<T> {
  const store: Store<T> = inject(ROOT_STORE);

  if (cfg) store.store['initConfigInUseContext'](cfg);

  return store;
}

export function useStore<T extends object>(
  StoreClass: TConstructor<T>,
  cfg?: StoreConfig<T>,
): Store<T> {
  const store: Store<T> = inject(StoreClass);

  if (cfg) store.store['initConfigInUseContext'](cfg);

  return store;
}
