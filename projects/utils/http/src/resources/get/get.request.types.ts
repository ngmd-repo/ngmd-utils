/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';

import { CrudRequestOptions, PartialUrlOptions } from '../../classes';
import { FetchRequestMeta, FetchSendOptions } from '../../classes/fetch';
import { LoadValueType } from '../../types';

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
  valueLike?: LoadValueType;
};

export type GetLoadValue<T extends GetLoadOptions, Response> = T['valueLike'] extends 'promise'
  ? Promise<Response>
  : Observable<Response>;
