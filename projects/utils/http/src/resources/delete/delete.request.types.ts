/* eslint-disable @typescript-eslint/naming-convention */
import { CrudSendOptions, HttpOptions, PartialUrlOptions, TUrlOptions } from '../../classes';

export type DeleteRequestOptions<Options extends PartialUrlOptions = null, Body = null> = Pick<
  DeleteSendOptions<Options, null, Body>,
  'httpOptions'
> &
  TUrlOptions<Options>;

export type DeleteSendOptions<
  Options extends PartialUrlOptions = null,
  Response = null,
  Body = null,
> = CrudSendOptions<Response, Options> & {
  httpOptions?: HttpOptions & { body?: Body };
};
