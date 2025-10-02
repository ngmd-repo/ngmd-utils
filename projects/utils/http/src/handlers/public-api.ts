import {
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullish, replaceTags, selectObjectProps } from '@ngmd/utils/handlers';
import { ISimple } from '@ngmd/utils/interfaces';
import { TRequiredArray } from '@ngmd/utils/types';

export function getFromRoute<T extends object = ISimple<string>>(
  keys: TRequiredArray<keyof T>,
  type: 'params' | 'query',
  activatedRoute: ActivatedRoute,
): T {
  const paramsType = type === 'query' ? 'queryParams' : 'params';

  return selectObjectProps(activatedRoute.snapshot[paramsType], keys as string[]) as T;
}

export function routeParams<T extends object = ISimple<string>>(
  ...keys: TRequiredArray<keyof T>
): { params: T } {
  const activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  return {
    params: getFromRoute(keys, 'params', activatedRoute),
  };
}

export function routeQuery<T extends object = ISimple<string>>(
  ...keys: TRequiredArray<keyof T>
): { query: T } {
  const activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  return {
    query: getFromRoute(keys, 'query', activatedRoute),
  };
}

export function routeQueryParams<
  T extends { params: T['params']; query: T['query'] } = {
    params: any;
    query: any; // тупорылый ts не дает сделать норм
  },
>(paramsKeys: TRequiredArray<keyof T['params']>, queryKeys: TRequiredArray<keyof T['query']>): T {
  const activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  return {
    params: getFromRoute<T['params'] & object>(paramsKeys, 'params', activatedRoute),
    query: getFromRoute<T['query'] & object>(queryKeys, 'query', activatedRoute),
  } as unknown as T;
}

export function toHttpHeaders(
  object: ISimple,
  headers: HttpHeaders = new HttpHeaders(),
): HttpHeaders {
  const filledHeaders: HttpHeaders = Object.entries(object).reduce(
    (accum: HttpHeaders, [key, value]) => {
      accum = accum.append(key, String(value));

      return accum;
    },
    headers,
  );

  return filledHeaders;
}

export function toHttpParams<T extends object>(query: T): HttpParams {
  const params: HttpParams = new HttpParams({
    fromObject: query as HttpParamsOptions['fromObject'],
  });

  return params;
}

export function toHttpContext<T>(token: HttpContextToken<T>, ctx: T): HttpContext {
  return new HttpContext().set(token, ctx);
}

export function getQueryParam(paramKey: string, path: string = window.location.href): string {
  const url: URL = new URL(path);

  return url.searchParams.get(paramKey);
}

export function isExistQueryParams(params: string[], path: string = window.location.href): boolean {
  const url: URL = new URL(path);
  const isValidUrl: boolean = params.every((param: string) => url.searchParams.has(param));

  return isValidUrl;
}

export function makeURL(startUrl: string, query: ISimple, params?: ISimple): string {
  if (params) {
    startUrl = replaceTags(startUrl, params as ISimple<boolean | number | string>);
  }

  const url = new URL(startUrl);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (!isNullish(value)) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

export function getHostTag(tagUrl: string): string {
  const [tag] = tagUrl.split('/');

  return tag;
}

export function makeTagsURL(url: string, query: ISimple, params?: ISimple): string {
  if (params) {
    url = replaceTags(url, params as ISimple<boolean | number | string>);
  }

  if (query) {
    const queryParams: URLSearchParams = new URLSearchParams(query as ISimple<string>);

    url = `${url}?${queryParams.toString()}`;
  }

  return url;
}
