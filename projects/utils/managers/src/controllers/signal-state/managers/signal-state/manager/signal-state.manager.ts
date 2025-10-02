/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */

import { Signal } from '@angular/core';
import { isNotNullish } from '@ngmd/utils/handlers';

import { OnInitManager } from '../../../../../interfaces/init-manager.interface';
import { TSignalStateSelectOptions, TSignalStatesObject } from '../../../types/signal-state.types';
import { SignalStateWorker } from '../classes/signal-state.worker';
import {
  TSignalState,
  TSignalStateResetOptions,
  TSignalStatesInstances,
  TSignalStateWorkers,
} from '../types/signal-state.types';

export type TExcludeSignalStateFields = Extract<
  keyof SignalStateManager<any>,
  '_signalStateWorkers' | 'init' | 'signalStates'
>;
export class SignalStateManager<
  const StatesConstructors extends TSignalStatesObject,
  const StatesInstances extends
    TSignalStatesInstances<StatesConstructors> = TSignalStatesInstances<StatesConstructors>,
> implements OnInitManager
{
  public _signalStateWorkers: TSignalStateWorkers<StatesConstructors>;

  constructor(public signalStates: StatesConstructors) {}

  public init(serviceInstance: any & object): void {
    serviceInstance._signalStateWorkers = Object.entries(this.signalStates).reduce<
      TSignalStateWorkers<StatesConstructors>
    >((accum: TSignalStateWorkers<StatesConstructors>, [type, State]) => {
      (accum as any)[type] = new SignalStateWorker<any>(State);

      return accum;
    }, {} as TSignalStateWorkers<StatesConstructors>);
  }

  public getFullSignalState<StateType extends keyof StatesInstances>(
    type: StateType,
  ): TSignalState<StatesInstances[StateType]> {
    return (this._signalStateWorkers as any)[type].getFullState();
  }

  public getSignalState<
    StateType extends keyof StatesInstances,
    Key extends keyof StatesInstances[StateType],
    Value extends StatesInstances[StateType][Key],
  >(type: StateType, key: Key): Value {
    return (this._signalStateWorkers as any)[type].get(key);
  }

  public hasSignalStateValue<
    StateType extends keyof StatesInstances,
    Key extends keyof StatesInstances[StateType],
  >(type: StateType, key: Key): boolean {
    const value: StatesInstances[StateType][Key] = this.getSignalState(type, key);

    return isNotNullish(value);
  }

  public setSignalState<
    StateType extends keyof StatesInstances,
    Key extends keyof StatesInstances[StateType],
    Value extends StatesInstances[StateType][Key],
  >(type: StateType, key: Key, value: Value) {
    (this._signalStateWorkers as any)[type].set(key, value);
  }

  public selectSignalState<
    StateType extends keyof StatesInstances,
    Key extends keyof StatesInstances[StateType],
    Value extends TSignalState<StatesInstances[StateType]>[Key],
  >(type: StateType, key: Key): Value;
  public selectSignalState<
    StateType extends keyof StatesInstances,
    Key extends keyof StatesInstances[StateType],
    Value extends TSignalState<StatesInstances[StateType]>[Key],
    TransformValue,
    Options extends Pick<TSignalStateSelectOptions<ReturnType<Value>, TransformValue>, 'transform'>,
  >(type: StateType, key: Key, options: Options): Signal<ReturnType<Options['transform']>>;
  public selectSignalState<
    StateType extends keyof StatesInstances,
    Key extends keyof StatesInstances[StateType],
    Value extends TSignalState<StatesInstances[StateType]>[Key],
  >(
    type: StateType,
    key: Key,
    options?: TSignalStateSelectOptions<TSignalState<StatesInstances[StateType]>[Key], unknown>,
  ): Value {
    return (this._signalStateWorkers as any)[type].select(key, options);
  }

  public patchSignalState<StateType extends keyof StatesInstances>(
    type: StateType,
    partialState: Partial<StatesInstances[StateType]>,
  ): void {
    (this._signalStateWorkers as any)[type].patch(partialState);
  }

  public resetSignalStates<StateType extends keyof StatesInstances>(
    types: StateType[],
    options?: TSignalStateResetOptions,
  ): void {
    types.forEach((type: StateType) => (this._signalStateWorkers as any)[type].reset(options));
  }

  public resetSignalStateFields<StateType extends keyof StatesInstances>(
    type: StateType,
    fields: Array<keyof StatesInstances[StateType]>,
    options?: TSignalStateResetOptions,
  ): void {
    (this._signalStateWorkers as any)[type].resetFields(fields, options);
  }
}
