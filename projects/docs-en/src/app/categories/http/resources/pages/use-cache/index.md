--- 
keyword: UseCachePage 
---

Imported from `@ngmd/utils/http`

---

## Description

This page describes how to work with a **[GET]** request that supports data caching.

## useCache

Function for creating a **[GET]** request with data caching capability

```ts
function useCache<Response, Options extends UrlOptions = null>(
  meta: CacheRequestMeta<Response, Options> | RequestUrl<UrlOptions>,
): CacheRequest<Response, Options>
```

## CacheRequest

Class for **[GET]** requests with data caching capability

**Interface**

```ts
class CacheRequest<Response, Options extends UrlOptions = null> extends FetchRequest<
  Response,
  Options
> {
  // * Extended parameters
  constructor(urlOrMeta: CacheRequestMeta<Response, Options> | RequestUrl<UrlOptions>) {}

  // * Additional methods
  public setUrlOptions(params: SetUrlOptions<Response, Options>): void
  public cache(): this

  // * Methods with extended behavior
  public override reset(): void
}
```

## Methods

| Name | ReturnType | Description |
|----------|----------|----------|
| **setUrlOptions** | `void` | Saves **urlOptions** to be used in the `cache` method for the first request if data has not been loaded. The additional field `withRequest` allows you to preload data or replace it by making a request with new parameters. Can be used **only** if the request has `UrlOptions`. |
| **cache** | `this` | Initiates a request if data has not been loaded.<br> [Details](/http/resources/use-cache#cache)  |
| **reset** | `void` | Resets saved **urlOptions**. Calls **abort** and **clear** methods from the `FetchRequest` class. |

## Types

### CacheRequestMeta

**Interface**

```ts
type CacheRequestMeta<Response, Options extends UrlOptions = null> = FetchRequestMeta<Response> & {
  cache?: CacheMetaOptions<Options>
};
```

**Description**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **cache** | `CacheMetaOptions` | `null` | <span class="tag" success>full</span> | Options to be used when calling the **cache** method |

### CacheMetaOptions

**Interface**

```ts
type CacheMetaOptions<Options extends UrlOptions = null> = {
  urlOptions?: Options,
  httpOptions?: HttpOptions,
}
```

### SetWithRequest

**Interface**

```ts
type SetWithRequest<Response> = {
  withRequest: true | {
    httpOptions?: HttpOptions,
    connect?: ConnectionOptions<Response>
  }
};
```

### SetUrlOptions

**Interface**

```ts
type SetUrlOptions<Response, Options extends UrlOptions> = {
  urlOptions: Options,
  withRequest?: true | {
    httpOptions?: HttpOptions,
    connect?: ConnectionOptions<Response>
  }
};
```

## Use cases

### cache 

A distinctive feature of the `CacheRequest` type is the presence of the `cache` method. The principle of this method is simple:

***Make only one server request for data and then share it with all other consumers***

You can become a data consumer by calling the `cache` method. The single request for data will be made when the first subscriber uses the `cache` method. All others will wait for the request result and receive the data in the `value` field. The loading status will also be available in the `loading` field.

A simple example where this method is relevant:

A request for country codes for phone numbers used in form elements. You need to get the data only once and only if a component that uses them is rendered. There may be several components with such forms. To avoid writing logic that checks for an already executed request and received data, you can use the `cache` method.

**Implementation plan**

1. Create a service with a `CacheRequest` for getting phone codes.
2. Call the `cache` method of this request in consumer components.

**Implementation diagram** (zoomable)

![Cache method](assets/images/http/cache-method.jpg)

**Implementation via `ApiHub`**:

```ts name="cache.api.hub.ts" group="api-hub"
export class CacheHub {
  public countryCodes$: CacheRequest<ICountryCode[]> = useCache("@/country-codes");  
}
```

```ts name="component-1.ts" group="api-hub"
export class Component1 {
  public hub: ApiHub<CacheHub> = useApiHub(CacheHub, { cache: ["countryCodes$"] });  
}
```

```ts name="component-2.ts" group="api-hub"
export class Component2 {
  public hub: ApiHub<CacheHub> = useApiHub(CacheHub, { cache: ["countryCodes$"] }); 
}
```

```ts name="component-3.ts" group="api-hub"
export class Component3 {
  public hub: ApiHub<CacheHub> = useApiHub(CacheHub, { cache: ["countryCodes$"] });
}
```

> **NOTE**
> If needed, you can skip the config field with the request name and do this via direct call `hub.countryCodes$.cache()`

**Result**

The first rendered consumer component will make the request for data, all others will receive the result of the executed request in the `value` field.

**Notes**

> You can get the status of loaded data via the `loaded` field. The property is mutable. This means you can load data externally by changing the `value` field and setting `loaded` to `true`. In this case, the request will not be made, and consumer components will receive the current value.

> The `loaded` status is also affected by calling the `setUrlOptions` method with the `withRequest` field. It also sets `loaded` to `true` upon successful execution.

> The `reset` method sets `loaded` to `false`. This means the request will be made again by the next consumer component.

> Calling the `setUrlOptions` method without the `withRequest` field will set options for the first request. This is useful when the url uses parameters that need to be set for the request if a consumer component is rendered.

> To update data, you can also use the `send` method.


