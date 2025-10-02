---
keyword: UsePatchPage
---

Imported from `@ngmd/utils/http`

---

## Description

This page describes how to work with a **[PATCH]** request.

## usePatch

Function for creating a **[PATCH]** request

**Interface**

```ts
function usePatch<Body, Response = null, Options extends UrlOptions = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): PatchRequest<Body, Response, Options>
```

## PatchRequest

Class for **[PATCH]** requests

**Interface**

```ts
class PatchRequest<
  Body,
  Response = null,
  Options extends UrlOptions = null,
> extends CrudRequest<Response> {

  public request(body: Body, opts?: PatchRequestOptions<Options>): Observable<Response>

  public send(body: Body, opts?: PatchSendOptions<Response, Options>): Subscription
}
```

## Types

### PatchRequestOptions

Interface and field descriptions [here](/http/classes/api-request#httprequestoptions)

### PatchSendOptions

Interface and field descriptions [here](/http/classes/api-request#sendrequestoptions)