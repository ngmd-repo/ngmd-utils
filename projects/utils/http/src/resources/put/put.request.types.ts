/* eslint-disable @typescript-eslint/naming-convention */

import { CrudRequestOptions, CrudSendOptions, PartialUrlOptions } from '../../classes';

export type PutRequestOptions<Options extends PartialUrlOptions = null> =
  CrudRequestOptions<Options>;

export type PutSendOptions<Response, Options extends PartialUrlOptions = null> = CrudSendOptions<
  Response,
  Options
>;
