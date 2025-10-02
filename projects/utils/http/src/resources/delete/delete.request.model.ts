import { Observable, Subscription } from 'rxjs';

import { PartialUrlOptions, RequestUrlOptions, TArgsWithoutBody } from '../../classes';
import { CrudRequest } from '../../classes/crud/crud-request.class';
import { DeleteRequestOptions, DeleteSendOptions } from './delete.request.types';

export class DeleteRequest<
  Options extends PartialUrlOptions = null,
  Response = null,
  Body = null,
> extends CrudRequest<Response> {
  public request(
    ...args: TArgsWithoutBody<DeleteRequestOptions<Options>, Options>
  ): Observable<Response>;
  public request(opts?: DeleteRequestOptions<Options>): Observable<Response> {
    const url: string = this.makeUrl((opts as RequestUrlOptions<Options>)?.urlOptions);

    return this.http.delete<Response>(url, opts?.requestOptions);
  }

  public send(
    ...args: TArgsWithoutBody<DeleteSendOptions<Options, Response, Body>, Options>
  ): Subscription;
  public send(opts?: DeleteSendOptions<Options, Response, Body>): Subscription {
    return this.sendRequest(this.request(opts as DeleteRequestOptions<Options>), opts);
  }
}
