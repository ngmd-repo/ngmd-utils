---
keyword: ApiRequestPage
---

Imported from `@ngmd/utils/http`

---

## Description

An abstract class that provides a set of tools for working with **http** requests.

The following classes extend the behavior of this class:

  - `CrudRequest`
  - `FetchRequest`
  - `OperatorRequest`

The following requests use the functionality of this class:

  - `GetRequest`
  - `CacheRequest`
  - `PostRequest`
  - `PatchRequest`
  - `PutRequest`
  - `DeleteRequest`
  - `OperatorRequest`

## Interface

```typescript
abstract class ApiRequest<Response = null> {

  // * Parameters
  constructor(meta: RequestMeta<Response>) {}

  // * Properties
  loading: Signal<boolean>;
  error: Signal<HttpErrorResponse>;

  // * Methods
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

## Parameters

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **meta** | `RequestMeta` | `true` | Meta information for the request |

## Properties

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **loading** | `Signal<boolean>` | `false` | Loading status during **http** request execution |
| **error** | `Signal<HttpErrorResponse>` | `null` | Error in case of unsuccessful **http** request execution |

## Methods

| Name | ReturnType | Description |
|----------|----------|----------|
| **request** | `Observable<Response>` | Returns an **http** request for manual invocation and result handling.<br/>*Implemented in each request of type `TApiRequest`* |
| **send** | `Subscription` | Sends an **http** request.<br/>Each request is saved as **lastRequest**.<br/>*Implemented in each request of type `TApiRequest`*.  |
| **reload** | `void` | Repeats the last request executed by **send** |
| **connect** | `ConnectionRef` | Subscription for handling request results in various components and services |
| **disconnect** | `void` | Unsubscribes from the **connection** handler provided in the **meta** object when creating the request |
| **abort** | `void` | Aborts the **http** request execution |
| **clear** | `void` | Clears the **error** field if it contains an error |
| **reset** | `void` | Resets **lastRequest** to **null**, calls **abort**, **clear** methods  |
| **destroy** | `void` | Calls the **reset** method. Removes all **connection** subscriptions |

### request

Returns an `HttpClient` request for programmatic invocation.

Example with `PostRequest`:

**Interface**
```ts
  request(body: Body, opts?: PostRequestOptions<Options>): Observable<Response>;
```

**Usage**

```ts
class ExampleComponent {
  private postUser$: PostRequest<TUserCandidate, IUser> = usePost("@/users");
  
  protected createUser(body: TUserCandidate): void {
    this.postUser$.request(body, {
      requestOptions: {
        headers: toHttpHeaders({'X-Api-Key': 'YOUR_API_KEY'})
      }
    }).subscribe((user: IUser) => {...})
  }
}
```

### send

Sends an **http** request to the server.

Example with `PatchRequest`:

**Interface**
```ts
  send(body: Body, opts?: PatchSendOptions<Response, Options>): Subscription
```

**Usage**

```ts
class ExampleComponent {
  private patchUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> = usePatch("@/users/{%raw%}{{id}}{%endraw%}");
  
  protected editUser(body: TUserCandidate): void {
    this.patchUser$.send(body, {
      urlOptions: { params: { id: 1 } },
      connect: {
        next: (user: IUser) => console.log(user),
      },
      requestOptions: {
        /* HttpClient.PatchMethodOptions */
      },
      sendOptions: {
        stream: pipe(tap((user: IUser) => console.log(user))),
      },
    });
  }
}
```

**Notes**

> **NOTE**
> The `connect`, `sendOptions` handlers will be used only once for the triggered request

### reload

Executes an **http** request to the server with previous `urlOptions` and `requestOptions`.

**Interface**
```ts
  reload(): void
```

**Usage**

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
      connect: { next: () => this.getUsers$.reload() }, // Execute getUsers$ with the same query
      // or better
      reload: this.getUsers$, // Preferred usage
    });
  }
}
```

**Notes**

> **NOTE**
> If the request has never been made, calling `reload` will execute the request without parameters

### connect

The `connect` method is the most extensive for understanding, as it contains a wide range of functions for interacting with the request result.

All requests of type `TApiRequest` have it.

Use this method only within the `injection-context`.

The main goal is to allow consumer components to locally subscribe and handle request results.

**Interface**
```ts
  connect(connection: ConnectionOptions<Response>): ConnectionRef
```

The method takes one parameter `connection` of type `api-req-connect-options`, which is registered to handle request results. Each time the request is executed, the result will be handled by the registered `connection` handler.

The number of handlers for registration is unlimited.

Returns a `ConnectionRef` object for removing the registered handler.

Each registered handler can be removed in 2 ways (similar to `EffectRef`):

1.&nbsp;**Automatically**. Within the component's `OnDestroy` lifecycle hook.

2.&nbsp;**Programmatically**. By calling the `disconnect` method on the `ConnectionRef` object received during handler registration.

You can also register a handler in the `RequestMeta` type when creating the request. To remove such a handler, use the `disconnect` method of the request object.

Example with `DeleteRequest`:

**Usage**

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

Removes the `connection` handler declared in the meta object in the `RequestMeta` type when creating the request

**Interface**
```ts
  disconnect(): void
```

**Usage**

Example with `PatchRequest`:

