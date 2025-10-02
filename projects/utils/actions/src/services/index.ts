import { TRequiredArray } from '@ngmd/utils/types';
import { filter, Observable, OperatorFunction, Subject } from 'rxjs';

import { ChannelAction } from '../models/channel-action.model';
import { ActionPayload } from '../types';

export class ActionsChannel<Actions extends ChannelAction<string, unknown>> {
  private actions$: Subject<Actions> = new Subject();

  public listen<const T extends Actions['type'] = Actions['type']>(
    ...types: T[]
  ): Observable<Extract<Actions, { type: T }>> {
    const filters: [OperatorFunction<Actions, Actions>] = [] as unknown as [
      OperatorFunction<Actions, Actions>,
    ];

    if (types.length) {
      const operator: OperatorFunction<Actions, Actions> = filter((action: Actions) => {
        return types.includes(action.type as T);
      });

      filters.push(operator);
    }

    return this.actions$.asObservable().pipe(...filters) as Observable<
      Extract<Actions, { type: T }>
    >;
  }

  public action<T extends Actions['type']>(
    ...args: ActionPayload<Actions, T> extends null ? [T] : [T, ActionPayload<Actions, T>]
  ): void;
  public action<T extends Actions['type']>(type: T, payload?: ActionPayload<Actions, T>): void {
    this.actions$.next(new ChannelAction(type, payload) as unknown as Actions);
  }

  public actions(...actions: TRequiredArray<Actions>): void {
    actions.forEach(action => this.actions$.next(action));
  }
}
