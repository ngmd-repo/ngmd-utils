/* eslint-disable @typescript-eslint/naming-convention */
import { CrudRequestOptions, CrudSendOptions, PartialUrlOptions } from '../../classes';

export type PatchRequestOptions<Options extends PartialUrlOptions = null> = CrudRequestOptions<
  'patch',
  Options
>;

export type PatchSendOptions<Response, Options extends PartialUrlOptions = null> = CrudSendOptions<
  'patch',
  Response,
  Options
>;
