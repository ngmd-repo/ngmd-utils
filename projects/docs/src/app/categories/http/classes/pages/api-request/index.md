---
keyword: ApiRequestPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

Абстрактный класс, который предоставляет набор инструментов для работы с **http** запросами.

Расширяют поведение данного класса следующие классы:

  - `CrudRequest`
  - `FetchRequest`
  - `OperatorRequest`

Функциональностью данного класса обладают следующие запросы: 

  - `GetRequest`
  - `CacheRequest`
  - `PostRequest`
  - `PatchRequest`
  - `PutRequest`
  - `DeleteRequest`
  - `OperatorRequest`

## Интерфейс

```typescript
abstract class ApiRequest<Response = null> {

  // * Параметры
  constructor(meta: RequestMeta<Response>) {}

  // * Свойства
  loading: Signal<boolean>;
  error: Signal<HttpErrorResponse>;

  // * Методы
  abstract request(...args: unknown[]): Observable<Response>;
  abstract send(...args: unknown[]): Subscription;

  reload(): void;
  connect(connection: ConnectionOptions<Response>): ConnectionRef;
  disconnect(): void;
  abort(): void;
  clear(): void;
  reset(): void;
  destroy(): void;
}
```

## Параметры

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **meta** | `RequestMeta` | `true` | Мета информация для запроса |

## Свойства

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **loading** | `Signal<boolean>` | `false` | Статус загрузки при выполнении **http** запроса |
| **error** | `Signal<HttpErrorResponse>` | `null` | Ошибка в случае неудачного выполнения **http** запроса |


## Методы

| Name | ReturnType | Description |
|----------|----------|----------|
| **request** | `Observable<Response>` | Возвращает **http** запрос для самостоятельного вызова и обратки результатов.<br/>*Реализуется в каждом запросе типа `TApiRequest`* |
| **send** | `Subscription` | Отправляет **http** запрос.<br/>Каждый запрос сохраняется, как **lastRequest**.<br/>*Реализуется в каждом запросе типа `TApiRequest`*.  |
| **reload** | `void` | Дублирует выполнение последнего запроса, вызванного методом **send** |
| **connect** | `ConnectionRef` | Подписка для обработки результатов запроса в различных компонентах и сервисах |
| **disconnect** | `void` | Отписывается от **connection** обработчика, переданного в объекте **meta** при создании запроса |
| **abort** | `void` | Прерывает выполнение **http** запроса |
| **clear** | `void` | Очищает поле **error**, если в нем есть ошибка |
| **reset** | `void` | Сбрасывает **lastRequest** в **null**, вызывает методы **abort**, **clear**  |
| **destroy** | `void` | Вызывает метод **reset**. Удаляет все **connection** подписки |

### request

Возвращает запрос `HttpClient` для программного вызова. 

Разберем на примере `PostRequest`

**Интерфейс**
```ts
  request(body: Body, opts?: PostRequestOptions<Options>): Observable<Response>;
```


**Использование**

```ts
class ExampleComponent {
  private postUser$: PostRequest<TUserCandidate, IUser> = usePost("@/users");
  
  protected createUser(body: TUserCandidate): void {
    this.postUser$.request(body, {
      httpOptions: {
        headers: toHttpHeaders({'X-Api-Key': 'YOUR_API_KEY'})
      }
    }).subscribe((user: IUser) => {...})
  }
}
```


### send

Отправляет **http** запрос на сервер

Разберем на примере `PatchRequest`

**Интерфейс**
```ts
  send(body: Body, opts?: PatchSendOptions<Response, Options>): Subscription
```

**Использование**

```ts
class ExampleComponent {
  private patchUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> = usePatch("@/users/{%raw%}{{id}}{%endraw%}");
  
  protected editUser(body: TUserCandidate): void {
    this.patchUser$.send(body, {
      urlOptions: { params: { id: 1 } },
      connect: {
        next: (user: IUser) => console.log(user),
      },
      httpOptions: {
        /* HttpOptions */
      },
      sendOptions: {
        stream: pipe(tap((user: IUser) => console.log(user))),
      },
    });
  }
}
```

