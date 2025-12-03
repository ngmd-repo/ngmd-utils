import { signal, untracked, WritableSignal } from '@angular/core';
import { deepCopyWithGuard } from '@ngmd/utils/handlers';
import { ConnectionOptions } from '@ngmd/utils/http';

import { GraphQLRequest } from '../../classes/graphql-request.class';
import { parseRequestOptions } from '../../classes/graphql-request.handlers';
import { GqlRequestString, GqlSendOptions } from '../../classes/graphql-request.types';
import { QueryRequestMeta } from './query.request.types';

export class QueryRequest<Response, Variables extends object = null> extends GraphQLRequest<
  'query',
  Response,
  Variables
> {
  public loaded: WritableSignal<boolean> = signal(false);
  public value: WritableSignal<Response> = signal(this.initialValue);
  protected override meta: QueryRequestMeta<Response, Variables>;
  private changedCacheOptions: GqlSendOptions<Response, Variables> = null;

  constructor(queryOrMeta: GqlRequestString<'query'> | QueryRequestMeta<Response, Variables>) {
    super(queryOrMeta);
    this.sendRequestIfForce();
  }

  private get initialValue(): Response {
    return this.meta.initialValue ?? null;
  }

  private sendRequestIfForce(): void {
    if (this.meta.force) this.sendForceRequest();
  }

  private sendForceRequest(): void {
    if (this.loading()) this.abort();

    const options = parseRequestOptions(this.meta.force);

    this.send(options as GqlSendOptions<Response, Variables>);
  }

  protected override handleNext(response: Response, observer?: ConnectionOptions<Response>): void {
    let value: Response = deepCopyWithGuard(response);
    if (this.meta.transform) value = this.meta.transform(value);

    this.value.set(value);
    this.loaded.set(true);
    super.handleNext(response, observer);
  }

  private sendCacheRequest(): void {
    if (!(this.loaded() || this.loading())) {
      const options = this.changedCacheOptions || parseRequestOptions(this.meta.cache);

      this.send(options as GqlSendOptions<Response, Variables>);
    }
  }

  public cache(): this {
    this.sendCacheRequest();

    return this;
  }

  public setCacheOptions(options: GqlSendOptions<Response, Variables>): void {
    this.changedCacheOptions = options;
  }

  public get(): Response {
    return untracked(this.value);
  }

  public override clear(): void {
    super.clear();
    this.value.set(this.initialValue);
  }

  public override reset(): void {
    super.reset();
    this.changedCacheOptions = null;
    this.loaded.set(false);
  }
}
