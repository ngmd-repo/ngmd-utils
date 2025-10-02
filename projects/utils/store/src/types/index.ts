/* eslint-disable @typescript-eslint/naming-convention */
import { Signal, WritableSignal } from '@angular/core';
import { TConstructor, TRequiredArray } from '@ngmd/utils/types';

import { StoreManager } from '../services';

export type TStoreObject<T extends object, Type extends TSelectType> = {
  [K in keyof T]: Type extends 'readonly' ? Signal<T[K]> : WritableSignal<T[K]>;
};
export type TStore<T extends object> = Readonly<TStoreObject<T, 'writable'>>;
export type TWritableStore<T extends object> = Readonly<TStoreObject<T, 'writable'>>;
export type TSelectType = 'readonly' | 'writable';
export type TStoreSelectOptions<StoreValue, TransformValue> = {
  transform(param: StoreValue): TransformValue;
};
export type TStoreItem<T extends object> = {
  class: TConstructor<T>;
  instance: Readonly<TStoreObject<T, 'writable'>>;
};
export type Store<T extends object> = TStore<T> & {
  store: StoreManager<T>;
};

export type StoreDestroyConfig<T extends object> = {
  reset: TRequiredArray<keyof T> | true;
};
export type StoreConfig<T extends object> = {
  onDestroy: StoreDestroyConfig<T>;
};
