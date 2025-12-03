/* eslint-disable @typescript-eslint/naming-convention */
import { CrudSendOptions, HttpOptionsMap, PartialUrlOptions, TUrlOptions } from '../../classes';

export type DeleteRequestOptions<Options extends PartialUrlOptions = null, Body = null> = Pick<
  DeleteSendOptions<Options, null, Body>,
  'httpOptions'
> &
  TUrlOptions<Options>;

export type DeleteSendOptions<
  Options extends PartialUrlOptions = null,
  Response = null,
  Body = null,
> = CrudSendOptions<'delete', Response, Options> & {
  httpOptions?: HttpOptionsMap['delete'] & { body?: Body };
};
