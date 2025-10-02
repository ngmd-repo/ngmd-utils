---
keyword: HttpTypesPage
---

Импортируется из `@ngmd/utils/http`

---

## Типы

Далее будет перечислен список типов, обеспечивающих работу модуля `@ngmd/utils/http`

### TApiRequest

**Union** тип **http** запросов

```ts
type TApiRequest =   GetRequest
                   | CacheRequest
                   | PostRequest
                   | PatchRequest
                   | PutRequest
                   | DeleteRequest
                   | OperatorRequest;
```

### TObserver

Тип, с обработчиками результатов выполненного **http** запроса. 

Используется в рамках типа `ConnectionOptions`

```ts
type TObserver<Response> = {
  next?(response: Response): void;
  error?(error: HttpErrorResponse): void;
  complete?(): void;
  finalize?: () => void,
};
```



### ReloadConnection

Тип, принимающий запросы типа `TApiRequest`, у которых будет вызван метод [`reload`](/http/classes/api-request#reload), после успешного выполнения текущего **http** запроса. 

Используется в рамках типа `ConnectionOptions`

```ts
type ReloadConnection = {
  reload: TApiRequest | TRequiredArray<TApiRequest>;
}
```

### ConnectWith

Тип, с единственным методом **set**, который принимает результат выполненного **http** запроса. В качестве значения чаще всего используется `WritableSignal<Response>`

Используется в рамках типа `WithConnection` для изменения **value**.

```ts
type ConnectWith<Response> = {
  set(value: Response): void;
};
```

### WithConnection

Поле **with**, принимает значения типа `ConnectWith`, у которых будет вызываться метод `set` для обработки результата выполненного **http** запроса. 

Используется в рамках типа `ConnectionOptions`

```ts
type WithConnection<Response> = {
  with: ConnectWith<Response> | TRequiredArray<ConnectWith<Response>>;
};
```

### ConnectionOptions

Собирательный тип для обработки результатов **http** запроса. 

Используется в рамках типа `RequestConnection` и при вызове метода `connect` класса `*ApiRequestPage`. ([Подробности](/http/classes/api-request#connectionoptions))

```ts
type ConnectionOptions<Response> =  Partial<ReloadConnection> 
                                  & Partial<WithConnection<Response>> 
                                  & TObserver<Response>;
```

### RequestConnection

Содержит поле **connect**, с конфигурацией обработки **http** запроса типа `ConnectionOptions`.

Используется в рамках типов `RequestMeta`, `SetWithRequest` и при вызове метода [`send`](/http/classes/api-request#send) класса `*ApiRequestPage`

```ts
type RequestConnection<Response> = {
  connect?: ConnectionOptions<Response>;
};
```

### ConnectionRef

Возвращается при вызове метода [`disconnect`](/http/classes/api-request#disconnect)

```ts
type ConnectionRef = {
  disconnect(): void;
};
```



### DestroyConfig

Тип, описывающий стратегию сброса **http** запросов из типа `TApiRequest`.

Используется в рамках типа `OnDestroyOptions`

```ts
type DestroyConfig<T = boolean> = { abort?: T, reset?: T };
```

### OnDestroyOptions

Содержит поле **onDestroy**, с конфигурацией типа `DestroyConfig`

Используется в рамках типа `RequestMeta` и инжектировании `*ApiHubPage`

```ts
type OnDestroyOptions<T = boolean> = {
  onDestroy?: DestroyConfig<T>;
};
```








