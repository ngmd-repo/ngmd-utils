/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { filter, Observable } from 'rxjs';

import { OnInitManager } from '../../../../../interfaces';
import { StateWorker } from '../classes/state.worker';
import { StateChange, TStateChanges } from '../models/state-change.model';
import { TStatesConstructors, TStatesInstances, TStateWorkers } from '../types/state.types';

export type TExcludeStateFields = Extract<
  keyof StatesManager<any>,
  '_stateWorkers' | 'init' | 'states'
>;
export class StatesManager<
  const StatesConstructors extends TStatesConstructors,
  const StatesInstances extends
    TStatesInstances<StatesConstructors> = TStatesInstances<StatesConstructors>,
> implements OnInitManager
{
  public _stateWorkers: TStateWorkers = null;

  constructor(public states: StatesConstructors) {}

  public init(serviceInstance: any): void {
    serviceInstance._stateWorkers = Object.entries(this.states).reduce(
      (accum, [stateKey, StateInstance]) => {
        (accum as any)[stateKey] = new StateWorker<any>(StateInstance);

        return accum;
      },
      {},
    );
  }

  public getFullState<const M extends keyof StatesInstances>(managerType: M): StatesInstances[M] {
    return (this._stateWorkers as any)[managerType].getFull();
  }

  public getState<const M extends keyof StatesInstances, K extends keyof StatesInstances[M]>(
    managerType: M,
    prop: K,
  ): StatesInstances[M][K] {
    return (this._stateWorkers as any)[managerType].get(prop);
  }

  public setState<
    const M extends keyof StatesInstances,
    K extends keyof StatesInstances[M],
    Value extends StatesInstances[M][K],
  >(managerType: M, prop: K, value: Value): void {
    (this._stateWorkers as any)[managerType].set(prop, value);
  }

  public patchState<const M extends keyof StatesInstances>(
    managerType: M,
    partialObject: Partial<StatesInstances[M]>,
  ): void {
    (this._stateWorkers as any)[managerType].patch(partialObject);
  }

  public resetStates<const M extends keyof StatesInstances>(managerTypes: M[]): void {
    managerTypes.forEach((managerType: M) => {
      (this._stateWorkers as any)[managerType]?.reset();
    });
  }

  public resetStateFields<const M extends keyof StatesInstances>(
    managerType: M,
    fields: Array<keyof StatesInstances[M]>,
  ): void {
    (this._stateWorkers as any)[managerType].resetFields(fields);
  }

  /**
   * @deprecated Use only resetStates
   */
  public destroyStates<const M extends keyof StatesInstances>(...managerTypes: M[]): void {
    managerTypes.forEach((managerType: M) => {
      (this._stateWorkers as any)[managerType]?.reset();
    });
  }

  /**
   * @deprecated use only listenStateChanges
   */
  public stateChanges<const M extends keyof StatesInstances, K extends keyof StatesInstances[M]>(
    managerType: M,
    filterProps?: K[],
  ): Observable<StateChange<StatesInstances[M] & object, K>> {
    return (this._stateWorkers as any)[managerType]?.listen().pipe(
      filter(({ property }) => {
        if (filterProps) return filterProps.includes(property as K);

        return true;
      }),
    );
  }

  public listenStateChanges<
    const M extends keyof StatesInstances,
    const Keys extends Array<keyof StatesInstances[M]>,
  >(
    managerType: M,
    filterProps: Keys,
  ): Observable<TStateChanges<StatesInstances[M] & object, Keys>> {
    return (this._stateWorkers as any)[managerType]?.listen().pipe(
      filter(({ property }) => {
        return filterProps.includes(property as Keys[number]);
      }),
    );
  }
}
