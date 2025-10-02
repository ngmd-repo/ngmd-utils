import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injector, Signal, signal, WritableSignal } from '@angular/core';
import { wrapToArray } from '@ngmd/utils/handlers';
import { TRequiredArray } from '@ngmd/utils/types';
import { finalize, Observable, Subject, Subscription, takeUntil } from 'rxjs';

import {
  ConnectionOptions,
  ConnectionRef,
  ConnectWith,
  DestroyConfig,
  ReloadConnection,
  RequestMeta,
  RequestSendOptions,
  TApiRequest,
  WithConnection,
} from '../types';

export abstract class ApiRequest<Response = null> {
  protected context: Injector = inject(Injector);
  protected http: HttpClient = inject(HttpClient);
  private lastRequest$: Observable<Response> = null;
  protected connections: Set<ConnectionOptions<Response>> = new Set();
  protected abort$: Subject<void> = new Subject();
  protected loading$: WritableSignal<boolean> = signal(false);
  protected error$: WritableSignal<HttpErrorResponse> = signal(null);
  public loading: Signal<boolean> = this.loading$.asReadonly();
  public error: Signal<HttpErrorResponse> = this.error$.asReadonly();

  constructor(protected meta: RequestMeta<Response>) {
    this.init();
  }

  public abstract request(...args: unknown[]): Observable<Response>;
  public abstract send(...args: unknown[]): Subscription;

  protected init(): void {
    if (this.meta.onDestroy) this.initDestroy(this.meta.onDestroy);
    if (this.meta.connect) this.connect(this.meta.connect);
  }

  private initDestroy(config: DestroyConfig): void {
    const { abort, reset }: DestroyConfig = config;

    this.context.get(DestroyRef).onDestroy(() => {
      if (abort) this.abort();
      if (reset) this.reset();
    });
  }

  private executeWith(response: Response, connectWith: WithConnection<Response>['with']): void {
    connectWith = wrapToArray(connectWith) as TRequiredArray<ConnectWith<Response>>;

    connectWith.forEach(item => item.set(response));
  }

  private executeReload(reload: ReloadConnection['reload']): void {
    reload = wrapToArray(reload) as TRequiredArray<TApiRequest>;

    reload.forEach(request => request.reload());
  }

  private handleConnection(response: Response, connect?: ConnectionOptions<Response>): void {
    if (connect?.with) this.executeWith(response, connect?.with);
    if (connect?.reload) this.executeReload(connect.reload);
    connect?.next?.(response);
  }

  public reload(): void {
    const request$: Observable<Response> = this.lastRequest$ || this.request();

    this.sendRequest(request$);
  }

  protected handleStrategy(): void {
    switch (this.meta.strategy) {
      case 'switch': {
        this.abort();
        break;
      }
    }
  }

  protected sendRequest(
    request$: Observable<Response>,
    opts?: RequestSendOptions<Response>,
  ): Subscription {
    this.handleStrategy();

    this.loading$.set(true);
    this.lastRequest$ = request$;

    return request$
      .pipe(
        takeUntil(this.abort$),
        finalize(() => this.handleFinalize(opts?.connect)),
      )
      .subscribe({
        next: (response: Response) => this.handleNext(response, opts?.connect),
        error: (error: HttpErrorResponse) => this.handleError(error, opts?.connect),
        complete: () => this.handleComplete(opts?.connect),
      });
  }

  protected handleNext(response: Response, connect?: ConnectionOptions<Response>): void {
    this.error$.set(null);

    if (this.meta.transform) response = this.meta.transform(response);

    this.handleConnection(response, connect);

    this.connections.forEach((connection: ConnectionOptions<Response>) =>
      this.handleConnection(response, connection),
    );
  }

  protected handleReload(reloadRequests: TApiRequest | TRequiredArray<TApiRequest>): void {
    reloadRequests = wrapToArray(reloadRequests) as TRequiredArray<TApiRequest>;

    reloadRequests.forEach(req => req.reload());
  }

  protected handleError(error: HttpErrorResponse, observer?: ConnectionOptions<Response>): void {
    this.error$.set(error);
    observer?.error?.(error);

    this.connections.forEach((connection: ConnectionOptions<Response>) => {
      connection.error?.(error);
    });
  }

  protected handleComplete(observer?: ConnectionOptions<Response>): void {
    observer?.complete?.();

    this.connections.forEach((connection: ConnectionOptions<Response>) => {
      connection.complete?.();
    });
  }

  protected handleFinalize(observer?: ConnectionOptions<Response>): void {
    this.loading$.set(false);
    observer?.finalize?.();
    this.connections.forEach((connection: ConnectionOptions<Response>) => {
      connection.finalize?.();
    });
  }

  public connect(connection: ConnectionOptions<Response>): ConnectionRef {
    const destroyRef: DestroyRef = inject(DestroyRef);
    const disconnect = (): void => this.disconnectObserver(connection);

    this.connections.add(connection);
    destroyRef.onDestroy(disconnect);

    return { disconnect };
  }

  public disconnect(): void {
    if (this.connections.has(this.meta?.connect)) this.disconnectObserver(this.meta?.connect);
  }

  protected disconnectObserver(observer: ConnectionOptions<Response>): void {
    this.connections.delete(observer);
  }

  public abort(): void {
    this.abort$.next();
  }

  public clear(): void {
    this.error$.set(null);
  }

  public reset(): void {
    this.lastRequest$ = null;
    this.abort();
    this.clear();
  }

  public destroy(): void {
    this.reset();
    this.connections.clear();
  }
}
