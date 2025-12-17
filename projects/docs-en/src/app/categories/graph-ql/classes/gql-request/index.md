---
keyword: GqlRequestPage
---

Imported from `@ngmd/utils/http/graphql`

---

## Description

> **NOTE**
> Before familiarizing yourself with this class, you should review the base request class `*ApiRequestPage`

Abstract class extending the base request class `*ApiRequestPage`. The following requests inherit from this class: 

  - `QueryRequest`
  - `MutationRequest`

## Interface

```ts
class GraphQLRequest<
  Type extends GqlRequestType,
  Response,
  Variables extends object = null,
> extends ApiRequest<Response> {
  constructor(queryOrMeta: GqlRequestMeta<Type, Response> | GqlRequestString<GqlRequestType> ) {}

  public request<T = Response>(options?: GqlRequestOptions<Variables>): Observable<T>;
  public send(options?: GqlSendOptions<Response, Variables>): Subscription;
}
```

**Description**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **meta** | `GqlRequestMeta<Type, Response> \| GqlRequestString<GqlRequestType>` | `null` | `true` | Meta information for GraphQL request |


## Types

### GqlRequestType

GraphQL request type

**Interface**

```ts
type GqlRequestType = 'mutation' | 'query';
```

### GqlRequestString

Query string type for GraphQL request

**Interface**

```ts
type GqlRequestString<T extends GqlRequestType> =
  `${string}${T} ${string}{${string}}${string}`
```

### GqlRequestMeta

Meta information for GraphQL request initialization

**Interface**

```ts
export type GqlRequestMeta<Type extends GqlRequestType, Response> = RequestMeta<Response> & {
  query: GqlRequestString<Type>;
  url?: string;
}; 
```

**Description**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **query** | `GqlRequestString` | `null` | `true` | <span class="tag" success>full</span> | String describing the GraphQL request |
| **url** | `string` | `null` | `false` | <span class="tag" success>full</span> | **url** address for executing the request to GraphQL server |

You can review the fields from the `RequestMeta` type by following this [link](/http/classes/api-request#requestmeta).

> **NOTE**
> The url field may be optional if you have registered the global configuration `withGqlConfig`, but it has the highest priority over the configuration.

### GqlRequestOptions

Object with request options

**Interface**

```ts
type GqlRequestOptions<Variables extends object = null> = {
  variables?: Variables;
  httpOptions?: HttpOptionsMap['post'];
};
```
**Description**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **variables** | `object` | `null` | `false` | Object with variables for GraphQL request |
| **httpOptions** | `string` | `null` | `false` | Options for *http* request of **[POST]** type. More details by [link](/http/classes/crud-request#httpoptions) |

> **NOTE**
> If the generic type `Variables` was not passed, then the `variables` field will be absent from the object. Strict typing is maintained.

### GqlSendOptions

Object with request parameters when sending.

```ts
type GqlSendOptions<
  Response,
  Variables extends object = null,
> = GqlRequestOptions<Variables> & RequestConnection<Response>;
```


