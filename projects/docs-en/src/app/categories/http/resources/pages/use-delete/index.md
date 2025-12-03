---
keyword: UseDeletePage
---

Imported from `@ngmd/utils/http`

---

## Description

This page describes how to create a **[DELETE]** request.

## useDelete

Function for creating a **[DELETE]** request

**Interface**

```ts
function useDelete<Options extends PartialUrlOptions = null, Response = null, Body = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): DeleteRequest<Options, Response, Body>
```

## DeleteRequest

Class for **[DELETE]** requests

**Interface**

```ts
class DeleteRequest<
  Options extends PartialUrlOptions = null,
  Response = null,
  Body = null,
> extends CrudRequest<Response> {

  public request(opts?: DeleteRequestOptions<Options>): Observable<Response>;

  public send(opts?: DeleteSendOptions<Options, Response, Body>): Subscription;
}
```

> **NOTE**
> The **Body** generic allows you to type the request body in the *body* field of the *httpOptions* options object.

## Types

### DeleteRequestOptions

Interface and field descriptions [here](/http/classes/api-request#httprequestoptions)

### DeleteSendOptions

Interface and field descriptions [here](/http/classes/api-request#sendrequestoptions)