**Нюансы**

> **NOTE**
> Обработчики `connect`, `sendOptions` будут использованы единожды в рамках вызванного запроса

### reload

Выполняет **http** запрос на сервер с предыдущими `urlOptions` и `httpOptions`  

**Интерфейс**
```ts
  reload(): void
```

**Использование**

```ts {21}
class ExampleComponent implements OnInit {
  protected getUsers$: GetRequest<IUser[], TGetUsersUrlOptions> = useGet({
    url: '@/users',
    onDestroy: {
      reset: true,
    },
  });
  protected deleteUser$: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{%raw%}{{id}}{%endraw%}');

  ngOnInit(): void {
    this.getUsers$.send({
      urlOptions: { query: { skip:0, limit: 20 } }
    })
  }

  public deleteUser(id: string): void {
    this.deleteUser$.send({
      urlOptions: { params: { id } },
      connect: { next: () => this.getUsers$.reload() }, // Выполнить getUsers$ с теми же query
      // or better
      reload: this.getUsers$, // Предпочтительное использование
    });
  }
}
```

**Нюансы**

> **NOTE**
> Если запрос не делался ни разу, то при вызове `reload` будет выполнен запрос без параметров

### connect

Метод `connect` является самым объемным для понимания, т.к. содержит в себе широкий набор функций для взаимодействия с результатом выполнения запроса.

Им обладают все запросы типа `TApiRequest`.

Использовать метод можно только в рамках `injection-context`.

Основная цель - позволить компонентам-потребителям локально подписываться и обрабатывать результаты выполнения запросов.

**Интерфейс**
```ts
  connect(connection: ConnectionOptions<Response>): ConnectionRef
```

Метод принимает один параметр `connection` типа `api-req-connect-options`, который регистрируется для обработки результатов запроса. При каждом выполнении запроса, результат выполнения будет обрабатываться зарегистрированными `connection` обработчиком.

Количество обработчиков для регистрации не ограничено.

Возвращает объект типа `ConnectionRef`, для удаления зарегистрированного обработчика

Каждый зарегистрированный обработчик может быть удален 2 способами (аналогично `EffectRef`):

1.&nbsp;**Автоматически**. В рамках хука `OnDestroy` жизненного цикла компонента.

2.&nbsp;**Программно**. Вызывая метод `disconnect` у объекта `ConnectionRef`, полученного при регистрации обработчика.

Зарегистрировать обработчик можно так же в рамках типа `RequestMeta` в момент создания запроса. Для удаления такого обработчика используется метод `disconnect` самого объекта запроса. 

Разберем на примере `DeleteRequest`

**Использование**

```ts name="service.ts" group="connect-method"
@Injectable()
class ExampleService {
  public deleteUser$: DeleteRequest<UrlOptions<{id: string}>> = useDelete("@/users/{%raw%}{{id}}{%endraw%}");
}
```

```ts name="component-1.ts" group="connect-method"
@Component(/**/)
class Component1 {
  private exampleService: ExampleService = inject(ExampleService);
  public deleteUserRef: ConnectionRef = this.exampleService.connect({
    next: () => {/**/}
  });
}
```

```ts name="component-2.ts" group="connect-method"
@Component(/**/)
class Component2 {
  private exampleService: ExampleService = inject(ExampleService);
  public deleteUserRef: ConnectionRef = this.exampleService.connect({
    error: (error: HttpErrorResponse) => {/**/}
  });
}
```

```ts name="component-3.ts" group="connect-method"
@Component(/**/)
class Component3 {
  private exampleService: ExampleService = inject(ExampleService);
  public deleteUserRef: ConnectionRef = this.exampleService.connect({
    complete: () => {/**/}
  });
}
```

### disconnect

Удаляет `connection` обработчик, объявленный в объекте meta в рамках типа`RequestMeta` при создании запроса

**Интерфейс**
```ts
  disconnect(): void
```

**Использование**

