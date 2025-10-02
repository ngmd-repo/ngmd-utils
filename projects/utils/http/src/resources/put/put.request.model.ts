import { Observable, Subscription } from 'rxjs';

import { PartialUrlOptions, RequestUrlOptions, TArgsWithBody } from '../../classes';
import { CrudRequest } from '../../classes/crud/crud-request.class';
import { PutRequestOptions, PutSendOptions } from './put.request.types';

export class PutRequest<
  Body,
  Response = null,
  Options extends PartialUrlOptions = null,
> extends CrudRequest<Response> {
  public request(
    ...args: TArgsWithBody<Body, PutRequestOptions<Options>, Options>
  ): Observable<Response>;
  public request(body: Body, opts?: PutRequestOptions<Options>): Observable<Response> {
    const url: string = this.makeUrl((opts as RequestUrlOptions<Options>)?.urlOptions);

    return this.http.put<Response>(url, body, opts?.requestOptions);
  }

  public send(
    ...args: TArgsWithBody<Body, PutSendOptions<Response, Options>, Options>
  ): Subscription;
  public send(body: Body, opts?: PutSendOptions<Response, Options>): Subscription {
    return this.sendRequest(this.request(body, opts), opts);
  }
}
