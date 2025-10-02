---
keyword: CrudRequestPage
---

Imported from `@ngmd/utils/http`

---

## Description

> **NOTE**
> Before reviewing this class, you should familiarize yourself with the base request class `*ApiRequestPage`

An abstract class that extends the base request class `*ApiRequestPage`. The following requests inherit from this class:

  - `GetRequest`
  - `CacheRequest`
  - `PostRequest`
  - `PatchRequest`
  - `PutRequest`
  - `DeleteRequest`

The main distinguishing feature of this class is that all its descendants, when creating a request object, must have a required **url** parameter of type `RequestUrl` as **meta** information, which will be used to make the request to the **api**.

Each descendant of the `*CrudRequestPage` request has its own set of *generic* parameters, prioritized as follows. The main ones are:

  - `Response` - the return value of the request **(1)**
  - `Options` - parameters for forming the **url** before making the request **(2)**

  ```typescript
    // Response
    interface IUser { /*...*/ } // (1)
    // Options
    type TGetUserParams = { id: string | number };
    type TGetUserUrlOpts = UrlOptions<TGetUserParams>; // (2)
    // Request
    const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}'); // (1, 2)
  ```

## Working with url

For all descendants of `*CrudRequestPage`, when creating a request, the required **url** field must always be specified, which will be used to make the request to the **api**.

The **url** value can be created using the following patterns:

  - Value with a full **endpoint**:
  ```ts
    useGet('https://some-api-host/users');
  ```

  - Value with a tag for resolving in the [`@ngmd/utils/interceptor`](/interceptor/introduction) module:
  ```ts
    useGet('@/users');
  ```

Each variant of **url** creation supports dynamic parameters. Parameters are created using double interpolation.

Creating a **url** with the `id` parameter:

  ```ts
    useGet('@/users/{%raw%}{{id}}{%endraw%}');
  ```

The request parameters type should be created using the special type `UrlOptions`. <br/>
This type takes 2 optional *generic* objects:
  
  - **Params**  - corresponds to **params** specified via interpolation {%raw%}`{{}}`{%endraw%}
  - **Query** - corresponds to **queryParams** specified after the question mark `?`

The value for **url** parameters is passed in the `urlOptions` object. <br/>

If a *generic* value for **Params** is used, then the `urlOptions` field becomes required for the request to execute correctly:

<span error class="icon-gap"><ng-doc-icon icon="x"></ng-doc-icon>**Incorrect**</span>    

```typescript {3}
const getUser$: GetRequest<IUser> = useGet('@/users/{%raw%}{{id}}{%endraw%}');

getUser$.send();  // [GET][ERROR] https://some-api-host/users/{%raw%}{{id}}{%endraw%}
```

<span success class="icon-gap"><ng-doc-icon icon="check"></ng-doc-icon>**Correct**</span> 

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
> The **query** field is always optional, as the request can be executed correctly without it

The number of **Params** and **Query** is unlimited:

  ```typescript {1-3,9-10}
    type TGetUserParams = { id: string, role: string }; // params
    type TGetUserQuery= { some: string }; // query
    type TGetUserUrlOpts = UrlOptions<TGetUserParams, TGetUserQuery>;

    const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}/{%raw%}{{role}}{%endraw%}');

    getUser$.send({
      urlOptions: {
        params: { id: '12345', role: 'Admin' },
        query: { some: 'query_param' } // Optional usage
      }
    });  // [GET] https://some-api-host/users/12345/Admin?some=query_param 
  ```

> **Note**
> For easier extraction of parameters from **url**, it is recommended to use `routeParams`, `routeQuery`, `routeQueryParams`, `getFromRoute`

The recommended style for creating and naming types for **urlOptions** is shown in the examples above.

## Interface

```typescript
abstract class CrudRequest<Response = null> extends ApiRequest<Response> {
  protected override meta: CrudRequestMeta<Response> = null;

  // * Extended parameters
  constructor(urlOrMeta: CrudRequestMeta<Response> | RequestUrl) {}
}
```

