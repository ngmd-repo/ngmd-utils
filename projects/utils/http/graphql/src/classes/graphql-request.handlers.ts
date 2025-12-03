/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { inject } from '@angular/core';
import { assign, isJSType, isNullish } from '@ngmd/utils/handlers';

import { GQL_CONFIG } from '../providers/provide-gql/features/with-gql-config';
import { GqlRequestMeta, GqlRequestString, GqlRequestType } from './graphql-request.types';

function validateGqlMetaUrl(url: string): never | void {
  if (isNullish(url))
    throw new Error(
      'Url not found. Please use the "withGqlConfig" feature provider to register the url within the entire application or pass it as a parameter when creating your request.',
    );
}

function setupUrl(meta: GqlRequestMeta<GqlRequestType, any>): void {
  if (!meta.url) {
    const urlFromConfig: string = inject(GQL_CONFIG, { optional: true })?.url;

    meta.url = urlFromConfig;

    validateGqlMetaUrl(meta.url);
  }
}

export function setupGqlMeta<Type extends GqlRequestType, Response>(
  queryOrMeta: GqlRequestMeta<Type, Response> | GqlRequestString<GqlRequestType>,
): GqlRequestMeta<Type, Response> {
  const meta: GqlRequestMeta<Type, Response> = isJSType(queryOrMeta, 'string')
    ? ({ query: queryOrMeta } as GqlRequestMeta<Type, Response>)
    : assign(queryOrMeta);

  setupUrl(meta);

  return meta;
}

export function parseRequestOptions<T extends boolean | object>(candidate: T): T {
  return isJSType(candidate, 'boolean') ? ({} as T) : candidate;
}
