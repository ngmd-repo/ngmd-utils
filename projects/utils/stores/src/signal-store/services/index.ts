/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { assign, fillObject, makeReadonlySignal } from '@ngmd/utils/handlers';
import { TConstructor, TIfElse } from '@ngmd/utils/types';

import { DEFAULT_RESET_SIGNAL_OPTIONS } from '../constants';
import { makeReadonlyStore } from '../handlers';
import {
  TSignalStore,
  TSignalStoreSelectOptions,
  TSignalType,
  TStoreResetOptions,
  TWritableSignalStore,
} from '../types/signal-store.types';

/**
 * @deprecated use Store
 */
export class SignalStore<T extends object> {
  private store: TWritableSignalStore<T> = null;

  constructor(private StoreConstructor: TConstructor<T>) {
    this.initStore();
  }

  private initStore(): void {
    const instance: T = new this.StoreConstructor();
    const store = Object.entries(instance).reduce(
      (accum, [key, value]) => {
        accum[key as keyof T] = signal(value);

        return accum;
      },
      {} as Record<keyof T, WritableSignal<T[keyof T]>>,
    );

    this.store = Object.freeze(store) as TWritableSignalStore<T>;
  }

  private getInstance(options?: TStoreResetOptions): T {
    const instance: T = options?.nonNullable
      ? new this.StoreConstructor()
      : fillObject(new this.StoreConstructor(), null);

    return instance;
  }

  public getStore<Type extends TSignalType = 'readonly'>(
    type: Type = 'readonly' as Type,
  ): TIfElse<Type, 'readonly', TSignalStore<T>, TWritableSignalStore<T>> {
    const store = type === 'writable' ? this.store : makeReadonlyStore(this.store);

    return store as TIfElse<Type, 'readonly', TSignalStore<T>, TWritableSignalStore<T>>;
  }

  public getValue<K extends keyof T>(key: K): T[K] {
    return this.store[key]();
  }

  public setValue<K extends keyof T, V extends T[K]>(key: K, value: V): void {
    this.store[key].set(value);
  }

  public patchStore(store: Partial<T>): void {
    Object.entries(store).forEach(([key, value]) =>
      this.setValue(key as keyof T, value as T[keyof T]),
    );
  }

  public select<K extends keyof T>(key: K): Signal<T[K]>;
  public select<
    K extends keyof T,
    TransformValue,
    const TransformOptions extends Pick<
      TSignalStoreSelectOptions<T[K], TransformValue>,
      'transform'
    >,
  >(key: K, options: TransformOptions): Signal<ReturnType<TransformOptions['transform']>>;
  public select<V>(key: keyof T, options?: TSignalStoreSelectOptions<T[keyof T], unknown>): V {
    const isExistTransform: boolean = Boolean(options?.transform);

    return isExistTransform
      ? (computed(() => options.transform(this.store[key]())) as Signal<
          ReturnType<TSignalStoreSelectOptions<T[keyof T], unknown>['transform']>
        > &
          any)
      : (makeReadonlySignal(this.store[key]) as Signal<T[keyof T]> & any);
  }

  public reset(options?: TStoreResetOptions): void {
    const resetOptions: TStoreResetOptions = assign(DEFAULT_RESET_SIGNAL_OPTIONS, options);
    const instance: T = this.getInstance(resetOptions);

    Object.entries(instance).forEach(([key, value]) => this.setValue(key as keyof T, value));
  }

  public resetFields(fields: Array<keyof T>, options?: TStoreResetOptions): void {
    const instance: T = this.getInstance(options);

    fields.forEach((field: keyof T) => this.setValue(field, instance[field]));
  }
}
