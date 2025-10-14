---
keyword: CrudRequestPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

> **NOTE**
> Перед ознакомлением с данным классом следует ознакомиться с работой базового класса запросов `*ApiRequestPage`

Абстрактный класс, расширяющий базовый класс запроса `*ApiRequestPage`. Наследниками данного класса являются следующие запросы: 

  - `GetRequest`
  - `CacheRequest`
  - `PostRequest`
  - `PatchRequest`
  - `PutRequest`
  - `DeleteRequest`

Основной отличительной особенностью данного класса является то, что все его наследники при создании объекта запроса должны иметь обязательный параметр **url** адреса типа `RequestUrl` в качестве **meta** информации, по которому будет выполняться запрос к **api**

Каждый наследник `*CrudRequestPage` запроса имеет собственный набор *generic* параметров, расположенных по приоритету. Основные из них:

  - `Response` - возвращаемое значение запроса **(1)**
  - `Options` - параметры для формирования **url** перед выполнением запроса **(2)**

  ```typescript
    // Response
    interface IUser { /*...*/ } // (1)
    // Options
    type TGetUserParams = { id: string | number };
    type TGetUserUrlOpts = UrlOptions<TGetUserParams>; // (2)
    // Request
    const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}'); // (1, 2)
  ```

## Работа с url

Для всех наследников `*CrudRequestPage` при создании запроса всегда указывается обязательное поле **url**, по которому будет делаться запрос к **api**.

Значение **url** может создаваться при помощи следующих паттернов:

  - Значение с полноценным **endpoint**:
  ```ts
    useGet('https://some-api-host/users');
  ```

  - Значение с тегом для резолва в модуле [`@ngmd/utils/interceptor`](/interceptor/introduction):
  ```ts
    useGet('@/users');
  ```

Каждому варианту создания **url** доступна возможность использования динамических параметров. Параметры создаются при помощи двойной интерполяции.

Создание **url** c параметром `id`:

  ```ts
    useGet('@/users/{%raw%}{{id}}{%endraw%}');
  ```


Тип параметров запроса должен создаваться с помощью специального типа `UrlOptions`. <br/>
Данный тип принимает 2 необязательных *generic* объекта:
  
  - **Params**  - соответствует **params**, указываемым через интерполяцию `{%raw%}{{}}{%endraw%}`
  - **Query** - соответствует **queryParams**, указываемым после вопросительного знака `?`

Значение для параметров **url** передается в рамка объекта `urlOptions`. <br/>

Если используется *generic* значение для **Params**, тогда поле `urlOptions` становится обязательным для корректного выполнения запроса:

<span error class="icon-gap"><ng-doc-icon icon="x"></ng-doc-icon>**Неверно**</span>    

```typescript {3}
const getUser$: GetRequest<IUser> = useGet('@/users/{%raw%}{{id}}{%endraw%}');

getUser$.send();  // [GET][ERROR] https://some-api-host/users/{%raw%}{{id}}{%endraw%}
```

<span success class="icon-gap"><ng-doc-icon  icon="check"></ng-doc-icon>**Верно**</span> 

```typescript {1-2,8}
  type TGetUserParams = { id: string | number }; 
  type TGetUserUrlOpts = UrlOptions<TGetUserParams>;

  const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}');

  getUser$.send({
    urlOptions: {
      params: { id: '12345' },
    }
  });  // [GET] https://some-api-host/users/12345
```

> **Note**
> Поле **query** всегда будет опциональным, т.к. запрос может быть выполнен корректно и без них

Количество, как **Params**, так **Query** не ограничено:

  ```typescript {1-3,9-10}
    type TGetUserParams = { id: string, role: string }; // params
    type TGetUserQuery= { some: string }; // query
    type TGetUserUrlOpts = UrlOptions<TGetUserParams, TGetUserQuery>;

    const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}/{%raw%}{{role}}{%endraw%}');

    getUser$.send({
      urlOptions: {
        params: { id: '12345', role: 'Admin' },
        query: { some: 'query_param' } // Опциональное использование
      }
    });  // [GET] https://some-api-host/users/12345/Admin?some=query_param 
  ```

