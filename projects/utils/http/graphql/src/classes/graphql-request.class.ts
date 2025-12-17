import { inject } from '@angular/core';
import { ApiRequest } from '@ngmd/utils/http';
import { Observable, Subscription, switchMap } from 'rxjs';

import {
  WITH_GQL_RESPONSE_HANDLER,
  WithGqlResponseFn,
} from '../providers/provide-gql/features/with-response-handler';
import { setupGqlMeta } from './graphql-request.handlers';
import {
  GqlBody,
  GqlRequestMeta,
  GqlRequestOptions,
  GqlRequestString,
  GqlRequestType,
  GqlRequestVariables,
  GqlSendOptions,
} from './graphql-request.types';

export class GraphQLRequest<
  Type extends GqlRequestType,
  Response,
  Variables extends object = null,
> extends ApiRequest<Response> {
  protected override meta: GqlRequestMeta<Type, Response> = null;
  private responseHandler: WithGqlResponseFn = inject(WITH_GQL_RESPONSE_HANDLER);

  constructor(queryOrMeta: GqlRequestMeta<Type, Response> | GqlRequestString<GqlRequestType>) {
    const meta: GqlRequestMeta<Type, Response> = setupGqlMeta(queryOrMeta);

    super(meta);
    this.meta = meta;
  }

  public request<T = Response>(options?: GqlRequestOptions<Variables>): Observable<T> {
    const body: GqlBody<Type, Variables> = { query: this.meta.query as Type };

    if ((options as GqlRequestVariables)?.variables) {
      body.variables = (options as GqlRequestVariables).variables;
    }

    return this.http
      .post(this.meta.url, body, options?.httpOptions as any)
      .pipe<T>(switchMap(this.responseHandler as any));
  }

  public send(options?: GqlSendOptions<Response, Variables>): Subscription {
    return this.sendRequest(this.request(options), options);
  }
}
