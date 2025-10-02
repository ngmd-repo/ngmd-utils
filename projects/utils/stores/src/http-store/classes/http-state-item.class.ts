/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Signal, signal, WritableSignal } from '@angular/core';
import { deepCopy } from '@ngmd/utils/handlers';
import { makeTagsURL } from '@ngmd/utils/http';
import { TIfElse } from '@ngmd/utils/types';
import { BehaviorSubject, filter, finalize, Observable, Subject, take, takeUntil } from 'rxjs';

import { RequestMeta, TRequestOptions } from '../models/request-meta.model';
import { HttpField, HttpRxField, THttpSetSettings } from '../types';

export class HttpStateItem<
  T extends RequestMeta = RequestMeta,
  SignalField = HttpField<T['settings']['initialValue'], T['settings']['options']>,
  RxField = HttpRxField<T['settings']['initialValue'], T['settings']['options']>,
> {
  private meta: T = null;
  private initiated: boolean = false;
  public loaded: boolean = false;
  private loading: WritableSignal<boolean> = signal(false);
  private error: WritableSignal<HttpErrorResponse> = signal(null);
  public value: WritableSignal<T['settings']['initialValue']> = signal(
    this.initialMeta.settings.initialValue,
  );
  private rxValue$: BehaviorSubject<T['settings']['initialValue']> = null;
  private abort$: Subject<void> = new Subject();
  private abort: () => void = () => this.abort$.next();
  private update: (options: T['settings']['options']) => void = (
    options: T['settings']['options'],
  ): void => {
    this.abort$.next();
    this.setOptions(options);
    this.sendRequest(this.meta.settings.url, options);
  };

  constructor(
    private initialMeta: T,
    private http: HttpClient,
  ) {
    this.resetMeta();
  }

  private resetMeta(): void {
    this.meta = deepCopy(this.initialMeta);
  }

  public reset(): void {
    this.initiated = false;
    this.loaded = false;
    this.loading.set(false);
    this.error.set(null);
    this.resetMeta();
    this.setValue(this.meta.settings.initialValue);
  }

  private sendRequest(
    url: string = this.meta.settings.url,
    options: TRequestOptions = this.meta.settings.options,
  ): void {
    url = makeTagsURL(url, options?.query, options?.params);

    this.abort();
    this.loading.set(true);
    this.initiated = true;

    const error = (err: HttpErrorResponse): void => this.error.set(err);
    const next = (response: T['settings']['initialValue']): void => {
      this.loaded = true;
      this.error.set(null);
      this.setValue(response);
    };

    this.http
      .get(url)
      .pipe(
        takeUntil(this.abort$),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({ next, error });
  }

  private sendRequestIfCan(): void {
    const { lazy } = this.meta.settings;

    if (!this.initiated && !lazy) this.sendRequest();
  }

  public setOptions(options: TRequestOptions, settings?: THttpSetSettings): void {
    const newMeta: T = deepCopy(this.initialMeta);

    (newMeta.settings.options as TRequestOptions) = options;

    this.meta = newMeta;

    if (settings?.sendRequest) this.sendRequest();
  }

  public setValue(value: T['settings']['initialValue']): void {
    this.value.set(value);
    this.rxValue$?.next(value);
  }

  private createField<
    V extends Observable<Value> | Signal<Value>,
    Value = T['settings']['initialValue'],
  >(value: V): TIfElse<V, Signal<Value>, SignalField, RxField> {
    return {
      value,
      error: this.error,
      loading: this.loading.asReadonly(),
      abort: this.abort,
      update: this.update,
    } as TIfElse<V, Signal<Value>, SignalField, RxField>;
  }

  // * Rx

  public getRxField(): RxField {
    this.checkAndCreateRxValue();
    this.sendRequestIfCan();

    return this.createField(this.rxValue$.asObservable());
  }

  private checkAndCreateRxValue(): void {
    if (!this.rxValue$) this.rxValue$ = new BehaviorSubject(this.value());
  }

  public selectFirstLoadedValue(): Observable<T['settings']['initialValue']> {
    this.checkAndCreateRxValue();

    if (!this.initiated) this.sendRequest();

    return this.rxValue$.pipe(
      filter(_ => this.loaded),
      take(1),
    );
  }

  // * Signal

  public getSignalField(): SignalField {
    this.sendRequestIfCan();

    return this.createField(this.value.asReadonly());
  }
}
