import { assign, isJSType, NOOP } from '@ngmd/utils/handlers';
import { Observable, Subscription } from 'rxjs';

import { makeTagsURL } from '../../handlers/public-api';
import { ApiRequest } from '../api-request.class';
import { serializeCrudMeta } from './crud-request.handlers';
import {
  CrudRequestMeta,
  CrudSendOptions,
  PartialUrlOptions,
  RequestUrl,
  SendOptions,
} from './crud-request.types';

export abstract class CrudRequest<Response = null> extends ApiRequest<Response> {
  protected override meta: CrudRequestMeta<Response> = null;

  constructor(urlOrMeta: CrudRequestMeta<Response> | RequestUrl) {
    const meta: CrudRequestMeta<Response> = serializeCrudMeta(urlOrMeta);

    super(meta);
    this.meta = meta;
  }

  protected makeUrl(opts: PartialUrlOptions): string {
    switch (true) {
      case isJSType(this.meta.url, 'function'): {
        return this.meta.url(this.context, opts as any);
      }
      default: {
        return makeTagsURL(this.meta.url, opts?.query, opts?.params);
      }
    }
  }

  public abstract override request(...args: unknown[]): Observable<Response>;
  public abstract override send(...args: unknown[]): Subscription;

  protected override sendRequest(
    request$: Observable<Response>,
    opts?: CrudSendOptions<Response, PartialUrlOptions>,
  ): Subscription {
    const { stream = NOOP } = assign<SendOptions<Response>['sendOptions']>(
      this.meta.sendOptions,
      opts?.sendOptions,
    );
    request$ = request$.pipe(stream);

    return super.sendRequest(request$, opts);
  }
}
