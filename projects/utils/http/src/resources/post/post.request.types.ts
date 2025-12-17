/* eslint-disable @typescript-eslint/naming-convention */

import { CrudRequestOptions, CrudSendOptions, PartialUrlOptions } from '../../classes';

export type PostRequestOptions<Options extends PartialUrlOptions = null> =
  CrudRequestOptions<Options>;

export type PostSendOptions<Response, Options extends PartialUrlOptions = null> = CrudSendOptions<
  Response,
  Options
>;
