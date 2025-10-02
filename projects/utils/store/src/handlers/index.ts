/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Injector, signal } from '@angular/core';
import { assign } from '@ngmd/utils/handlers';
import { TConstructor } from '@ngmd/utils/types';

import { StoreManager } from '../services';
import { Store, TStore, TStoreItem } from '../types';

export function checkForReservedStoreKeys<T extends object>(state: T): never | void {
  const isExistReservedKeys: boolean = new Set(Object.keys(state)).has('state');

  if (isExistReservedKeys)
    throw new Error('Store cannot contain the following reserved keys for fields: "store"');
}

export function makeSignalStore<T extends object>(instance: T): TStore<T> {
  return Object.entries(instance).reduce<TStore<T>>((accum, [key, value]) => {
    (accum as any)[key as keyof T] = signal(value);

    return accum;
  }, {} as TStore<T>);
}

export function createStoreFactory<T extends object>(StoreClass: TConstructor<T>): () => Store<T> {
  return () => {
    const storeInstance: T = new StoreClass();
    checkForReservedStoreKeys(storeInstance);
    const injector: Injector = inject(Injector);
    const store: TStore<T> = makeSignalStore(storeInstance);
    const storeItem: TStoreItem<T> = { class: StoreClass, instance: store };

    return assign(store, {
      store: new StoreManager(storeItem, injector),
    });
  };
}
