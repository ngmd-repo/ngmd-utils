---
keyword: UsePutPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

На данной странице описан процесс создания запроса типа **[PUT]**

## usePut

Функция создания **[PUT]** запроса

**Интерфейс**

```ts
function usePut<Body, Response = null, Options extends UrlOptions = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): PutRequest<Body, Response, Options>
```

## PutRequest

Класс **[PUT]** запроса

**Интерфейс**

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

Интерфейс и описание полей [тут](/http/classes/api-request#httpoptions)


### PutSendOptions

Интерфейс и описание полей [тут](/http/classes/api-request#sendrequestoptions)
