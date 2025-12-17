/* eslint-disable @typescript-eslint/naming-convention */
import { CrudRequestOptions, CrudSendOptions, PartialUrlOptions } from '../../classes';

export type PatchRequestOptions<Options extends PartialUrlOptions = null> =
  CrudRequestOptions<Options>;

export type PatchSendOptions<Response, Options extends PartialUrlOptions = null> = CrudSendOptions<
  Response,
  Options
>;
