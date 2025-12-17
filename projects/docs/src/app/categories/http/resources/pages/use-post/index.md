---
keyword: UsePostPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

На данной странице описан процесс создания запроса типа **[POST]**

## usePost

Функция создания **[POST]** запроса

**Интерфейс**

```ts
function usePost<Body, Response = null, Options extends UrlOptions = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): PostRequest<Body, Response, Options>
```

## PostRequest

Класс **[POST]** запроса

**Интерфейс**

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

Интерфейс и описание полей [тут](/http/classes/api-request#httpoptions)


### PostSendOptions

Интерфейс и описание полей [тут](/http/classes/api-request#sendrequestoptions)