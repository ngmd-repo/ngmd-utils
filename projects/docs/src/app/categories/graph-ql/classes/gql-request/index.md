---
keyword: GqlRequestPage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## Описание

> **NOTE**
> Перед ознакомлением с данным классом следует ознакомиться с работой базового класса запросов `*ApiRequestPage`

Абстрактный класс, расширяющий базовый класс запроса `*ApiRequestPage`. Наследниками данного класса являются следующие запросы: 

  - `QueryRequest`
  - `MutationRequest`

## Интерфейс

```ts
class GraphQLRequest<
  Type extends GqlRequestType,
  Response,
  Variables extends object = null,
> extends ApiRequest<Response> {
  constructor(queryOrMeta: GqlRequestMeta<Type, Response> | GqlRequestString<GqlRequestType> ) {}

  public request<T = Response>(options?: GqlRequestOptions<Variables>): Observable<T>;
  public send(options?: GqlSendOptions<Response, Variables>): Subscription;
}
```

**Описание**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **meta** | `GqlRequestMeta<Type, Response> \| GqlRequestString<GqlRequestType>` | `null` | `true` |  Мета информация для GraphQL запроса |


## Типы

### GqlRequestType

Тип GraphQL запроса

**Интерфейс**

```ts
type GqlRequestType = 'mutation' | 'query';
```

### GqlRequestString

Тип query строки для GraphQL запроса

**Интерфейс**

```ts
type GqlRequestString<T extends GqlRequestType> =
  `${string}${T} ${string}{${string}}${string}`
```

### GqlRequestMeta

Мета информация для инициализации GraphQL запроса

**Интерфейс**

```ts
export type GqlRequestMeta<Type extends GqlRequestType, Response> = RequestMeta<Response> & {
  query: GqlRequestString<Type>;
  url?: string;
}; 
```

**Описание**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **query** | `GqlRequestString` | `null` | `true` | <span class="tag" success>full</span> | Строка с описание GraphQL запроса |
| **url** | `string` | `null` | `false` | <span class="tag" success>full</span> | **url** адрес для выполнения запроса к серверу GraphQL |

С полями из типа `RequestMeta` можно ознакомиться по [ссылке](/http/classes/api-request#requestmeta).

> **NOTE**
> Поле url может быть не обязательным, если вы зарегистрировали глобальную конфигурацию `withGqlConfig`, но имеет высший приоритет относительно конфигурации.

### GqlRequestOptions

Объект с опциями запроса

**Интерфейс**

```ts
type GqlRequestOptions<Variables extends object = null> = {
  variables?: Variables;
  httpOptions?: HttpOptions;
};
```
**Описание**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **variables** | `object` | `null` | `false` |  Объект с переменными для GraphQL запроса |
| **httpOptions** | `HttpOptions` | `null` | `false` | Опции для *http* запроса типа **[POST]**. Подробнее по [ссылке](/http/classes/crud-request#httpoptions)  |

> **NOTE**
> Если generic тип `Variables` не был передан, то поле `variables` в объекте будет отсутствовать. Соблюдается строгая типизация.

### GqlSendOptions

Объект с параметрами запроса при отправке. 

```ts
type GqlSendOptions<
  Response,
  Variables extends object = null,
> = GqlRequestOptions<Variables> & RequestConnection<Response>;
```


