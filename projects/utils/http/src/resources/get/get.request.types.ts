/* eslint-disable @typescript-eslint/naming-convention */
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CrudRequestOptions, PartialUrlOptions } from '../../classes';
import { FetchRequestMeta, FetchSendOptions } from '../../classes/fetch';
import { SubscriptionType } from '../../types';

export type GetRequestMeta<Response, Options extends PartialUrlOptions = null> = FetchRequestMeta<
  Response,
  Options
> & {
  force?: ForceMetaOptions<Options> | boolean;
};

export type ForceMetaOptions<Options extends PartialUrlOptions = null> =
  CrudRequestOptions<Options>;

export type GetLoadOptions<Response = any, Options = any> = Omit<
  FetchSendOptions<Response, Options>,
  'connect'
> & {
  repeat?: boolean;
  subLike?: SubscriptionType;
};
export type LoadResult<Response> =
  | { status: 'failed'; data: HttpErrorResponse }
  | { status: 'success'; data: Response };

export type LoadSubscription<T extends GetLoadOptions, Response> = T['subLike'] extends 'promise'
  ? Promise<LoadResult<Response>>
  : Observable<LoadResult<Response>>;
