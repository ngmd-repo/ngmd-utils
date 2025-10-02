/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { HttpClient } from '@angular/common/http';
import { computed, Injector, Signal } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';
import { firstValueFrom, Observable } from 'rxjs';

import { HttpStateItem } from '../classes/http-state-item.class';
import { RequestMeta, TRequestOptions } from '../models/request-meta.model';
import {
  HttpField,
  HttpRxField,
  THttpLoadedValueType,
  THttpMetaStore,
  THttpSelectOptions,
  THttpSelectRxOptions,
  THttpSetSettings,
  THttpState,
  THttpValuesStore,
} from '../types';

/**
 * @deprecated use @ngmd/requests
 */
export class HttpStore<T extends THttpMetaStore<T>> {
  private storeState: THttpState<T> = null;
  private http: HttpClient = null;

  constructor(
    private storeConstructor: TConstructor<T>,
    private injector: Injector,
  ) {
    this.initStore();
  }

  private initStore(): void {
    this.http = this.injector.get(HttpClient);
    this.createStoreState(new this.storeConstructor());
  }

  private createStoreState(storeInstance: T): void {
    this.storeState = Object.entries(storeInstance).reduce((accum, [key, meta]) => {
      (accum as any)[key as keyof T] = new HttpStateItem(meta as RequestMeta, this.http);

      return accum;
    }, {} as THttpState<T>);
  }

  private getValues<
    K extends Array<keyof T>,
    Value = { [Key in K[number]]: T[Key]['settings']['initialValue'] },
  >(keys: K): Value {
    return keys.reduce((accum, key) => {
      (accum as any)[key] = this.getValue(key);

      return accum;
    }, {}) as Value;
  }

  public getValue<
    K extends [keyof T, ...Array<keyof T>],
    Value = K['length'] extends 1
      ? T[K[0]]['settings']['initialValue']
      : { [Key in K[number]]: T[Key]['settings']['initialValue'] },
  >(...keys: K): Value {
    return keys.length === 1 ? (this.storeState[keys[0]].value() as Value) : this.getValues(keys);
  }

  public setValue<K extends keyof T, V extends T[K]['settings']['initialValue']>(
    key: K,
    value: V,
  ): void {
    this.storeState[key].setValue(value);
  }

  public patchStore<PatchValue extends THttpValuesStore<T>>(patchValue: Partial<PatchValue>): void {
    Object.entries(patchValue).forEach(([key, value]) => {
      this.setValue(key as keyof T, value);
    });
  }

  public setOptions<K extends keyof T>(
    key: K,
    options: Required<T[K]['settings']['options']>,
    settings?: THttpSetSettings,
  ): void {
    this.storeState[key].setOptions(options as TRequestOptions, settings);
  }

  public getFirstLoadedValue<
    K extends keyof T,
    V = T[K]['settings']['initialValue'],
    const Mode extends THttpLoadedValueType = 'observer',
  >(key: K, mode: Mode = 'observer' as Mode): Mode extends 'promise' ? Promise<V> : Observable<V> {
    const firstValue$: Observable<T[K]['settings']['initialValue']> =
      this.storeState[key].selectFirstLoadedValue();

    return (
      mode === 'observer' ? firstValue$ : firstValueFrom(firstValue$)
    ) as Mode extends 'promise' ? Promise<V> : Observable<V>;
  }

  public selectRx<K extends keyof T, const Options extends THttpSelectRxOptions>(
    key: K,
    options?: Options,
  ): Options['onlyValue'] extends true
    ? Observable<T[K]['settings']['initialValue']>
    : HttpRxField<T[K]['settings']['initialValue'], T[K]['settings']['options']> {
    const field = this.storeState[key].getRxField() as HttpRxField<
      T[K]['settings']['initialValue'],
      T[K]['settings']['options']
    >;

    const result = options?.onlyValue ? field.value : field;

    return result as Options['onlyValue'] extends true
      ? Observable<T[K]['settings']['initialValue']>
      : HttpRxField<T[K]['settings']['initialValue'], T[K]['settings']['options']>;
  }

  public select<
    K extends keyof T,
    TransformValue,
    const Options extends Required<
      THttpSelectOptions<T[K]['settings']['initialValue'], TransformValue>
    >,
  >(
    key: K,
    options: Options,
  ): Options['onlyValue'] extends true
    ? Signal<ReturnType<Options['transform']>>
    : HttpField<ReturnType<Options['transform']>, T[K]['settings']['options']>;
  public select<K extends keyof T>(
    key: K,
  ): HttpField<T[K]['settings']['initialValue'], T[K]['settings']['options']>;
  public select<K extends keyof T, const Options extends { onlyValue: boolean }>(
    key: K,
    options: Options,
  ): Options['onlyValue'] extends true
    ? Signal<T[K]['settings']['initialValue']>
    : HttpField<T[K]['settings']['initialValue'], T[K]['settings']['options']>;
  public select<
    K extends keyof T,
    TransformValue,
    const Options extends {
      transform: (v: T[K]['settings']['initialValue']) => TransformValue;
    },
  >(
    key: K,
    options: Options,
  ): HttpField<ReturnType<Options['transform']>, T[K]['settings']['options']>;
  public select<
    K extends keyof T,
    TransformValue,
    const Options extends THttpSelectOptions<T[K]['settings']['initialValue'], TransformValue>,
  >(key: K, options?: Options) {
    const field = this.storeState[key].getSignalField() as HttpField<
      T[K]['settings']['initialValue'],
      T[K]['settings']['options']
    >;
    const isOnlyValue: boolean = Boolean(options?.onlyValue);
    const isExistTransform: boolean = Boolean(options?.transform);
    const isFullOptions: boolean = isOnlyValue && isExistTransform;

    switch (true) {
      case isFullOptions: {
        const { value } = field;

        return computed(() => options.transform(value()));
      }
      case isOnlyValue: {
        return field.value;
      }
      case isExistTransform: {
        const { value } = field;

        field.value = computed(() => options.transform(value()));

        return field;
      }
      default: {
        return field;
      }
    }
  }

  public reset(): void {
    Object.keys(this.storeState).forEach((key: string) => {
      this.storeState[key as keyof T].reset();
    });
  }

  public resetFields<K extends keyof T>(fields: K[]): void {
    fields.forEach((key: keyof T) => this.storeState[key as keyof T].reset());
  }
}
