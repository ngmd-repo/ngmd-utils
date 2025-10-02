/* eslint-disable @typescript-eslint/naming-convention */
import { HttpErrorResponse } from '@angular/common/http';
import { TExtractKeysByValue, TRequiredArray } from '@ngmd/utils/types';

import {
  DeleteRequest,
  GetRequest,
  OperatorRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from '../resources';
import { CacheRequest } from '../resources/cache/cache.request.model';
import { ApiHubManager } from '../services';

export type TApiRequest =
  | CacheRequest<unknown, unknown>
  | DeleteRequest<unknown, unknown, unknown>
  | GetRequest<unknown, unknown>
  | OperatorRequest<unknown>
  | PatchRequest<unknown, unknown, unknown>
  | PostRequest<unknown, unknown, unknown>
  | PutRequest<unknown, unknown, unknown>;

export type RequestStrategy = 'merge' | 'switch';

export type RequestMeta<Response> = OnDestroyOptions &
  RequestConnection<Response> & {
    strategy?: RequestStrategy;
    transform?: (response: any) => Response;
  };

export type LoadValueType = 'observer' | 'promise';

export type DestroyConfig<T = boolean> = {
  abort?: T;
  reset?: T;
};

export type OnDestroyOptions<T = boolean> = {
  onDestroy?: DestroyConfig<T>;
};

export type ConnectWith<Response> = {
  set(value: Response): void;
};

export type WithConnection<Response> = {
  with: ConnectWith<Response> | TRequiredArray<ConnectWith<Response>>;
};

export type ReloadConnection = {
  reload: TApiRequest | TRequiredArray<TApiRequest>;
};

export type ConnectionOptions<Response = null> = Partial<ReloadConnection> &
  Partial<WithConnection<Response>> &
  TObserver<Response>;

export type RequestConnection<Response> = {
  connect?: ConnectionOptions<Response>;
};

export type RequestSendOptions<Response> = RequestConnection<Response>;

export type ConnectionRef = {
  disconnect(): void;
};

export type TObserver<Response> = Partial<{
  next(response: Response): void;
  error(error: HttpErrorResponse): void;
  complete(): void;
  finalize(): void;
}>;

export type TApiHub<T extends object> = {
  [K in keyof T]: TApiRequest;
};

export type ApiHub<T extends TApiHub<T>> = T & {
  hub: ApiHubManager<T>;
};

export type ApiHubConfig<T extends TApiHub<T>> = OnDestroyOptions<
  TRequiredArray<keyof T> | true
> & {
  cache?: TRequiredArray<keyof TExtractKeysByValue<T, CacheRequest<any>>>;
  force?: TRequiredArray<keyof TExtractKeysByValue<T, GetRequest<any> | OperatorRequest<any>>>;
};
