/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ofType } from '@ngmd/utils/handlers';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { OnInitManager } from '../../../../../interfaces';

export type TExcludeUnsubscribeFields = Extract<
  keyof UnsubscribeManager<any>,
  '__subTypes' | '__unsubscribe$' | 'init'
>;

export class UnsubscribeManager<Action extends string> implements OnInitManager {
  public __unsubscribe$: Subject<string> = new Subject();
  public __subTypes: Action[] = [];

  public init(serviceInstance: any): void {
    serviceInstance.__unsubscribe$ = new Subject();
    serviceInstance.__subTypes = [];
  }

  public untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(
      this.__unsubscribe$.asObservable().pipe(
        filter((v: unknown) => {
          return !v;
        }),
      ),
    );
  }

  public untilDestroyedByType<T>(type: Action): MonoTypeOperatorFunction<T> {
    this.__subTypes.push(type);

    return takeUntil(this.__unsubscribe$.asObservable().pipe(ofType(type) as any));
  }

  public unsubscribe(): void {
    this.__unsubscribe$.next(void 0);
  }

  public unsubscribeByTypes(subTypes: Action[]): void {
    subTypes.forEach(key => {
      this.__unsubscribe$.next(key);
      const idx: number = this.__subTypes.indexOf(key);
      if (~idx) this.__subTypes.splice(idx, 1);
    });
  }

  public fullUnsubscribe(): void {
    this.unsubscribe();
    this.unsubscribeByTypes(this.__subTypes.concat());
  }
}
