/* eslint-disable @typescript-eslint/naming-convention */
import { CrudRequestOptions, HttpConfig, PartialUrlOptions, TUrlOptions } from '../../classes';
import { FetchRequestMeta } from '../../classes/fetch';
import { RequestConnection } from '../../types';

export type CacheRequestMeta<Response, Options extends PartialUrlOptions = null> = FetchRequestMeta<
  Response,
  Options
> & {
  cache?: CacheMetaOptions<Options>;
};

export type CacheMetaOptions<Options extends PartialUrlOptions = null> =
  CrudRequestOptions<Options>;

export type SetWithRequest<Response> = {
  withRequest: true | (HttpConfig & RequestConnection<Response>);
};
export type SetUrlOptions<Response, Options extends PartialUrlOptions> = Options extends null
  ? never
  : Partial<SetWithRequest<Response>> & TUrlOptions<Options>;
