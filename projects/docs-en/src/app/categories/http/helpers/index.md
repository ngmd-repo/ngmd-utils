---
keyword: HttpHelpersPage
---

Imported from `@ngmd/utils/http`

---

## Description

A set of helper functions covering routine work.

## Functions

### routeParams 

Function for extracting **params** from `ActivatedRoute`

**Interface** 
```typescript
function routeParams<T extends object>(
  ...keys: Array<keyof T>
): { params: T }
```

**Usage** <span class="tag" warning>Injection context only</span>
```typescript 
  // Options
  type TGetUserParams = { id: string | number };
  type TGetUserUrlOpts = UrlOptions<TGetUserParams>;
  // Request
  const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet({
    url: '@/users/{%raw%}{{id}}{%endraw%}',
    force: { urlOptions: routeParams('id') },
  });
```

### routeQuery

Function for extracting **queryParams** from `ActivatedRoute`

**Interface**
```typescript
function routeQuery<T extends object>(
  ...keys: Array<keyof T>
): { query: T }
```

**Usage** <span class="tag" warning>Injection context only</span>
```typescript
  // Options
  type TGetUsersQuery = { skip: number, limit: number };
  type TGetUsersUrlOpts = UrlOptions<null, TGetUsersQuery>;
  // Request
  const getUsers$: GetRequest<IUser[], TGetUsersUrlOpts> = useGet({
    url: '@/users',
    force: { urlOptions: routeQuery('skip', 'limit') },
  });
```

### routeQueryParams

Function for extracting **params** and **queryParams** from `ActivatedRoute`

**Interface**
```typescript
function routeQueryParams<T extends { params: object; query: object }>(paramsKeys: Array<keyof T['params']>, queryKeys: Array<keyof T['query']>): T
```

**Usage** <span class="tag" warning>Injection context only</span>
```typescript
  // Options
  type TGetUserParams = { id: string | number };
  type TGetUserQuery = { some_query: string };
  type TGetUserUrlOpts = UrlOptions<TGetUserParams, TGetUserQuery>;
  // Request
  const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet({
    url: '@/users/{%raw%}{{id}}{%endraw%}',
    force: { urlOptions: routeQueryParams(['id'], ['some_query']) },
  });
```

### getFromRoute

Function for extracting **params** or **queryParams** from `ActivatedRoute`

**Interface**
```typescript
function getFromRoute<T extends object = ISimple<string>>(
  keys: TRequiredArray<keyof T>, 
  type: 'params' | 'query', // Extract from 'params' or 'queryParams'
  activatedRoute: ActivatedRoute,
): T 
```

**Usage**

```typescript
  // Options
  type TGetUserParams = { id: string | number };
  type TGetUserUrlOpts = UrlOptions<TGetUserParams>;

  @Component(...)
  class ExampleComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute); 
  // Request
  public getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}');

  public loadUser(): void {
    const params: TGetUserParams = getFromRoute(['id'], 'params', this.activatedRoute);

    this.getUser$.load({
      urlOptions: { params }
    }).subscribe((user: IUser) => {...})
  }
}
```

### toHttpHeaders

Function for creating an `HttpHeaders` object

**Interface**
```typescript
function toHttpHeaders(
  object: ISimple,
  headers: HttpHeaders = new HttpHeaders(),
): HttpHeaders
```

**Usage**

```typescript {9}
import { toHttpHeaders } from '@ngmd/utils/http';

@Component(/**/)
export class ExampleComponent {
  private getUsers$: GetRequest<IUser[]> = useGet({
    url: 'https://fakestoreapi.com/users',
    force: {
      requestOptions: {
        headers: toHttpHeaders({ "SOME_HEADER_KEY": "SOME_HEADER_VALUE" }),
      },
    },
  });
}
```

### toHttpParams

Function for creating *query* parameters object `HttpParams`

**Interface**
```typescript
function toHttpParams<T extends object>(query: T): HttpParams
```

**Usage**

```typescript {9}
import { toHttpParams } from '@ngmd/utils/http';

@Component(/**/)
export class ExampleComponent {
  private getUsers$: GetRequest<IUser[]> = useGet({
    url: 'https://fakestoreapi.com/users',
    force: {
      requestOptions: {
        params: toHttpParams({ skip: 1, limit: 20 }),
      },
    },
  });
}
```

### toHttpContext

Function for creating an `HttpContext` for an *http* request

**Interface**
```typescript
function toHttpContext<T extends object>(token: any, value: any): HttpContext
```

**Usage**

```typescript {10}
import { SKIP_REQUEST_MODIFICATION } from '@ngmd/utils/interceptor';
import { toHttpContext } from '@ngmd/utils/http';

@Component(/**/)
export class ExampleComponent {
  private getUsers$: GetRequest<IUser[]> = useGet({
    url: 'https://fakestoreapi.com/users',
    force: {
      requestOptions: {
        context: toHttpContext(SKIP_REQUEST_MODIFICATION, true),
      },
    },
  });
}
```

### getQueryParam

Function for extracting a *query* parameter by key from a *url* string

**Interface**
```typescript
function getQueryParam(paramKey: string, path: string = window.location.href): string
```

**Usage**

```typescript
import { getQueryParam } from '@ngmd/utils/http';

const url: string = 'https://some.api.host/users?role=Admin';

const role = getQueryParam('role', url); // "Admin"
```

### isExistQueryParams

Function for checking the presence of all provided *query* parameters in a *url* string

**Interface**
```typescript
function isExistQueryParams(params: string[], path: string = window.location.href): boolean
```

**Usage**

```typescript
import { isExistQueryParams } from '@ngmd/utils/http';

const url: string = 'https://some.api.host/users?role=Admin&lang=en';

const truthyValue: boolean = isExistQueryParams(['role', 'lang'], url); // "true"

const falsyValue: boolean = isExistQueryParams(['role', 'lang', 'not-exist-key'], url); // "false"
```

### makeURL

Function for creating a *url* string with parameters

**Interface**
```typescript
function makeURL(startUrl: string, query: ISimple, params?: ISimple): string
```

**Usage**

```typescript
import { makeURL } from '@ngmd/utils/http';

const startUrl: string = 'https://some.api.host/users/{%raw%}{{id}}{%endraw%}';
const params = { id: 123 }
const query = { role: "Admin" }

const url: string = makeURL(startUrl, query, params); // https://some.api.host/users/123?role=Admin
```

### getHostTag

Function for extracting the host tag from a *url* string

**Interface**
```typescript
function getHostTag(tagUrl: string): string;
```

**Usage**

```typescript
import { getHostTag } from '@ngmd/utils/http';

const url: string = '@host/users/create';
const tag: string = getHostTag('@host/users/create'); // "@host"
```