## Parameters

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **meta** | `RequestUrl` \| `CrudRequestMeta` | `true` | [**`url`**](/http/classes/crud-request#working-with-url) or meta information for the request |

## Types

### CrudRequestMeta

**Interface**

```ts
type CrudRequestMeta<
  Response,
  Options extends PartialUrlOptions = null,
> = RequestMeta<Response> &
  SendOptions<Response> & {
    url: RequestUrl<Options>;
  };  
```

**Description**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **url** | `RequestUrl` | `null` | `true` | <span class="tag" success>full</span> | **url** address for making the **api** request |
| **sendOptions** | `SendOptions<Response>` | `null` | `false` | <span class="tag" success>full</span> | Allows embedding an `rxjs` `pipe` chain into the request execution process |


### RequestUrl

This type is used when creating requests inheriting from the `*CrudRequestPage` class, as the only parameter of the function or as the `url` field in the `CrudRequestMeta` type.

**Interface**

```ts
  export type RequestUrl<UrlOptions> = string | (injector?: Injector, urlOptions?: UrlOptions) => string;
```

**Description**

| Value | Description |
|----------|----------|
| **string** | String value of the url address | 
| **(injector?: Injector, urlOptions?: UrlOptions) => string** | Function called each time the request is executed to form the url address. The function receives 2 parameters: the current `Injector` and `UrlOptions` used for the request. When created within `ApiHub`, this is the injector where the request class was provided. In other cases, it is the current service or component injector where the request was created. |

**Usage**

- In `ApiHub`

  ```ts
    export class ExampleApiHub {
      // * String url value
      public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet('@/users/{%raw%}{{id}}{%endraw%}');

      // * Url function
      public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet((injector: Injector, urlOptions: TGetUserUrlOptions) => `@/users/${urlOptions.params.id}`);

      // * In meta object, as string value
      public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet({
        url: '@/users/{%raw%}{{id}}{%endraw%}'
      });

      // * In meta object, as url function
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

**Interface**

```ts
type CrudRequestOptions = {
  urlOptions: UrlOptions,
  requestOptions?: HttpClient.MethodOptions
}
```

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **urlOptions** | `UrlOptions` | `true` if `urlOptions.params` is present, otherwise `false` | [**`url`**](/http/classes/crud-request#working-with-url) options for executing the request |
| **requestOptions** | `HttpClient[MethodOptions]` | `false` | The `options` parameter of one of the **get**, **post**, **patch**, **put**, **delete** methods of the `HttpClient` class |

### UrlOptions

Responsible for creating typed parameters for **http** requests.

Used in the `HttpRequestUrlOptions` type

```ts
type UrlOptions<Params, Query> = { params?: Params, query?: Query };
```

### RequestUrlOptions

Used in the `RequestMeta` types and when calling the [`send`](/http/classes/api-request#send) method of the `*ApiRequestPage` class

```ts
type RequestUrlOptions<T = UrlOptions> = {
  urlOptions: T;
}
```

### HttpClientRequestOptions

Contains the **requestOptions** field, which is the type of the `options` parameter of one of the **get**, **post**, **patch**, **put**, **delete** methods of the `HttpClient` class.

Used when calling the [`request`](/http/classes/api-request#request) and [`send`](/http/classes/api-request#send) methods of classes inheriting from the `*CrudRequestPage` class

```ts
type HttpClientRequestOptions = {
  requestOptions?: HttpClient.MethodOptions;
};
```

### CrudSendOptions

Used when calling the `send` method

**Interface**

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

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **urlOptions** | `UrlOptions` | `true` if `urlOptions.params` is present, otherwise `false` | [**`url`**](/http/classes/crud-request#working-with-url) options for executing the request |
| **connect** | `api-req-connect-options` | `false` | Object with request result handlers. [Details](/http/classes/api-request#connectionoptions) |
| **sendOptions** | `SendOptions<Response>` | `false` | Allows embedding an `rxjs` `pipe` chain into the request execution process |
| **requestOptions** | `HttpClient[MethodOptions]` | `false` | The `options` parameter of one of the **get**, **post**, **patch**, **put**, **delete** methods of the `HttpClient` class  |

### SendOptions

**Interface**

```ts
type SendOptions<Response> = {
  sendOptions?: {
    stream: SendOptionsPipe<Response>;
  };
}; 
```

**Description**

| Name | Type | Default value | Required | Context | Description |
|----------|----------|----------|----------|----------|----------|
| **stream** | `SendOptionsPipe<Response>` | `null` | `false` | <span class="tag" success>full</span> | **RxJS** `pipe` with a chain of operators to be embedded in the request execution process |

**Usage**

```ts {7-9}
class ExampleComponent {
  private patchUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> = usePatch("@/users/{%raw%}{{id}}{%endraw%}");
  
  protected editUser(id: string, body: TUserCandidate): void {
    this.patchUser$.send(body, {
      urlOptions: { params: { id } },
      sendOptions: {
        stream: pipe(tap((user: IUser) => console.log(user))), // Log the user object to the console
      },
    });
  }
}
```

### SendOptionsPipe

RxJS `pipe` function

**Interface**

```ts
export type SendOptionsPipe<Response> = OperatorFunction<any, Response>; 
```


