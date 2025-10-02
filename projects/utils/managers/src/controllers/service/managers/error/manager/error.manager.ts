/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpErrorResponse } from '@angular/common/http';
import { filter, Observable, Subject } from 'rxjs';

import { OnInitManager } from '../../../../../interfaces';
import { RequestError } from '../models/request-error.model';
import { TErrorEvent } from '../types/error.types';

export type TExcludeErrorFields = Extract<keyof ErrorManager<any>, '__error$' | 'error' | 'init'>;

export class ErrorManager<Action extends string> implements OnInitManager {
  public __error$: Subject<RequestError<TErrorEvent<Action>, unknown>> = new Subject();

  public init(serviceInstance: any): void {
    serviceInstance.__error$ = new Subject();
  }

  public error(error: HttpErrorResponse, type: TErrorEvent<Action>, payload?: unknown): void {
    this.__error$.next(new RequestError(error, type, payload));
  }

  public listenErrors<Type extends Action = Action>(
    errors?: Type[],
  ): Observable<RequestError<TErrorEvent<Type>, unknown>> {
    if (errors) {
      return this.__error$.asObservable().pipe(
        filter(error => {
          const errorByType = errors.find(type => `error-${type}` === error.type);

          return Boolean(errorByType);
        }),
      ) as Observable<RequestError<TErrorEvent<Type>, unknown>>;
    }

    return this.__error$.asObservable() as Observable<RequestError<TErrorEvent<Type>, unknown>>;
  }

  public onError(
    type: TErrorEvent<Action>,
    errorCb?: (e: HttpErrorResponse) => void,
    payload?: unknown,
  ): (e: HttpErrorResponse) => void {
    return (e: HttpErrorResponse) => {
      if (Boolean(errorCb)) errorCb(e);

      this.error(e, type, payload);
    };
  }

  /**
   * @deprecated use only onError
   */
  public detectError<P>(
    action: TErrorEvent<Action>,
    errorCb?: (e: HttpErrorResponse) => void,
    payload?: P,
  ): (e: HttpErrorResponse) => void {
    return (e: HttpErrorResponse) => {
      if (Boolean(errorCb)) errorCb(e);

      this.error(e, action, payload);
    };
  }
}
