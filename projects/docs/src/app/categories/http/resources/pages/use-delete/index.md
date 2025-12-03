---
keyword: UseDeletePage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

На данной странице описан процесс создания запроса типа **[DELETE]**

## useDelete

Функция создания **[DELETE]** запроса

**Интерфейс**

```ts
function useDelete<Options extends PartialUrlOptions = null, Response = null, Body = null>(
  meta: RequestMeta<Response> | RequestUrl<UrlOptions>,
): DeleteRequest<Options, Response, Body>
```

## DeleteRequest

Класс **[DELETE]** запроса

**Интерфейс**

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
> Дженерик **Body** позволяет протипизировать тело запроса в рамках поля *body* объекта опций  *httpOptions*

## Types

### DeleteRequestOptions

Интерфейс и описание полей [тут](/http/classes/api-request#httprequestoptions)


### DeleteSendOptions

Интерфейс и описание полей [тут](/http/classes/api-request#sendrequestoptions)

