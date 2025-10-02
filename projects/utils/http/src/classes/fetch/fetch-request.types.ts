/* eslint-disable @typescript-eslint/naming-convention */
import { TExtendValue } from '@ngmd/utils/types';

import { CrudRequestMeta, CrudRequestOptions, CrudSendOptions, PartialUrlOptions } from '../crud';

export type FetchRequestMeta<Response, Options extends PartialUrlOptions = null> = CrudRequestMeta<
  TExtendValue<Response>,
  Options
> & {
  initialValue?: TExtendValue<Response>;
};

export type FetchRequestOptions<Options extends PartialUrlOptions = null> = CrudRequestOptions<
  'get',
  Options
>;

export type FetchSendOptions<Response, Options extends PartialUrlOptions = null> = CrudSendOptions<
  'get',
  Response,
  Options
>;
