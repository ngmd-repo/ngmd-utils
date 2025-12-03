/* eslint-disable @typescript-eslint/dot-notation */
import { DestroyRef, inject, Signal, untracked } from '@angular/core';
import { ApiRequest, parseExecutionFields } from '@ngmd/utils/http';
import { TExtractKeys, TExtractKeysByValue, TRequiredArray } from '@ngmd/utils/types';

import { QueryRequest } from '../../../resources';
import { GqlHubConfig, TGqlHub } from '../types';

export class GqlHubManager<T extends TGqlHub<T>> {
  constructor(private hub: T) {}

  protected initConfigInUseContext(cfg: GqlHubConfig<T>): void {
    if (cfg.onDestroy) this.initOnDestroy(cfg.onDestroy);
    if (cfg.cache) this.initCacheFields(cfg.cache);
    if (cfg.force) this.initForceFields(cfg.force);
  }

  private initOnDestroy(onDestroy: GqlHubConfig<T>['onDestroy']): void {
    const destroyRef: DestroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
      if (onDestroy.abort) this.executeOperation(parseExecutionFields(onDestroy.abort), 'abort');
      if (onDestroy.reset) this.executeOperation(parseExecutionFields(onDestroy.reset), 'reset');
    });
  }

  private executeOperation(
    keys: Array<keyof T>,
    operation: TExtractKeys<ApiRequest, 'abort' | 'clear' | 'destroy' | 'reset'>,
  ): void {
    keys = keys.length ? keys : (Object.keys(this.hub) as Array<keyof T>);

    keys.forEach((key: keyof T) => this.hub[key][operation]());
  }

  private initCacheFields(keys: GqlHubConfig<T>['cache']): void {
    keys.forEach(k => (this.hub[k] as QueryRequest<any>)['sendCacheRequest']());
  }

  private initForceFields(keys: GqlHubConfig<T>['force']): void {
    keys.forEach(k => (this.hub[k] as QueryRequest<any>)['sendForceRequest']());
  }

  private getValues<K extends TRequiredArray<keyof TExtractKeysByValue<T, QueryRequest<any, any>>>>(
    keys: K,
  ): { [Key in K[number]]: T[Key] extends { value: Signal<infer V> } ? V : never } {
    return keys.reduce((accum, key) => {
      (accum as any)[key] = this.get(key);

      return accum;
    }, {}) as { [Key in K[number]]: T[Key] extends { value: Signal<infer V> } ? V : never };
  }

  public get<K extends TRequiredArray<keyof TExtractKeysByValue<T, QueryRequest<any, any>>>>(
    ...keys: K
  ): K['length'] extends 1
    ? T[K[0]] extends { value: Signal<infer V> }
      ? V
      : never
    : { [Key in K[number]]: T[Key] extends { value: Signal<infer V> } ? V : never } {
    return untracked(() => {
      return (
        keys.length === 1 ? (this.hub[keys[0]] as QueryRequest<any>).value() : this.getValues(keys)
      ) as K['length'] extends 1
        ? T[K[0]] extends { value: Signal<infer V> }
          ? V
          : never
        : { [Key in K[number]]: T[Key] extends { value: Signal<infer V> } ? V : never };
    });
  }

  public abort(...keys: Array<keyof T>): void {
    this.executeOperation(keys, 'abort');
  }

  public clear(...keys: Array<keyof T>): void {
    this.executeOperation(keys, 'clear');
  }

  public reset(...keys: Array<keyof T>): void {
    this.executeOperation(keys, 'reset');
  }

  public destroy(...keys: Array<keyof T>): void {
    this.executeOperation(keys, 'destroy');
  }
}