```ts {5-7,16}
@Component(/**/)
class ExampleComponent {
  private editUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> = usePatch({
    url: "@/users/{%raw%}{{id}}{%endraw%}",
    connect: {
      next: this.afterEditUser  // Create connection on declaration, will work for all requests
    }
  });

  @Bind()
  private afterEditUser(): void {
    // Some logic after editUser$ request
  }

  private disconnectConfigFromMeta(): void {
    this.editUser$.disconnect(); // Disconnect connection from meta object declared on creation
  }
}
```

**Notes**

> **NOTE**
> If the `connection` handler was not specified on creation, calling the method will be ignored

### abort

Aborts the request execution

**Interface**
```ts
  abort(): void
```

**Usage**

Example with `GetRequest`:

```ts {6}
@Component(/**/)
class ExampleComponent {
  private getUser$: GetRequest<IUser, UrlOptions<{ id: string }>> = useGet("@/users/{%raw%}{{id}}{%endraw%}");

  private getUserById(id: string): void {
    if(this.getUser$.loading()) this.getUser$.abort(); // Abort request execution

     this.getUser$.send({ urlOptions: { params: { id } } });
  }
  
}
```

**Notes**

> **NOTE**
> If the request is not running, calling the method will be ignored

> **NOTE**
> For convenience, there is also a `switch` strategy that automates this process. [Details](/http/classes/api-request#requeststrategy)

### clear

Clears the `error` field if it contains an error

**Interface**
```ts
  clear(): void
```

**Notes**

> **NOTE**
> The `*FetchRequestPage` class and its descendants extend the behavior of this method, additionally clearing `value`

### reset

Calls the `clear`, `abort` methods and resets `lastRequest`, used in the `reload` method

**Interface**
```ts
  reset(): void
```

**Notes**

> **NOTE**
> The `*FetchRequestPage` class and its descendants extend the behavior of this method, setting the `loaded` field to `false`

### destroy

Calls the `reset` method and removes all registered `connections` handlers.

**Interface**
```ts
  destroy(): void
```

**Notes**

> **WARNING**
> Use this method only in exceptional situations and with full understanding of its application in a specific case

## Types

### RequestMeta

**Interface**

```ts
  type RequestMeta<Response> = {
    transform?: (response: any) => Response;
    strategy?: RequestStrategy;
    connect?: {
      with?: ConnectWith<Response> | Array<ConnectWith<Response>>,
      reload?: TApiRequest | Array<TApiRequest>
      next?: (response: Response) => void,
      error?: (error: HttpErrorResponse) => void,
      complete?: () => void,
      finalize?: () => void,
    },
    onDestroy?: {
      abort?: boolean,
      reset?: boolean
    }
  }
```

**Description**

| Name | Type | Required | Context* | Description |
|----------|----------|----------|----------|----------|
| **transform** | `(response: any) => Response` | `false` | <span class="tag" success>full</span> | Function to transform each *response* value |
| **strategy** | `RequestStrategy` | `false` | <span class="tag" success>full</span> | Strategy for repeated request execution. [Details](/http/classes/api-request#requeststrategy) |
| **connect** | `api-req-connect-options` | `false` | <span class="tag" warning>Injection context only</span> | Object with request result handlers. [Details](/http/classes/api-request#connectionoptions) |
| **onDestroy** | `api-req-destroy-cfg` | `false` | <span class="tag" warning>Injection context only</span> | Parameters for automatic request state reset when the component or service is destroyed. [Details](/http/classes/api-request#destroyconfig)  |

> **Warning** **Context\***<br>
> There are 2 contexts for creating a request: `injection-context` and `ApiHub`.<br>If <span class="tag" success>full</span> is specified, the property is available in both contexts.

### RequestStrategy

This type is used in the `strategy` field of `RequestMeta`. Allows you to control the strategy for the next request execution.

**Interface**

```ts
type RequestStrategy = 'merge' | 'switch';
```

**Description**

| Value | Description |
|----------|----------|
| **merge** | Does not abort the current request if it is active. Works like `mergeMap`. Is the **default** value | 
| **switch** | Calls the `abort` method, aborting the current request if it is active. Works like `switchMap` |

**Usage**

- <code info>merge</code>

  Execute all incoming requests to delete a user when clicking the button in the `ng-user` component.

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
      strategy: 'merge' // * Default value, can be omitted
    });

    protected deleteUserById(id: string): void {
      this.deleteUser$.send({ urlOptions: { params: { id } } });
    }
  }
  ```

- <code info>switch</code>

  Abort the request when clicking the button in the `ng-user` component, since only the latest value is needed.

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

**Interface**

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

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **with** | `ConnectWith<Response>`<br>or<br>`Array<ConnectWith<Response>>` | `false` | On successful request execution, calls the `set` method on each `ConnectWith` passing **response**  |
| **reload** | `TApiRequest \| Array<TApiRequest>` | `false` | On successful request execution, calls the `reload` method on the provided `TApiRequest` |
| **next** | `(response: Response) => void` | `false` | Works like `next` from `HttpClient`  |
| **error** | `(error: HttpErrorResponse): void` | `false` | Works like `error` from `HttpClient` |
| **complete** | `() => void` | `false` | Works like `complete` from `HttpClient` |
| **finalize** | `() => void` | `false` | Works like the `finalize` operator from `rxjs`. Called after the `loading` flag changes to `false` |

### DestroyConfig

Used when creating a request

**Interface**

```ts
type DestroyConfig = { abort?: boolean, reset?: boolean }
```

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **abort** | `() => void` | `false` | Calls the `abort` method on the request during `OnDestroy` |
| **reset** | `() => void` | `false` | Calls the `reset` method on the request during `OnDestroy` |