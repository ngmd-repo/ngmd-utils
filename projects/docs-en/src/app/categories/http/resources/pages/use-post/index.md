--- 
keyword: UsePostPage 
---

Imported from `@ngmd/utils/http`

---

## Description

This page describes how to create a **[POST]** request.

## usePost

Function for creating a **[POST]** request

**Interface**

```ts
function usePost<Body, Response = null, Options extends UrlOptions = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): PostRequest<Body, Response, Options>
```

## PostRequest

Class for **[POST]** requests

**Interface**

```ts
class PostRequest<
  Body,
  Response = null,
  Options extends UrlOptions = null,
> extends CrudRequest<Response> {

  public request(body: Body, opts?: PostRequestOptions<Options>): Observable<Response>;

  public send(body: Body, opts?: PostSendOptions<Response, Options>): Subscription;
}
```

## Types

### PostRequestOptions

Interface and field descriptions [here](/http/classes/api-request#httpoptions)

### PostSendOptions

Interface and field descriptions [here](/http/classes/api-request#sendrequestoptions)