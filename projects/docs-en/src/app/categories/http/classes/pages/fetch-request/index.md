---
keyword: FetchRequestPage
---

Imported from `@ngmd/utils/http`

---

## Description

> **NOTE**
> Before reviewing this class, you should familiarize yourself with the parent request classes `*ApiRequestPage` and `*CrudRequestPage`

An abstract class that extends the parent request class `*CrudRequestPage`. Responsible for creating **[GET]** type requests.

The following requests use the functionality of this class:

  - `GetRequest`
  - `CacheRequest`

## Interface

```typescript
abstract class FetchRequest<Response = null> extends CrudRequest<Response> {
  // * Extended parameters
  constructor(urlOrMeta: FetchRequestMeta<Response, UrlOptions> | RequestUrl<UrlOptions>) {}

  // * Additional properties
  loaded: WritableSignal<boolean>;
  value: WritableSignal<Response>;

  // * Implementation of abstract methods
  public request(opts?: FetchRequestOptions<Options>): Observable<Response>
  public send(opts?: FetchSendOptions<Response, Options>): Subscription 

  // * Methods with extended behavior 
  override clear(): void;
  override reset(): void;
}
```

## Parameters

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **urlOrMeta** | `string` \| `FetchRequestMeta` | `true` | [**`url`**](/http/classes/crud-request#working-with-url) or meta information for the request |

## Additional properties

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **loaded** | `WritableSignal<boolean>` | `false` | Becomes `true` if at least one successful request has been made |
| **value** | `Signal<Response>` | `null` | **response** value. Updated on each successful request |

## Extended methods

| Name | ReturnType | Description |
|----------|----------|----------|
| **clear** | `void` | Calls `clear` from `ApiRequest`, and also resets the `value` to the default **initialValue** |
| **reset** | `void` | Calls the current `clear` method, and also resets the `loaded` value to `false`  |

## Types

### FetchRequestMeta

**Interface**

```ts
type FetchRequestMeta<Response> = RequestMeta<Response> & {
  initialValue?: Response;
}
```

**Description**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **initialValue** | `unknown` | `null` | `false` | <span class="tag" success>full</span> | Default value |

### FetchRequestOptions

Interface and field descriptions [here](/http/classes/api-request#httpoptions)

### FetchSendOptions

Interface and field descriptions [here](/http/classes/api-request#sendrequestoptions)