Разберем на примере `PatchRequest`

```ts {5-7,16}
@Component(/**/)
class ExampleComponent {
  private editUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> = usePatch({
    url: "@/users/{%raw%}{{id}}{%endraw%}",
    connect: {
      next: this.afterEditUser  // Создаем connection при объявлении, который будет отрабатывать для всех запросов
    }
  });

  @Bind()
  private afterEditUser(): void {
    // Some logic after editUser$ request
  }

  private disconnectConfigFromMeta(): void {
    this.editUser$.disconnect(); // Отключить connection из meta объекта, заданного при объявлении
  }
}
```

**Нюансы**

> **NOTE**
> Если `connection` обработчик не был указан при создании, то вызов метода будет проигнорирован

### abort

Прерывает выполнение запроса

**Интерфейс**
```ts
  abort(): void
```

**Использование**

Разберем на примере `GetRequest`

```ts {6}
@Component(/**/)
class ExampleComponent {
  private getUser$: GetRequest<IUser, UrlOptions<{ id: string }>> = useGet("@/users/{%raw%}{{id}}{%endraw%}");

  private getUserById(id: string): void {
    if(this.getUser$.loading()) this.getUser$.abort(); // Прервать выполнение запроса

     this.getUser$.send({ urlOptions: { params: { id } } });
  }
  
}
```

**Нюансы**

> **NOTE**
> Если запрос не выполняется, то вызов метода будет проигнорирован

