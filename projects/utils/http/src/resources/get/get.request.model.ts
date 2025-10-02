import { toObservable } from '@angular/core/rxjs-interop';
import { isJSType } from '@ngmd/utils/handlers';
import { filter, firstValueFrom, Observable, take } from 'rxjs';

import { PartialUrlOptions, RequestUrl, TArgsWithoutBody } from '../../classes';
import { FetchRequest, FetchSendOptions } from '../../classes/fetch';
import { GetLoadOptions, GetLoadValue, GetRequestMeta } from './get.request.types';

export class GetRequest<Response, Options extends PartialUrlOptions = null> extends FetchRequest<
  Response,
  Options
> {
  protected override meta: GetRequestMeta<Response>;

  constructor(urlOrMeta: GetRequestMeta<Response, Options> | RequestUrl) {
    super(urlOrMeta);
    this.sendRequestIfForce();
  }

  private sendRequestIfForce(): void {
    const { force } = this.meta;

    if (force) {
      const options = (isJSType(force, 'boolean') ? null : force) as FetchSendOptions<
        Response,
        Options
      >;
      this.sendForceRequest(options);
    }
  }

  private sendForceRequest(options?: FetchSendOptions<Response, Options>): void {
    this.send(options);
  }

  private sendLoadRequest(opts: GetLoadOptions<Response, Options>): void {
    if (!(this.loading() || this.loaded()))
      this.send(opts as unknown as FetchSendOptions<Response, Options>);
  }

  public load<Opts extends GetLoadOptions<Response, Options>>(
    ...opts: TArgsWithoutBody<Opts, Options>
  ): GetLoadValue<Opts, Response>;
  public load<Opts extends GetLoadOptions<Response, Options>>(
    opts?: Opts,
  ): GetLoadValue<Opts, Response> {
    this.sendLoadRequest(opts);

    const request$: Observable<Response> = toObservable(this.value, {
      injector: this.context,
    }).pipe(filter(_ => this.loaded()));
    const value$ = (
      opts?.valueLike === 'promise' ? firstValueFrom(request$) : request$.pipe(take(1))
    ) as GetLoadValue<Opts, Response>;

    return value$;
  }
}
