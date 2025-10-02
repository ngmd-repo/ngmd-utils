/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { filter, Observable, Subject } from 'rxjs';

import { OnInitManager } from '../../../../../interfaces';
import { ServiceAction } from '../models/service-action.model';

export type TExcludeActionsFields = Extract<keyof ActionsManager<any>, '__action$' | 'init'>;

export class ActionsManager<Action extends ServiceAction> implements OnInitManager {
  public __action$: Subject<Action> = new Subject();

  public init(serviceInstance: any): void {
    serviceInstance.__action$ = new Subject();
  }

  public action(stateAction: Action): void {
    this.__action$.next(stateAction);
  }

  public actions(stateActions: Action[]): void {
    stateActions.forEach((action: Action) => this.action(action));
  }

  public listenActions<Type extends Action['type'] = Action['type']>(
    actions?: Type[],
  ): Observable<Extract<Action, { type: Type }>> {
    if (actions) {
      return this.__action$
        .asObservable()
        .pipe(filter(action => actions.includes(action?.type as Type))) as Observable<
        Extract<Action, { type: Type }>
      >;
    }

    return this.__action$.asObservable() as Observable<Extract<Action, { type: Type }>>;
  }
}