> **NOTE**
> Для удобства использования, так же существует `switch` стратегия, автоматизирующая этот процесс. [Подробности](/http/classes/api-request#requeststrategy)

### clear

Очищает поле `error`, если в нем существует ошибка

**Интерфейс**
```ts
  clear(): void
```

**Нюансы**

> **NOTE**
> Класс `*FetchRequestPage` и соответственно его наследники, расширяют поведение данного метода, очищая дополнительно `value`

### reset

Вызывает методы `clear`, `abort`, а так же затирает `lastRequest`, используемый в рамках метода `reload`

**Интерфейс**
```ts
  reset(): void
```

**Нюансы**

> **NOTE**
> Класс `*FetchRequestPage` и соответственно его наследники, расширяют поведение данного метода, переводя значение поля `loaded` в `false`

### destroy

Вызывает метод `reset` и удаляет все зарегистрированные `connections` обработчики.

**Интерфейс**
```ts
  destroy(): void
```

**Нюансы**

> **WARNING**
> Использовать данный метод стоит только в исключительных ситуациях и при полном понимании его применения в конкретной ситуации 


## Типы

### RequestMeta

**Интерфейс**

```ts
  type RequestMeta<Response> = {
    transform?: (response: any) => Response;
    strategy?: RequestStrategy;
    connect?: {
      with?: ConnectWith<Response> | Array<ConnectWith<Response>>,
      reload?: TApiRequest | Array<TApiRequest>
      next?: (response: Response) => void,
      error?: (error: HttpErrorResponse) => void,
      complete?: () => void
      finalize?: () => void,
    },
    onDestroy?: {
      abort?: boolean,
      reset?: boolean
    }
  }
```

**Описание**

| Name | Type | Required | Context* | Description |
|----------|----------|----------|----------|----------|
| **transform** | `(response: any) => Response` | `false` | <span class="tag" success>full</span> | Функция, которая будет трансформировать каждое *response* значение |
| **strategy** | `RequestStrategy` | `false` | <span class="tag" success>full</span> | Стратегия при повторном вызове запроса. [Подробности](/http/classes/api-request#requeststrategy) |
| **connect** | `api-req-connect-options` | `false` | <span class="tag" warning>Injection context only</span> | Объект, с обработчиками результатов запроса. [Подробности](/http/classes/api-request#connectionoptions) |
| **onDestroy** | `api-req-destroy-cfg` | `false` | <span class="tag" warning>Injection context only</span> | Параметры для автоматического сброса состояния запроса при уничтожении компонента или сервиса. [Подробности](/http/classes/api-request#destroyconfig)  |

> **Warning** **Context\***<br>
> Всего  существует 2 контекста для создания запроса: `injection-context` и `ApiHub`.<br>Если указано <span class="tag" success>full</span>, то использование свойства доступно в обоих контекстах.

### RequestStrategy

Данный тип используется в рамках поля `strategy` типа `RequestMeta`. Позволяет управлять стратегией выполнения следующего запроса. 

**Интерфейс**

```ts
type RequestStrategy = 'merge' | 'switch';
```

**Описание**

| Value | Description |
|----------|----------|
| **merge** | Не прерывает выполнение текущего запроса, если он находится в активной фазе. Работает аналогично `mergeMap`. Является значением **по-умолчанию** | 
| **switch** | Вызывает метод `abort`, прерывая выполнение текущего запроса, если он находится в активной фазе. Работает аналогично `switchMap` |

**Использование**

- <code info>merge</code>

  Выполнять все поступающие запросы на удаление пользователя, при нажатии на кнопку в компоненте `ng-user`.

  ```ts {15}
  @Component({
    //...
    template: `
      @for(user of users; track $index) {
        <ng-user 
          [user] = "user" 
          (deleteUser) = "deleteUserById($event)" 
        />
      }
    `
  })
  export class ExampleComponent {
    private deleteUser$: DeleteRequest<TDeleteUserUrlOptions> = useGet({
      url: '@/users/{%raw%}{{id}}{%endraw%}',
      strategy: 'merge' // * Значение по-умолчанию, можно не указывать
    });

    protected deleteUserById(id: string): void {
      this.deleteUser$.send({ urlOptions: { params: { id } } });
    }
  }
  ```

- <code info>switch</code>

  Сбрасывать выполнение запроса при нажатии на кнопку в компоненте `ng-user`, т.к. нужно только последнее актуальное значение.

  ```ts {15}
  @Component({
    //...
    template: `
      @for(user of users; track $index) {
        <ng-user 
          [user] = "user" 
          (getUser) = "getUserById($event)" 
        />
      }
    `
  })
  export class ExampleComponent {
    private getUser$: GetRequest<IUser, TGetUserUrlOptions> = useGet({
      url: '@/users/{%raw%}{{id}}{%endraw%}',
      strategy: 'switch'
    });

    protected getUserById(id: string): void {
      this.getUser$.send({ urlOptions: { params: { id } } });
    }
  }
  ```

### ConnectionOptions

**Интерфейс**

```ts
type ConnectionOptions<Response> = {
    with?: ConnectWith<Response> | Array<ConnectWith<Response>>,
    reload?: TApiRequest | Array<TApiRequest>,
    next?: (response: Response) => void,
    error?: (error: HttpErrorResponse) => void,
    complete?: () => void,
    finalize?: () => void,
  }
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **with** | `ConnectWith<Response>`<br>or<br>`Array<ConnectWith<Response>>` | `false` | При успешном выполнении запроса, будет вызываться метод `set` у каждого `ConnectWith` с передачей **response**  |
| **reload** | `TApiRequest \| Array<TApiRequest>` | `false` | При успешном выполнении запроса, будет вызываться метод `reload` у переданных `TApiRequest` |
| **next** | `(response: Response) => void` | `false` | Работает аналогично `next` из `HttpClient`  |
| **error** | `(error: HttpErrorResponse): void` | `false` | Работает аналогично `error` из `HttpClient` |
| **complete** | `() => void` | `false` | Работает аналогично `complete` из `HttpClient` |
| **finalize** | `() => void` | `false` | Работает аналогично оператору `finalize` из `rxjs`. Вызывается после того, как флаг `loading` изменил значение на `false` |


### DestroyConfig

Используется при создании запроса

**Интерфейс**

```ts
type DestroyConfig = { abort?: boolean, reset?: boolean }
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **abort** | `() => void` | `false` | Вызывает метод `abort` у запроса при `OnDestroy` |
| **reset** | `() => void` | `false` | Вызывает метод `reset` у запроса при `OnDestroy` |