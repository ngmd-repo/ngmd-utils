/* eslint-disable @typescript-eslint/naming-convention */

import { CrudRequestOptions, CrudSendOptions, PartialUrlOptions } from '../../classes';

export type PutRequestOptions<Options extends PartialUrlOptions = null> = CrudRequestOptions<
  'put',
  Options
>;

export type PutSendOptions<Response, Options extends PartialUrlOptions = null> = CrudSendOptions<
  'put',
  Response,
  Options
>;
