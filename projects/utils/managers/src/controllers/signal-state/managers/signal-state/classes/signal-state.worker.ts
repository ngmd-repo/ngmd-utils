/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
/* eslint-disable @typescript-eslint/naming-convention */
import { computed, Signal, signal } from '@angular/core';
import { fillObject } from '@ngmd/utils/handlers';
import { TConstructor } from '@ngmd/utils/types';

import { TSignalStateSelectOptions } from '../../../public-api';
import {
  TSignalState,
  TSignalStateResetOptions,
  TWritableSignalState,
} from '../types/signal-state.types';

export type TExcludeSignalStateWorkerFields = Extract<
  keyof SignalStateWorker<any>,
  'currentState' | 'initialize' | 'resetState' | 'State'
>;

export class SignalStateWorker<T extends object> {
  public currentState: TWritableSignalState<T> = null;

  constructor(public State: TConstructor<T>) {
    this.initialize(State);
  }

  public initialize(State: TConstructor<T>): void {
    const instance: TWritableSignalState<T> = Object.entries(new State()).reduce<
      TWritableSignalState<T>
    >((accum, [key, value]) => {
      (accum as any)[key] = signal(value);

      return accum;
    }, {} as TWritableSignalState<T>);

    this.currentState = instance;
  }

  public getFullState(): TSignalState<T> {
    return this.currentState;
  }

  public get<Key extends keyof T>(key: Key): T[Key] {
    return this.currentState[key]();
  }

  public set<K extends keyof T, V extends T[K]>(key: K, value: V): void {
    this.currentState[key].set(value);
  }

  public select<K extends keyof T>(key: K): Signal<T[K]>;
  public select<
    K extends keyof T,
    TransformValue,
    const TransformOptions extends Pick<
      TSignalStateSelectOptions<T[K], TransformValue>,
      'transform'
    >,
  >(key: K, options: TransformOptions): Signal<ReturnType<TransformOptions['transform']>>;
  public select<V>(key: keyof T, options?: TSignalStateSelectOptions<T[keyof T], unknown>): V {
    const isExistTransform: boolean = Boolean(options?.transform);

    return isExistTransform
      ? (computed(() => {
          return options.transform(this.currentState[key]());
        }) as any)
      : (this.currentState[key].asReadonly() as any);
  }

  public patch(partialObject: Partial<T>): void {
    Object.entries(partialObject).forEach(([key, value]) => {
      this.set(key as keyof T, value as T[keyof T]);
    });
  }

  public resetState<Fields extends Array<keyof T>>(
    fields: Fields,
    options: TSignalStateResetOptions = { nonNullable: true },
  ): void {
    const instance: T = options.nonNullable ? new this.State() : fillObject(new this.State(), null);

    fields.forEach((field: keyof T) => {
      this.set(field, instance[field]);
    });
  }

  public reset(options?: TSignalStateResetOptions): void {
    const stateKeys: Array<keyof T> = Object.keys(this.currentState) as Array<keyof T>;

    this.resetState(stateKeys, options);
  }

  public resetFields<Key extends keyof T>(fields: Key[], options?: TSignalStateResetOptions): void {
    this.resetState(fields, options);
  }
}