> **Note**
> Для более удобного извлечения параметров из **url** рекомендуется использовать `routeParams`, `routeQuery`, `routeQueryParams`, `getFromRoute`

Рекомендуемый стиль создания и именования типов для **urlOptions** представлен в вышеприведенных примерах.

## Интерфейс

```typescript
abstract class CrudRequest<Response = null> extends ApiRequest<Response> {
  protected override meta: CrudRequestMeta<Response> = null;

  // * Расширенные параметры
  constructor(urlOrMeta: CrudRequestMeta<Response> | RequestUrl) {}
}
```

## Параметры

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **meta** | `RequestUrl` \| `CrudRequestMeta` | `true` | [**`url`**](/http/classes/crud-request#работа-с-url) или мета информация для запроса |

## Типы

### CrudRequestMeta

**Интерфейс**

```ts
type CrudRequestMeta<
  Response,
  Options extends PartialUrlOptions = null,
> = RequestMeta<Response> &
  SendOptions<Response> & {
    url: RequestUrl<Options>;
  };  
```

**Описание**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **url** | `RequestUrl` | `null` | `true` | <span class="tag" success>full</span> | **url** адрес для выполнения запроса к **api** |
| **sendOptions** | `SendOptions<Response>` | `null` | `false` | <span class="tag" success>full</span> | Позволяет встраивать цепочку `pipe` из `rxjs` в процесс выполнения запроса |


### RequestUrl

Данный тип используется при создании запросов-наследников класса `*CrudRequestPage`, как единственный параметр функции или как поле `url` в типе `CrudRequestMeta`

**Интерфейс**

```ts
  export type RequestUrl<UrlOptions> = string | (injector?: Injector, urlOptions?: UrlOptions) => string;
```

**Описание**

| Value | Description |
|----------|----------|
| **string** | Строковое значение url адреса | 
| **(injector?: Injector, urlOptions?: UrlOptions) => string** | Функция, которая будет вызываться каждый раз при выполнении запроса для формирования url адреса. Функция в момент выполнения получает 2 параметра: текущий `Injector` и `UrlOptions`, с которыми был вызван запрос. При создании в рамках `ApiHub` это инжектор, в котором выполнялся provide класса запросов. В остальных случая, текущий `Injector` сервиса или компонента, в котором создан запрос |

**Использование**

- В `ApiHub`

  ```ts
    export class ExampleApiHub {
      // * Строковое значение url
      public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet('@/users/{%raw%}{{id}}{%endraw%}');

      // * Url функция
      public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet((injector: Injector, urlOptions: TGetUserUrlOptions) => `@/users/${urlOptions.params.id}`);

      // * В рамках объекта meta, как строковое значение
      public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet({
        url: '@/users/{%raw%}{{id}}{%endraw%}'
      });

      // * В рамках объекта meta, как url функция
      public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet({
        url: (injector: Injector, urlOptions: TGetUserUrlOptions) => {
          const {apiHost} = injector.get(ConfigService);

          return `${apiHost}/users/${urlOptions.params.id}`
        }
      });
    }

    type TUserParams = { id: number | string };
    type TGetUserUrlOptions = UrlOptions<TUserParams>;
  ```

### CrudRequestOptions

**Интерфейс**

```ts
type CrudRequestOptions = {
  urlOptions: UrlOptions,
  requestOptions?: HttpRequestOptions<HttpClientMethod>
}
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **urlOptions** | `UrlOptions` | `true` при наличии `urlOptions.params`, иначе `false` | [**`url`**](/http/classes/crud-request#работа-с-url) опции для выполнения запроса |
| **requestOptions** | `HttpRequestOptions<HttpClientMethod>` | `false` | Параметр `options`, одного из методов **get**, **post**, **patch**, **put**, **delete** класса `HttpClient` |

### UrlOptions

Отвечает за создание типизированных параметров **http** запроса.

Используется в рамках типа `HttpRequestUrlOptions`

```ts
type UrlOptions<Params, Query> = { params?: Params, query?: Query };
```

### RequestUrlOptions

Используется в рамках типов `RequestMeta` и при вызове метода [`send`](/http/classes/api-request#send) класса `*ApiRequestPage`

```ts
type RequestUrlOptions<T = UrlOptions> = {
  urlOptions: T;
}
```

### HttpClientRequestOptions

Содержит поле **requestOptions**, которое равно типу параметра `options` одного из методов **get**, **post**, **patch**, **put**, **delete** класса `HttpClient`.

Используется при вызове методов [`request`](/http/classes/api-request#request) и [`send`](/http/classes/api-request#send) у наследников класса класса `*CrudRequestPage`

```ts
type HttpClientRequestOptions = {
  requestOptions?: HttpRequestOptions<HttpClientMethod>;
};
```

### HttpClientMethod

Содержит ключ одного из методов **get**, **post**, **patch**, **put**, **delete** класса `HttpClient`, с которыми работает `CrudRequestPage`

```ts
type HttpClientMethod = Extract<
  HttpClient,
  'delete' | 'get' | 'patch' | 'post' | 'put'
>;
```

### HttpRequestOptions

Содержит `options` одного из методов **get**, **post**, **patch**, **put**, **delete** класса `HttpClient`.

```ts
type HttpRequestOptions<T extends HttpClientMethod> = HttpClient<T>[requestOptions]
```

**Использование**

```ts
const get$: GetRequest<IUser> = useGet('example-url');
const requestOptions: HttpRequestOptions<'get'> = {
  observe: 'events',
  reportProgress: true,
};

this.get$.request({ requestOptions }).subscribe(/**/)
// or
this.get$.send({ requestOptions });
```

### CrudSendOptions

Используется при вызове метода `send`

**Интерфейс**

```ts
type CrudSendOptions<Response> = {
  urlOptions: UrlOptions,
  connect?: ConnectionOptions<Response>,
  requestOptions?: HttpClient.MethodOptions,
  sendOptions?: {
    stream: SendOptionsPipe<Response>
  }
}
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **urlOptions** | `UrlOptions` | `true` при наличии `urlOptions.params`, иначе `false` | [**`url`**](/http/classes/crud-request#работа-с-url) опции для выполнения запроса |
| **connect** | `api-req-connect-options` | `false` | Объект, с обработчиками результатов запроса. [Подробности](/http/classes/api-request#connectionoptions) |
| **sendOptions** | `SendOptions<Response>` | `false` | Позволяет встраивать цепочку `pipe` из `rxjs` в процесс выполнения запроса |
| **requestOptions** | `HttpClient[MethodOptions]` | `false` | Параметр `options`, одного из методов **get**, **post**, **patch**, **put**, **delete** класса `HttpClient`  |


### SendOptions

**Интерфейс**

```ts
type SendOptions<Response> = {
  sendOptions?: {
    stream: SendOptionsPipe<Response>;
  };
}; 
```

**Описание**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **stream** | `SendOptionsPipe<Response>` | `null` | `false` | <span class="tag" success>full</span> | **RxJS** `pipe`, с цепочкой обработчиков, который будет встроен в процесс выполнения запроса |

**Использование**

```ts {7-9}
class ExampleComponent {
  private patchUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> = usePatch("@/users/{%raw%}{{id}}{%endraw%}");
  
  protected editUser(id: string, body: TUserCandidate): void {
    this.patchUser$.send(body, {
      urlOptions: { params: { id } },
      sendOptions: {
        stream: pipe(tap((user: IUser) => console.log(user))), // Вывести объект пользователя в консоль
      },
    });
  }
}
```

### SendOptionsPipe

Функция `pipe` из библиотеки RxJS

**Интерфейс**

```ts
export type SendOptionsPipe<Response> = OperatorFunction<any, Response>; 
```

