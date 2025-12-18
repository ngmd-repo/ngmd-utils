import { HttpErrorResponse } from '@angular/common/http';
import { isJSType } from '@ngmd/utils/handlers';
import { catchError, firstValueFrom, map, Observable, of, shareReplay, takeUntil, tap } from 'rxjs';

import { PartialUrlOptions, RequestUrl, TArgsWithoutBody } from '../../classes';
import { FetchRequest, FetchSendOptions } from '../../classes/fetch';
import type {
  GetLoadOptions,
  GetRequestMeta,
  LoadResult,
  LoadSubscription,
} from './get.request.types';

export class GetRequest<Response, Options extends PartialUrlOptions = null> extends FetchRequest<
  Response,
  Options
> {
  protected override meta: GetRequestMeta<Response>;
  private load$: Observable<LoadResult<Response>>;

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

  public load<Opts extends GetLoadOptions<Response, Options>>(
    ...opts: TArgsWithoutBody<Opts, Options>
  ): Opts['subLike'] extends 'promise'
    ? Promise<LoadResult<Response>>
    : Observable<LoadResult<Response>>;
  public load<Opts extends GetLoadOptions<Response, Options>>(
    opts?: Opts,
  ): Opts['subLike'] extends 'promise'
    ? Promise<LoadResult<Response>>
    : Observable<LoadResult<Response>> {
    if (opts?.repeat || !this.load$) {
      this.load$ = this.request(opts as unknown as FetchSendOptions<Response, Options>).pipe(
        takeUntil(this.abort$),
        map(response => ({ status: 'success', data: response }) as const),
        tap({
          next: ({ data }) => {
            this.value.set(data);
            this.error$.set(null);
          },
          error: ({ data }) => {
            this.value.set(null);
            this.error$.set(data);
          },
          finalize: () => this.loaded.set(true),
        }),
        catchError((e: HttpErrorResponse) => of({ status: 'failed', data: e } as const)),
        shareReplay(1),
      );
    }

    const request$ = opts?.subLike === 'promise' ? firstValueFrom(this.load$) : this.load$;

    return request$ as LoadSubscription<Opts, Response>;
  }

  public override clear(): void {
    this.load$ = null;
    super.clear();
  }

  public override reset(): void {
    this.load$ = null;
    super.reset();
  }
}
