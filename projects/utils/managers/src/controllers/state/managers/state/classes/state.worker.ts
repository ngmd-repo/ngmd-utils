import { selectObjectProps } from '@ngmd/utils/handlers';
import { TConstructor } from '@ngmd/utils/types';
import { Observable, Subject } from 'rxjs';

import { StateChange } from '../models/state-change.model';

export class StateWorker<T extends object> {
  private currentState: T;
  private change$: Subject<StateChange<T, keyof T>> = new Subject();

  constructor(private StateConstructor: TConstructor<T>) {
    this.initialize(this.defaultInstance);
  }

  private initialize(state: T): void {
    this.currentState = state;
  }

  private get defaultInstance(): T {
    return new this.StateConstructor();
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.currentState[key];
  }

  public getFull(): T {
    return this.currentState;
  }

  public set<K extends keyof T>(key: K, value: T[K]): void {
    const previous: T[K] = this.get(key);

    this.currentState[key] = value;
    this.next(key, previous, value);
  }

  public patch(partialObject: Partial<T>): void {
    Object.assign(this.currentState, partialObject);
  }

  public reset(): void {
    this.currentState = Object.assign(this.currentState, this.defaultInstance);
  }

  public resetFields(fields: Array<keyof T>): void {
    const resetFieldsObject: Partial<T> = selectObjectProps(this.defaultInstance, fields);

    Object.assign(this.currentState, resetFieldsObject);
  }

  private next<K extends keyof T>(property: K, previous: T[K], current: T[K]): void {
    const change: StateChange<T, K> = new StateChange(property, previous, current);

    this.change$.next(change);
  }

  public listen(): Observable<StateChange<T, keyof T>> {
    return this.change$.asObservable();
  }
}
