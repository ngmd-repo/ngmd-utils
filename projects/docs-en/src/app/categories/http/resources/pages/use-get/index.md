---
keyword: UseGetPage
---

Imported from `@ngmd/utils/http`

---

## Description

This page describes how to work with a **[GET]** request.

## useGet

Function for creating a **[GET]** request

```ts
function useGet<Response, Options extends PartialUrlOptions = null>(
  meta: GetRequestMeta<Response, Options> | RequestUrl<UrlOptions>,
): GetRequest<Response, Options>
```

## GetRequest

Class for **[GET]** requests

**Interface**

```ts
class GetRequest<Response, Options extends UrlOptions = null> extends FetchRequest<
  Response,
  Options
> {
  // * Extended parameters
  constructor(urlOrMeta: GetRequestMeta<Response, Options> | RequestUrl<UrlOptions>) {}

  // * Additional methods
  public load(opts?: GetLoadOptions<Response, Options>): Promise<Response> | Observable<Response>
}
```

## Methods

| Name | ReturnType | Description |
|----------|----------|----------|
| **load** | `Promise<Response>` \| `Observable<Response>` | Makes a server request if the request object is **NOT** in `loaded` status and returns an async stream (type depends on **valueLike**) awaiting the result of this request. If the request object is in `loaded` status, the async stream returns the current `value`.<br>[Details](/http/resources/use-get#load) |

## Types

### GetRequestMeta

**Interface**

```ts
type GetRequestMeta<Response, Options extends UrlOptions = null> = FetchRequestMeta<Response> & {
  force?: true | ForceMetaOptions<Options>,
};
```

**Description**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **force** | `ForceMetaOptions` \| `boolean` | `false` | <span class="tag" warning>Injection context only</span> | Send an **http** request when the request object is created.<br>[Details](/http/resources/use-get#force) |

### ForceMetaOptions

**Interface**

```ts
type ForceMetaOptions<Options extends UrlOptions = null> = {
  urlOptions?: Options,
  httpOptions?: HttpClient?.GetMethodOptions,
};
```

### GetLoadOptions

**Interface**

```ts
type GetLoadOptions<Response = any, Options extends UrlOptions = null> = {
  urlOptions?: Options,
  httpOptions?: HttpClient?.GetMethodOptions,
  sendOptions?: {
    stream: SendOptionsPipe<Response>
  },
  valueLike?: 'observer' | 'promise'
};
```

## Use cases

### load

Using the `load` method can be useful in the following cases:

1.&nbsp;**Loading in** `ResolveFn`

This is needed when a route component requires data at render time.

```ts name="service.ts" group="load-resolve"
class UserService {
  public user$: GetRequest<IUser, UrlOptions<{id: string}>> = useGet("@/users/{%raw%}{{id}}{%endraw%}");
}
```

```ts name="resolver.ts" group="load-resolve"
const userResolver: ResolveFn<Hero>= (
  route: ActivatedRouteSnapshot,
): Observable<IUser> => {
  const id: string = route.paramMap.get('id');

  return inject(UserService).user$.load({ urlOptions: { params: { id } } });
};
```

```ts name="route.ts" group="load-resolve"
const routes: Routes = [
  {
    path: 'users/:id',
    component: UserComponent,
    resolve: {user: userResolver},
    providers: [UserService]
  }
];
```

```ts name="user.component.ts" group="load-resolve"
@Component({...})
class UserComponent {
  public user: IUser = inject(UserService).user$.value();  // Data loaded
}
```

<hr>

2.&nbsp;**Blocking code flow**

Sometimes you need to block further code execution until data is received. For this, you need to stop the current code flow, get the data, and then continue the scenario.

```ts name="service.ts" group="load-async"
class UserService {
  public user$: GetRequest<IUser, UrlOptions<{id: string}>> = useGet("@/users/{%raw%}{{id}}{%endraw%}");
}
```

```ts name="user.component.ts" group="load-async"
@Component({...})
class UserComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.loadUser();
  }

  private async loadUser(): Promise<void> {
    const id: string = this.route.snapshot.paramMap.get('id');
    const user: IUser = await this.userService.user$.load({
      urlOptions: { params: { id } },
      valueLike: 'promise',
    });

    console.log(user); // Data loaded
  }
}
```

### force

The `force` parameter is used when creating a `GetRequest` in the `GetRequestMeta` object.

When using this parameter, you are literally saying:

***Make an *http* request for data from the API when the request object is created***

This parameter automates the **http** request call when the component is initialized.

```ts {5, 11-13}
class UserComponent {
  // * Without parameters
  public users: GetRequest<IUser[]> = useGet({
    url: '@/users',
    force: true
  });

  // * With parameters
  public user$: GetRequest<IUser, UrlOptions<{id: string}>> = useGet({
    url: '@/users/{%raw%}{{id}}{%endraw%}',
    force: {
      urlOptions: routeParams('id'),
    },
  });
}
```

Now every time the component is created, the request will be executed.

> **WARNING**
> This parameter can only be used when creating a request in the `injection-context` or in the `force` field of the `ApiHubConfig` type.