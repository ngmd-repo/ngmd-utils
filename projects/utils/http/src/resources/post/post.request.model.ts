import { Observable, Subscription } from 'rxjs';

import { PartialUrlOptions, RequestUrlOptions, TArgsWithBody } from '../../classes';
import { CrudRequest } from '../../classes/crud/crud-request.class';
import { PostRequestOptions, PostSendOptions } from './post.request.types';

export class PostRequest<
  Body,
  Response = null,
  Options extends PartialUrlOptions = null,
> extends CrudRequest<Response> {
  public request(
    ...args: TArgsWithBody<Body, PostRequestOptions<Options>, Options>
  ): Observable<Response>;
  public request(body: Body, opts?: PostRequestOptions<Options>): Observable<Response> {
    const url: string = this.makeUrl((opts as RequestUrlOptions<Options>)?.urlOptions);

    return this.http.post<Response>(url, body, opts?.requestOptions);
  }

  public send(
    ...args: TArgsWithBody<Body, PostSendOptions<Response, Options>, Options>
  ): Subscription;
  public send(body: Body, opts?: PostSendOptions<Response, Options>): Subscription {
    return this.sendRequest(this.request(body, opts), opts);
  }
}
