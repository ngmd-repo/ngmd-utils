import { signal, untracked, WritableSignal } from '@angular/core';
import { deepCopyWithGuard } from '@ngmd/utils/handlers';
import { Observable, Subscription } from 'rxjs';

import { ConnectionOptions } from '../../types';
import { PartialUrlOptions, RequestUrlOptions, TArgsWithoutBody } from '../crud';
import { CrudRequest } from '../crud/crud-request.class';
import { FetchRequestMeta, FetchRequestOptions, FetchSendOptions } from './fetch-request.types';

export abstract class FetchRequest<
  Response,
  Options extends PartialUrlOptions = null,
> extends CrudRequest<Response> {
  public loaded: WritableSignal<boolean> = signal(false);
  public value: WritableSignal<Response> = signal(this.initialValue);
  protected override meta: FetchRequestMeta<Response>;

  private get initialValue(): Response {
    return this.meta.initialValue ?? null;
  }

  public request(
    ...args: TArgsWithoutBody<FetchRequestOptions<Options>, Options>
  ): Observable<Response>;
  public request(opts?: FetchRequestOptions<Options>): Observable<Response> {
    const url: string = this.makeUrl((opts as RequestUrlOptions<Options>)?.urlOptions);

    return this.http.get<Response>(url, opts?.requestOptions);
  }

  public send(
    ...args: TArgsWithoutBody<FetchSendOptions<Response, Options>, Options>
  ): Subscription;
  public send(opts?: FetchSendOptions<Response, Options>): Subscription {
    return this.sendRequest(this.request(opts), opts);
  }

  protected override handleNext(response: Response, observer?: ConnectionOptions<Response>): void {
    let value: Response = deepCopyWithGuard(response);
    if (this.meta.transform) value = this.meta.transform(value);

    this.value.set(value);
    this.loaded.set(true);
    super.handleNext(response, observer);
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
    this.loaded.set(false);
  }
}
