---
keyword: UseQueryPage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## Описание

На данной странице описан процесс взаимодействия с запросом типа **query**

## useQuery

Функция создания `QueryRequest` 

**Интерфейс**

```ts
function useQuery<Response, Variables extends object = null>(
  queryOrMeta: GqlRequestString<'query'> | QueryRequestMeta<Response, Variables>
): QueryRequest<Response, Variables>;
```

## QueryRequest

Класс GraphQL запроса **query** 

**Интерфейс**

```ts
export class QueryRequest<Response, Variables extends object = null> extends GraphQLRequest<
  'query',
  Response,
  Variables
> {
  // * Дополнительные свойства
  public loaded: WritableSignal<boolean> = signal(false);
  public value: WritableSignal<Response> = signal(this.initialValue);

  constructor(queryOrMeta: GqlRequestString<'query'> | QueryRequestMeta<Response, Variables>) {}

  // * Дополнительные методы
  public get(): Response;
  public cache(): this;
  public setCacheOptions(options: GqlSendOptions<Response, Variables>): void;

  // * Методы с расширенным поведением 
  public override clear(): void;
  public override reset(): void;
}
```

### Дополнительные свойства

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **loaded** | `WritableSignal<boolean>` | `false` | Становится `true`, если был выполнен хотя бы один успешный запрос |
| **value** | `Signal<Response>` | `null` | Значение **response**. Обновляется при каждом, успешно выполненном, запросе |

### Дополнительные методы

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `void` | Возвращает `untracked` значение поля `value` |
| **cache** | `this` | Инициирует кэшированный запрос, если данные не были загружены.<br> [Подробности](/http/resources/use-cache#cache) |
| **setCacheOptions** | `void` | Переопределяет значение поля `cache` из объекта `QueryRequestMeta`. С этим значением будет вызван метода `cache` объекта запроса `QueryRequest`. Для сброса к состоянию по-умолчанию используется метод `reset`  |

### Расширенные методы

| Name | ReturnType | Description |
|----------|----------|----------|
| **clear** | `void` | Вызывает `clear` у `ApiRequest`, а так же сбрасывает значение `value` до значения по-умолчанию **initialValue** |
| **reset** | `void` | Вызывает текущий метод `clear` и сбрасывает значение `loaded` до значения `false`. Так же возвращает к состоянию по-умолчанию опции поля `cache`, если они были переопределены с помощью метода `setCacheOptions` |

## Types

### QueryRequestMeta

Мета информация для создания запроса. Наследует поля типа `GqlRequestMeta`

**Интерфейс**

```ts
type QueryRequestMeta<Response, Variables extends object = null> = GqlRequestMeta<
  'query',
  Response
> & {
  cache?: GqlRequestOptions<Variables> | boolean;
  force?: GqlRequestOptions<Variables> | boolean;
  initialValue?: Response;
};
```

**Описание**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **cache** | `GqlRequestOptions<Variables> \| boolean` | `null` | `false` | <span class="tag" success>full</span> | Объект с параметрами, которые будут использованы при работе метода `cache`. Изменяется методом `setCacheOptions` |
| **force** | `GqlRequestOptions<Variables> \| boolean` | `null` | `false` | <span class="tag" warning>Injection context only</span> | Отправить **graphql** запрос в момент создания объекта запроса.<br>[Подробности](/http/resources/use-get#force)  |
| **initialValue** | `unknown` | `null` | `false` | <span class="tag" success>full</span> | Значение поля `value` по-умолчанию |
