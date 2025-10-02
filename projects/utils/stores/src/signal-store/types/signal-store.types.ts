import { Signal, WritableSignal } from '@angular/core';

export type TSignalsObject<T extends object, Type extends TSignalType> = {
  [K in keyof T]: Type extends 'readonly' ? Signal<T[K]> : WritableSignal<T[K]>;
};
export type TWritableSignalStore<T extends object> = Readonly<TSignalsObject<T, 'writable'>>;
export type TSignalStore<T extends object> = Readonly<TSignalsObject<T, 'readonly'>>;
export type TSignalType = 'readonly' | 'writable';
export type TSignalStoreSelectOptions<StoreValue, TransformValue> = {
  transform(param: StoreValue): TransformValue;
};
export type TStoreResetOptions = { nonNullable: boolean };
