import { DestroyRef, inject, Injector, untracked } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { isJSType, isNotNullish } from '@ngmd/utils/handlers';
import { TIfElse, TRequiredArray } from '@ngmd/utils/types';
import { filter, firstValueFrom, Observable, take } from 'rxjs';

import { StoreConfig, StoreDestroyConfig, TStoreItem } from '../types';

export class StoreManager<T extends object> {
  constructor(
    private storeItem: TStoreItem<T>,
    private injector: Injector,
  ) {}

  private getDefaultInstance(): T {
    const instance: T = new this.storeItem.class();

    return instance;
  }

  protected initConfigInUseContext(cfg: StoreConfig<T>): void {
    if (cfg.onDestroy) this.initOnDestroy(cfg.onDestroy);
  }

  private initOnDestroy({ reset }: StoreDestroyConfig<T>): void {
    const destroyRef: DestroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
      const keys: Array<keyof T> = isJSType(reset, 'boolean') ? [] : reset;

      this.reset(...keys);
    });
  }

  private getValues<K extends Array<keyof T>>(keys: K): Pick<T, K[number]> {
    return keys.reduce((accum, key) => {
      (accum as Pick<T, K[number]>)[key] = this.get(key);

      return accum;
    }, {}) as Pick<T, K[number]>;
  }

  public get<K extends TRequiredArray<keyof T>>(
    ...keys: K
  ): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] } {
    return untracked(() => {
      return (
        keys.length === 1 ? this.storeItem.instance[keys[0]]() : this.getValues(keys)
      ) as K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] };
    });
  }

  private set<K extends keyof T, V extends T[K]>(key: K, value: V): void {
    this.storeItem.instance[key].set(value);
  }

  public patch(store: Partial<T>): void {
    Object.entries(store).forEach(item => {
      const { 0: key, 1: value } = item as [keyof T, T[keyof T]];

      this.set(key, value);
    });
  }

  public selectFirstDefinedValue<
    K extends keyof T,
    Mode extends 'observer' | 'promise' = 'observer',
  >(
    key: K,
    mode: Mode = 'observer' as Mode,
  ): TIfElse<Mode, 'observer', Observable<T[K]>, Promise<T[K]>> {
    const stream$: Observable<T[K]> = this.toRx(key).pipe(filter<T[K]>(isNotNullish));
    const value: Observable<T[K]> | Promise<T[K]> =
      mode === 'observer' ? stream$.pipe(take(1)) : firstValueFrom(stream$);

    return value as TIfElse<Mode, 'observer', Observable<T[K]>, Promise<T[K]>>;
  }

  public toRx<K extends keyof T>(key: K): Observable<T[K]> {
    return toObservable(this.storeItem.instance[key], { injector: this.injector });
  }

  public reset(...keys: Array<keyof T>): void {
    const instance: T = this.getDefaultInstance();

    keys = keys.length ? keys : (Object.keys(instance) as Array<keyof T>);

    keys.forEach(key => this.set(key, instance[key]));
  }
}
