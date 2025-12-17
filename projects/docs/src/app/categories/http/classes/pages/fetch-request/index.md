---
keyword: FetchRequestPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

> **NOTE**
> Перед ознакомлением с данным классом следует ознакомиться с работой родительских классов запросов `*ApiRequestPage` и `*CrudRequestPage`

Абстрактный класс, расширяющий родительский класс запроса `*CrudRequestPage`. Отвечает за создание запросов типа **[GET]**.

Функциональностью данного класса обладают следующие запросы: 

  - `GetRequest`
  - `CacheRequest`

## Интерфейс

```typescript
abstract class FetchRequest<Response = null> extends CrudRequest<Response> {
  // * Расширенные параметры
  constructor(urlOrMeta: FetchRequestMeta<Response, UrlOptions> | RequestUrl<UrlOptions>) {}

  // * Дополнительные свойства
  loaded: WritableSignal<boolean>;
  value: WritableSignal<Response>;

  // * Реализация абстрактных методов
  public request(opts?: FetchRequestOptions<Options>): Observable<Response>
  public send(opts?: FetchSendOptions<Response, Options>): Subscription 

  // * Методы с расширенным поведением 
  override clear(): void;
  override reset(): void;
}
```

## Параметры

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **urlOrMeta** | `string` \| `FetchRequestMeta` | `true` | [**`url`**](/http/classes/crud-request#работа-с-url) или мета информация для запроса |

## Дополнительные свойства

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **loaded** | `WritableSignal<boolean>` | `false` | Становится `true`, если был выполнен хотя бы один успешный запрос |
| **value** | `Signal<Response>` | `null` | Значение **response**. Обновляется при каждом, успешно выполненном, запросе |

## Расширенные методы

| Name | ReturnType | Description |
|----------|----------|----------|
| **clear** | `void` | Вызывает `clear` у `ApiRequest`, а так же сбрасывает значение `value` до значения по-умолчанию **initialValue** |
| **reset** | `void` | Вызывает текущий метод `clear`, а так же сбрасывает значение `loaded` до значения `false`  |

## Типы

### FetchRequestMeta

**Интерфейс**

```ts
type FetchRequestMeta<Response> = RequestMeta<Response> & {
  initialValue?: Response;
}
```

**Описание**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **initialValue** | `unknown` | `null` | `false` | <span class="tag" success>full</span> | Значение поля `value` по-умолчанию |

### FetchRequestOptions

Интерфейс и описание полей [тут](/http/classes/api-request#httpoptions)


### FetchSendOptions

Интерфейс и описание полей [тут](/http/classes/api-request#sendrequestoptions)