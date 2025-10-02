---
keyword: UseCachePage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

На данной странице описан процесс взаимодействия с запросом типа **[GET]** c возможностью кеширования данных

## useCache

Функция создания **[GET]** запроса с возможностью кэширования данных

```ts
function useCache<Response, Options extends UrlOptions = null>(
  meta: CacheRequestMeta<Response, Options> | RequestUrl<UrlOptions>,
): CacheRequest<Response, Options>
```

## CacheRequest

Класс **[GET]** запроса с возможностью кэширования данных

**Интерфейс**

```ts
class CacheRequest<Response, Options extends UrlOptions = null> extends FetchRequest<
  Response,
  Options
> {
  // * Расширенные параметры
  constructor(urlOrMeta: CacheRequestMeta<Response, Options> | RequestUrl<UrlOptions>) {}

  // * Дополнительные методы
  public setUrlOptions(params: SetUrlOptions<Response, Options>): void
  public cache(): this

  // * Методы с расширенным поведением
  public override reset(): void
}
```

## Методы

| Name | ReturnType | Description |
|----------|----------|----------|
| **setUrlOptions** | `void` | Сохраняет **urlOptions**, которые будут использованы в методе `cache` при первом запросе, если данные не были загружены. Доп. поле `withRequest`, позволяет загрузить данные заранее, либо их заменить при помощи запроса с новыми параметрами. Может использоваться **только** при наличии `UrlOptions` у запроса |
| **cache** | `this` | Инициирует запрос, если данные не были загружены.<br> [Подробности](/http/resources/use-cache#cache)  |
| **reset** | `void` | Сбрасывает сохраненные **urlOptions**. Вызывает методы **abort**, **clear** класса `FetchRequest` |

## Types

### CacheRequestMeta

**Интерфейс**

```ts
type CacheRequestMeta<Response, Options extends UrlOptions = null> = FetchRequestMeta<Response> & {
  cache?: CacheMetaOptions<Options>
};
```

**Описание**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **cache** | `CacheMetaOptions` | `null` | <span class="tag" success>full</span> | Опции, которые будут использованы при вызове метода **cache** |

### CacheMetaOptions

**Интерфейс**

```ts
type CacheMetaOptions<Options extends UrlOptions = null> = {
  urlOptions?: Options,
  requestOptions?: HttpClient.GetMethodOptions,
}
```

### SetWithRequest

**Интерфейс**

```ts
type SetWithRequest<Response> = {
  withRequest: true | {
    requestOptions?: HttpClient.GetMethodOptions,
    connect?: ConnectionOptions<Response>
  }
};
 
```

### SetUrlOptions

**Интерфейс**

```ts
type SetUrlOptions<Response, Options extends UrlOptions> = {
  urlOptions: Options,
  withRequest?: true | {
    requestOptions?: HttpClient.GetMethodOptions,
    connect?: ConnectionOptions<Response>
  }
};
```

## Use cases

### cache 

Отличительной особенностью запроса типа `CacheRequest` является наличие метода `cache`. Принцип работы метода очень простой:

***Сделать только одно обращение на сервер за данными и далее раздавать их всем остальным потребителям***

Стать потребителем данных можно, вызвав метод `cache`. Единственный запрос за данными будет сделан в момент первого подписчика, использовавшего метод `cache`. Все остальные дождутся результата запроса, и получат данные в поле `value`. Статус загрузки им будет так же доступен в поле `loading`. 

Простой пример, когда использование данного метода является актуальным:

Запрос за кодами стран для телефонных номеров, которые используются в элементах формы. Получить данные нужно единожды и только в том случае, если будет отрисован компонент, который их использует. Компонентов с такими формами может будет несколько. Как раз для избежания написания логики, которая будет проверять на наличие выполненного запроса и полученных данных, можно использовать метод `cache`.

**План реализации**

1. Создать сервис с `CacheRequest` запросом, для получения телефонных кодов.
2. Вызвать метод `cache` данного запроса в компонентах потребителях.

**Диаграмма реализации** (работает *zoom*) 

![Cache method](assets/images/http/cache-method.jpg)

**Реализация через `ApiHub`**:

```ts name="cache.api.hub.ts" group="api-hub"
export class CacheHub {
  public countryCodes$: CacheRequest<ICountryCode[]> = useCache("@/country-codes");  
}
```

```ts name="component-1.ts" group="api-hub"
export class Component1 {
  public hub: ApiHub<CacheHub> = useApiHub(CacheHub, { cache: ["countryCodes$"] });  
}
```

```ts name="component-2.ts" group="api-hub"
export class Component2 {
  public hub: ApiHub<CacheHub> = useApiHub(CacheHub, { cache: ["countryCodes$"] }); 
}
```

```ts name="component-3.ts" group="api-hub"
export class Component3 {
  public hub: ApiHub<CacheHub> = useApiHub(CacheHub, { cache: ["countryCodes$"] });
}
```

> **NOTE**
> В случае необходимости вы можете не использовать поле конфига с именем запроса и сделать это через прямое обращение `hub.countryCodes$.cache()`

**Итог**

Первый отрисованный компонент-потребитель сделает запрос за данными, все остальные будут получать результат выполненного запроса в поле `value`.

**Нюансы**

> Получить статус об загруженных данных можно через поле `loaded`. Свойство является изменяемым. Это означает, что вы можете загрузить данные сторонним образом, изменив значение поля `value` и установив `loaded` в значение `true`. В таком случае запрос за данными не будет выполнен, компоненты-потребители получат актуальное значение.

> Так же на статус `loaded` влияет вызова метода `setUrlOptions` с полем `withRequest`. Он так же меняет статус  `loaded` в `true` при успешном выполнении

> Метод `reset` меняет статус `loaded` в `false`. Это означает, что запрос будет сделан повторно следующим компонентом-потребителем

> Вызова метода `setUrlOptions` без поля `withRequest` установит опции для первого запроса. Это может быть актуально, когда в url адресе используются параметры, с которыми нужно будет сделать запрос, если компонент-потребитель будет отрисован.

> Для обновления данных можно так же использовать метод `send` 


