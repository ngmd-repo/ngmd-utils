import { isEqualJSON, isNotNullish, recordObject, selectObjectProps } from '@ngmd/utils/handlers';
import { TConstructor, TIfElse } from '@ngmd/utils/types';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';

import { TStoreResetOptions } from '../../signal-store/types/signal-store.types';

/**
 * @deprecated use Store
 */
export class RxStore<T extends object> {
  private store$: BehaviorSubject<T> = new BehaviorSubject(null);
  public stateChanges: Observable<T> = this.initStoreChangesSub();

  constructor(private StoreConstructor: TConstructor<T>) {
    this.store$.next(new StoreConstructor());
  }

  private initStoreChangesSub(): Observable<T> {
    return this.store$.asObservable().pipe(distinctUntilChanged(this.isEqualValues));
  }

  private isEqualValues(previous: any, current: any): boolean {
    const isEqualValues: boolean = isEqualJSON(previous, current);

    return isEqualValues;
  }

  public getStore(): T {
    return this.store$.getValue();
  }

  private get DefaultStore(): T {
    return new this.StoreConstructor();
  }

  public getValue<K extends keyof T>(key: K): T[K] {
    return this.store$.getValue()[key];
  }

  public listen(): Observable<T> {
    return this.store$.asObservable();
  }

  public select<K extends keyof T>(key: K): Observable<T[K]> {
    return this.store$.asObservable().pipe(
      map((store: T) => store[key]),
      distinctUntilChanged(this.isEqualValues),
    );
  }

  public selectFirstDefinedValue<K extends keyof T, Mode extends 'default' | 'promise' = 'default'>(
    key: K,
    mode: Mode = 'default' as Mode,
  ): TIfElse<Mode, 'default', Observable<T[K]>, Promise<T[K]>> {
    const stream$: Observable<T[K]> = this.store$.asObservable().pipe(
      map((store: T) => store[key]),
      filter(isNotNullish as any),
    );
    const value: Observable<T[K]> | Promise<T[K]> =
      mode === 'default' ? stream$.pipe(take(1)) : firstValueFrom(stream$);

    return value as TIfElse<Mode, 'default', Observable<T[K]>, Promise<T[K]>>;
  }

  /**
   * @deprecated use method patchStore
   */
  public updateStore(value: Partial<T>): void {
    this.patchStore(value);
  }

  /**
   * @deprecated use method setValue
   */

  public mergeStore<K extends keyof T, V extends Partial<T[K]>>(key: K, value: V): void {
    this.setValue(key, value);
  }

  // * New renamed methods

  public patchStore(partialStore: Partial<T>): void {
    const currentStore: T = this.getStore();
    const updatedStore: T = Object.assign({}, currentStore, partialStore);

    this.store$.next(updatedStore);
  }

  public setValue<K extends keyof T, V extends Partial<T[K]>>(key: K, value: V): void {
    this.patchStore({ [key]: value } as unknown as Partial<T>);
  }

  public reset(emitEvent: boolean = true): void {
    const Store: T = this.getStore();

    Object.assign(Store, this.DefaultStore);

    if (emitEvent) this.patchStore(Store);
  }

  public resetFields<FieldName extends keyof T>(
    fields: FieldName[],
    options?: TStoreResetOptions,
  ): void {
    const isNonNullable: boolean = options?.nonNullable;

    if (isNonNullable) {
      const resetObject: Partial<T> = selectObjectProps(this.DefaultStore, fields) as Partial<T>;

      this.patchStore(resetObject);
    } else {
      const resetObject: Partial<T> = recordObject(fields as readonly string[], null) as Partial<T>;

      this.patchStore(resetObject);
    }
  }
}
