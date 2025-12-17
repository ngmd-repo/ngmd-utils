/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
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

export type CrudSendOptions<Response, Options extends PartialUrlOptions> = HttpConfig &
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

export type HttpOptions = {
  headers?: HttpHeaders | Record<string, string[] | string>;
  context?: HttpContext;
  params?:
    | HttpParams
    | Record<string, ReadonlyArray<boolean | number | string> | boolean | number | string>;
  reportProgress?: boolean;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
  keepalive?: boolean;
  priority?: RequestPriority;
  cache?: RequestCache;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  integrity?: string;
  referrerPolicy?: ReferrerPolicy;
  timeout?: number;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  observe?: 'body' | 'events' | 'response';
};

export type HttpConfig = {
  httpOptions?: HttpOptions;
};

// ! Пока не удалять. Пришлось отключить типизацию ниже, т.к. TS поломал логику извлечения параметром Omit<Parameters<HttpClient['get']>[1], 'responseType' | 'observe'>

/* 
export type HttpOverrideOptionsType = {
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  observe?: 'body' | 'events' | 'response';
};

export type HttpClientMethod = TExtractKeys<
  HttpClient,
  'delete' | 'get' | 'patch' | 'post' | 'put'
>;
export type HttpClientMethodsOptions<T extends HttpClientMethod> = {
  get: Parameters<HttpClient['get']>[1];
  post: Parameters<HttpClient['post']>[2];
  patch: Parameters<HttpClient['patch']>[2];
  put: Parameters<HttpClient['put']>[2];
  delete: Parameters<HttpClient['delete']>[1];
}[T];

export type HttpRequestOptions<T extends HttpClientMethod> = HttpOverrideOptionsType &
  Omit<HttpClientMethodsOptions<T>, keyof HttpOverrideOptionsType>;

// ! I had to do this because Parameters overload Parameters<HttpClient['get']>[1], etc. returns only one value for the responseType and observe fields.
export type HttpOptionsMap = {
  get: HttpRequestOptions<'get'>;
  post: HttpRequestOptions<'post'>;
  patch: HttpRequestOptions<'patch'>;
  put: HttpRequestOptions<'put'>;
  delete: HttpRequestOptions<'delete'>;
};

// HttpClientRequestOptions HttpClientMethod HttpRequestOptions

*/

export type RequestUrlOptions<T extends PartialUrlOptions = PartialUrlOptions> = {
  urlOptions: PickUrlOptions<T>;
};

export type CrudRequestOptions<Options extends PartialUrlOptions> = HttpConfig &
  TUrlOptions<Options>;

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
