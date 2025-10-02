---
keyword: UsePatchPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

На данной странице описан процесс взаимодействия с запросом типа **[PATCH]**

## usePatch

Функция создания **[PATCH]** запроса

**Интерфейс**

```ts
function usePatch<Body, Response = null, Options extends UrlOptions = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): PatchRequest<Body, Response, Options>
```

## PatchRequest

Класс **[PATCH]** запроса

**Интерфейс**

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

Интерфейс и описание полей [тут](/http/classes/api-request#httprequestoptions)


### PatchSendOptions

Интерфейс и описание полей [тут](/http/classes/api-request#sendrequestoptions)