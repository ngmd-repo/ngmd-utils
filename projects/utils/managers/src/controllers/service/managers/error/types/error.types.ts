import { ServiceAction } from '../../actions/models/service-action.model';

export type TErrorEvent<Action extends string> = 'error' | `error-${Action}`;
export type TRequestError<Action extends ServiceAction, Error = string> = {
  type: TErrorEvent<Action['type']>;
  errors: Error[];
};
