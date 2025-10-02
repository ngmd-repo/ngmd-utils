---
keyword: HttpTypesPage
---

Imported from `@ngmd/utils/http`

---

## Types

Below is a list of types that support the functionality of the `@ngmd/utils/http` module.

### TApiRequest

**Union** type for **http** requests

```ts
type TApiRequest =   GetRequest
                   | CacheRequest
                   | PostRequest
                   | PatchRequest
                   | PutRequest
                   | DeleteRequest
                   | OperatorRequest;
```

### TObserver

Type with handlers for the results of an **http** request.

Used in the `ConnectionOptions` type.

```ts
type TObserver<Response> = {
  next?(response: Response): void;
  error?(error: HttpErrorResponse): void;
  complete?(): void;
  finalize?: () => void,
};
```

### ReloadConnection

Type that accepts requests of type `TApiRequest`, for which the [`reload`](/http/classes/api-request#reload) method will be called after the current **http** request completes successfully.

Used in the `ConnectionOptions` type.

```ts
type ReloadConnection = {
  reload: TApiRequest | TRequiredArray<TApiRequest>;
}
```

### ConnectWith

Type with a single **set** method, which accepts the result of an **http** request. Most commonly, the value is a `WritableSignal<Response>`.

Used in the `WithConnection` type for updating **value**.

```ts
type ConnectWith<Response> = {
  set(value: Response): void;
};
```

### WithConnection

The **with** field accepts values of type `ConnectWith`, for which the `set` method will be called to handle the result of an **http** request.

Used in the `ConnectionOptions` type.

```ts
type WithConnection<Response> = {
  with: ConnectWith<Response> | TRequiredArray<ConnectWith<Response>>;
};
```

### ConnectionOptions

Aggregate type for handling **http** request results.

Used in the `RequestConnection` type and when calling the `connect` method of the `*ApiRequestPage` class. ([Details](/http/classes/api-request#connectionoptions))

```ts
type ConnectionOptions<Response> =  Partial<ReloadConnection> 
                                  & Partial<WithConnection<Response>> 
                                  & TObserver<Response>;
```

### RequestConnection

Contains the **connect** field with the configuration for handling an **http** request of type `ConnectionOptions`.

Used in the `RequestMeta`, `SetWithRequest` types and when calling the [`send`](/http/classes/api-request#send) method of the `*ApiRequestPage` class.

```ts
type RequestConnection<Response> = {
  connect?: ConnectionOptions<Response>;
};
```

### ConnectionRef

Returned when calling the [`disconnect`](/http/classes/api-request#disconnect) method.

```ts
type ConnectionRef = {
  disconnect(): void;
};
```

### DestroyConfig

Type describing the reset strategy for **http** requests of type `TApiRequest`.

Used in the `OnDestroyOptions` type.

```ts
type DestroyConfig<T = boolean> = { abort?: T, reset?: T };
```

### OnDestroyOptions

Contains the **onDestroy** field with configuration of type `DestroyConfig`.

Used in the `RequestMeta` type and when injecting `*ApiHubPage`.

```ts
type OnDestroyOptions<T = boolean> = {
  onDestroy?: DestroyConfig<T>;
};
```








