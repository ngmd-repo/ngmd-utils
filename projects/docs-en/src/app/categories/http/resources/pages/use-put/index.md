--- 
keyword: UsePutPage 
---

Imported from `@ngmd/utils/http`

---

## Description

This page describes how to create a **[PUT]** request.

## usePut

Function for creating a **[PUT]** request

**Interface**

```ts
function usePut<Body, Response = null, Options extends UrlOptions = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): PutRequest<Body, Response, Options>
```

## PutRequest

Class for **[PUT]** requests

**Interface**

```ts
class PutRequest<
  Body,
  Response = null,
  Options extends UrlOptions = null,
> extends CrudRequest<Response> {

  public request(body: Body, opts?: PutRequestOptions<Options>): Observable<Response>;

  public send(body: Body, opts?: PutSendOptions<Response, Options>): Subscription;
}
```

## Types

### PutRequestOptions

Interface and field descriptions [here](/http/classes/api-request#httpoptions)

### PutSendOptions

Interface and field descriptions [here](/http/classes/api-request#sendrequestoptions)

