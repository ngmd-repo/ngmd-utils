/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpOptionsMap, RequestConnection, RequestMeta } from '@ngmd/utils/http';

export type ParseGqlRequestVariables<Variables extends object = null> = Variables extends null
  ? {}
  : Partial<GqlRequestVariables<Variables>>;

export type GqlRequestVariables<Variables extends object = null> = {
  variables: Variables;
};

export type GqlHttpOptions = {
  httpOptions?: HttpOptionsMap['post'];
};

export type GqlBody<Type extends GqlRequestType, Variables extends object> = {
  query: Type;
  variables?: Variables;
};

export type GqlRequestOptions<Variables extends object = null> =
  ParseGqlRequestVariables<Variables> & {
    httpOptions?: HttpOptionsMap['post'];
  };
export type GqlSendOptions<
  Response,
  Variables extends object = null,
> = GqlRequestOptions<Variables> & RequestConnection<Response>;

export type GqlRequestMeta<Type extends GqlRequestType, Response> = RequestMeta<Response> & {
  query: GqlRequestString<Type>;
  url?: string;
};

export type GqlRequestType = 'mutation' | 'query';
export type GqlRequestString<T extends GqlRequestType> =
  `${string}${T} ${string}{${string}}${string}`;

export type ID<T extends number | string = string> = {
  id: T;
};
