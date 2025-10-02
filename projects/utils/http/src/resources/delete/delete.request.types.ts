/* eslint-disable @typescript-eslint/naming-convention */
import {
  CrudSendOptions,
  HttpClientRequestOptionsMap,
  PartialUrlOptions,
  TUrlOptions,
} from '../../classes';

export type DeleteRequestOptions<Options extends PartialUrlOptions = null, Body = null> = Pick<
  DeleteSendOptions<Options, null, Body>,
  'requestOptions'
> &
  TUrlOptions<Options>;

export type DeleteSendOptions<
  Options extends PartialUrlOptions = null,
  Response = null,
  Body = null,
> = CrudSendOptions<'delete', Response, Options> & {
  requestOptions?: HttpClientRequestOptionsMap['delete'] & { body?: Body };
};
