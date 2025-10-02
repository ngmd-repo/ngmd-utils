import { DestroyRef, inject, Injector, untracked } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { isJSType } from '@ngmd/utils/handlers';
import { TRequiredArray } from '@ngmd/utils/types';
import { Observable } from 'rxjs';

import { StateConfig, StateDestroyConfig, TStateItem } from '../types';

export class StateManager<T extends object> {
  constructor(
    private stateItem: TStateItem<T>,
    private injector: Injector,
  ) {}

  protected initConfigInUseContext(cfg: StateConfig<T>): void {
    if (cfg.onDestroy) this.initOnDestroy(cfg.onDestroy);
  }

  private initOnDestroy({ reset }: StateDestroyConfig<T>): void {
    const destroyRef: DestroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
      const keys: Array<keyof T> = isJSType(reset, 'boolean') ? [] : reset;

      this.reset(...keys);
    });
  }

  private getValues<K extends Array<keyof T>, Value = { [Key in K[number]]: T[Key] }>(
    keys: K,
  ): Value {
    return keys.reduce((accum, key) => {
      (accum as any)[key] = this.get(key);

      return accum;
    }, {}) as Value;
  }

  public get<K extends TRequiredArray<keyof T>>(
    ...keys: K
  ): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] } {
    return untracked(() => {
      return (
        keys.length === 1 ? this.stateItem.instance[keys[0]]() : this.getValues(keys)
      ) as K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] };
    });
  }

  public toRx<K extends keyof T>(key: K): Observable<T[K]> {
    return toObservable(this.stateItem.instance[key], { injector: this.injector });
  }

  public patch(partialObject: Partial<T>): void {
    Object.entries(partialObject).forEach(item => {
      const { 0: field, 1: value } = item as [keyof T, T[keyof T]];

      this.stateItem.instance[field].set(value);
    });
  }

  public reset(...keys: Array<keyof T>): void {
    const instance: T = new this.stateItem.class();
    keys = keys.length ? keys : (Object.keys(this.stateItem.instance) as Array<keyof T>);

    keys.forEach(key => this.stateItem.instance[key].set(instance[key]));
  }
}
