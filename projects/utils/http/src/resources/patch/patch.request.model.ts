import { Observable, Subscription } from 'rxjs';

import { PartialUrlOptions, RequestUrlOptions, TArgsWithBody } from '../../classes';
import { CrudRequest } from '../../classes/crud/crud-request.class';
import { PatchRequestOptions, PatchSendOptions } from './patch.request.types';

export class PatchRequest<
  Body,
  Response = null,
  Options extends PartialUrlOptions = null,
> extends CrudRequest<Response> {
  public request(
    ...args: TArgsWithBody<Body, PatchRequestOptions<Options>, Options>
  ): Observable<Response>;
  public request(body: Body, opts?: PatchRequestOptions<Options>): Observable<Response> {
    const url: string = this.makeUrl((opts as RequestUrlOptions<Options>)?.urlOptions);

    return this.http.patch<Response>(url, body, opts?.requestOptions);
  }

  public send(
    ...args: TArgsWithBody<Body, PatchSendOptions<Response, Options>, Options>
  ): Subscription;
  public send(body: Body, opts?: PatchSendOptions<Response, Options>): Subscription {
    return this.sendRequest(this.request(body, opts), opts);
  }
}
