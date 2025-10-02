import { HttpErrorResponse } from '@angular/common/http';

import { ServiceAction } from '../../actions/models/service-action.model';
import { TErrorEvent } from '../types/error.types';

export class RequestError<Action extends string, Payload> {
  constructor(
    public error: HttpErrorResponse,
    public type: Action,
    public payload: Payload = null,
  ) {}
}

export type TRequestErrors<Actions extends ServiceAction> = RequestError<
  TErrorEvent<Actions['type']>,
  unknown
>;
