---
keyword: UseQueryPage
---

Imported from `@ngmd/utils/http/graphql`

---

## Description

This page describes the process of interacting with a **query** type request

## useQuery

Function for creating `QueryRequest`

**Interface**

```ts
function useQuery<Response, Variables extends object = null>(
  queryOrMeta: GqlRequestString<'query'> | QueryRequestMeta<Response, Variables>
): QueryRequest<Response, Variables>;
```

## QueryRequest

GraphQL **query** request class

**Interface**

```ts
export class QueryRequest<Response, Variables extends object = null> extends GraphQLRequest<
  'query',
  Response,
  Variables
> {
  // * Additional properties
  public loaded: WritableSignal<boolean> = signal(false);
  public value: WritableSignal<Response> = signal(this.initialValue);

  constructor(queryOrMeta: GqlRequestString<'query'> | QueryRequestMeta<Response, Variables>) {}

  // * Additional methods
  public get(): Response;
  public cache(): this;
  public setCacheOptions(options: GqlSendOptions<Response, Variables>): void;

  // * Methods with extended behavior 
  public override clear(): void;
  public override reset(): void;
}
```

### Additional properties

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **loaded** | `WritableSignal<boolean>` | `false` | Becomes `true` if at least one successful request was executed |
| **value** | `Signal<Response>` | `null` | **Response** value. Updated with each successfully executed request |

### Additional methods

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `void` | Returns `untracked` value of the `value` field |
| **cache** | `this` | Initiates a cached request if data has not been loaded.<br> [Details](/http/resources/use-cache#cache) |
| **setCacheOptions** | `void` | Overrides the `cache` field value from the `QueryRequestMeta` object. The `cache` method of the `QueryRequest` object will be called with this value. Use the `reset` method to return to the default state |

### Extended methods

| Name | ReturnType | Description |
|----------|----------|----------|
| **clear** | `void` | Calls `clear` on `ApiRequest`, and also resets the `value` to the default **initialValue** |
| **reset** | `void` | Calls the current `clear` method and resets the `loaded` value to `false`. Also returns the `cache` field options to the default state if they were overridden using the `setCacheOptions` method |

## Types

### QueryRequestMeta

Meta information for creating a request. Inherits fields from the `GqlRequestMeta` type

**Interface**

```ts
type QueryRequestMeta<Response, Variables extends object = null> = GqlRequestMeta<
  'query',
  Response
> & {
  cache?: GqlRequestOptions<Variables> | boolean;
  force?: GqlRequestOptions<Variables> | boolean;
  initialValue?: Response;
};
```

**Description**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **cache** | `GqlRequestOptions<Variables> \| boolean` | `null` | `false` | <span class="tag" success>full</span> | Object with parameters that will be used when the `cache` method works. Changed by the `setCacheOptions` method |
| **force** | `GqlRequestOptions<Variables> \| boolean` | `null` | `false` | <span class="tag" warning>Injection context only</span> | Send **graphql** request at the moment of creating the request object.<br>[Details](/http/resources/use-get#force) |
| **initialValue** | `unknown` | `null` | `false` | <span class="tag" success>full</span> | Default value of the `value` field |
