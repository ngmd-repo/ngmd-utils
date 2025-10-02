/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { OperatorFunction } from 'rxjs';

import { RequestConnection, RequestMeta } from '../../types';

export type CrudRequestMeta<
  Response,
  Options extends PartialUrlOptions = null,
> = RequestMeta<Response> &
  SendOptions<Response> & {
    url: RequestUrl<Options>;
  };

export type SendOptionsPipe<Response> = OperatorFunction<any, Response>;
export type SendOptions<Response> = {
  sendOptions?: {
    stream: SendOptionsPipe<Response>;
  };
};

export type CrudSendOptions<
  RequestType extends keyof HttpClientRequestOptionsMap,
  Response,
  Options extends PartialUrlOptions,
> = HttpClientRequestOptions<RequestType> &
  RequestConnection<Response> &
  SendOptions<Response> &
  TUrlOptions<Options>;

export type PartialUrlOptions<Params extends object = any, Query extends object = any> = {
  params?: Params;
  query?: Query;
};
export type UrlOptions<
  Params extends object = null,
  Query extends object = null,
> = (Params extends null ? {} : { params: Params }) & (Query extends null ? {} : { query: Query });
export type TUrlOptions<T extends PartialUrlOptions = null> = T extends null
  ? {}
  : T extends { params: object }
    ? RequestUrlOptions<T>
    : Partial<RequestUrlOptions<T>>;
export type PickUrlOptions<Options extends PartialUrlOptions = null> = Options extends {
  params: object;
  query: object;
}
  ? Partial<Pick<Options, 'query'>> & Pick<Options, 'params'>
  : Options extends { params: object }
    ? Pick<Options, 'params'>
    : Options extends { query: object }
      ? Pick<Options, 'query'>
      : {};

export type HttpClientRequestOptionsMap = {
  get: Parameters<HttpClient['get']>[1];
  post: Parameters<HttpClient['post']>[2];
  patch: Parameters<HttpClient['patch']>[2];
  put: Parameters<HttpClient['put']>[2];
  delete: Parameters<HttpClient['delete']>[1];
};

export type RequestUrlOptions<T extends PartialUrlOptions = PartialUrlOptions> = {
  urlOptions: PickUrlOptions<T>;
};

export type HttpClientRequestOptions<Type extends keyof HttpClientRequestOptionsMap> = {
  requestOptions?: HttpClientRequestOptionsMap[Type];
};

export type CrudRequestOptions<
  T extends keyof HttpClientRequestOptionsMap,
  Options extends PartialUrlOptions,
> = HttpClientRequestOptions<T> & TUrlOptions<Options>;

export type TArgsWithBody<
  Body,
  ReqOptions,
  Options extends PartialUrlOptions,
> = Options['params'] extends object
  ? [body: Body, opts: ReqOptions]
  : [body: Body, opts?: ReqOptions];

export type TArgsWithoutBody<
  ReqOptions,
  Options extends PartialUrlOptions,
> = Options['params'] extends object ? [opts: ReqOptions] : [opts?: ReqOptions];

export type RequestUrl<Options extends PartialUrlOptions = null> =
  | string
  | ((injector?: Injector, urlOptions?: Options) => string);
