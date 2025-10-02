/* eslint-disable @typescript-eslint/naming-convention */
import { HttpErrorResponse } from '@angular/common/http';
import { Signal, WritableSignal } from '@angular/core';
import { TIfElse } from '@ngmd/utils/types';
import { Observable } from 'rxjs';

import { HttpStateItem } from '../classes/http-state-item.class';
import { RequestMeta, TRequestOptions } from '../models/request-meta.model';

export type THttpMetaStore<T> = {
  [K in keyof T]: RequestMeta<unknown, unknown>;
};

export type HttpFieldByValue<Value, Params extends TRequestOptions<any> = null> = {
  value: Value;
  error: WritableSignal<HttpErrorResponse>;
  loading: Signal<boolean>;
  abort: () => void;
  update: TIfElse<Params, null, () => void, (params: Params) => void>;
};

/**
 * @deprecated use @ngmd/requests
 */
export type HttpField<Value, Params extends TRequestOptions<any> = null> = HttpFieldByValue<
  Signal<Value>,
  Params
>;

/**
 * @deprecated use @ngmd/requests
 */
export type HttpRxField<Value, Params extends TRequestOptions<any> = null> = HttpFieldByValue<
  Observable<Value>,
  Params
>;

export type THttpState<T extends THttpMetaStore<T>> = {
  [K in keyof T]: HttpStateItem<RequestMeta & T[K]>;
};

export type THttpValuesStore<T extends THttpMetaStore<T>> = {
  [K in keyof T]: T[K]['settings']['initialValue'];
};

export type THttpSelectRxOptions = {
  onlyValue: boolean;
};

export type THttpSelectOptions<StoreValue, TransformValue> = {
  onlyValue?: boolean;
  transform?(param: StoreValue): TransformValue;
};

export type THttpSetSettings = {
  sendRequest: boolean;
};

export type THttpLoadedValueType = 'observer' | 'promise';
