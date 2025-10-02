---
keyword: HttpHelpersPage
---

Импортируется из `@ngmd/utils/http`

---


## Описание

Набор функций хелперов, покрывающих рутинную работу 

## Функции

### routeParams 

Функция изъятия **params** из `ActivatedRoute`


**Интерфейс** 
```typescript
function routeParams<T extends object>(
  ...keys: Array<keyof T>
): { params: T }
```

**Использование** <span class="tag" warning>Injection context only</span>
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

Функция изъятия **queryParams** из `ActivatedRoute`

**Интерфейс**
```typescript
function routeQuery<T extends object>(
  ...keys: Array<keyof T>
): { query: T }
```

**Использование** <span class="tag" warning>Injection context only</span>
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

Функция изъятия **params** и **queryParams** из `ActivatedRoute`

**Интерфейс**
```typescript
function routeQueryParams<T extends { params: object; query: object }>(paramsKeys: Array<keyof T['params']>, queryKeys: Array<keyof T['query']>): T
```

**Использование** <span class="tag" warning>Injection context only</span>
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

Функция изъятия **params** или **queryParams** из `ActivatedRoute`

**Интерфейс**
```typescript
function getFromRoute<T extends object = ISimple<string>>(
  keys: TRequiredArray<keyof T>, 
  type: 'params' | 'query', // Достать из 'params' или 'queryParams'
  activatedRoute: ActivatedRoute,
): T 
```

**Использование**

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

Функция создания объекта заголовков `HttpHeaders`

**Интерфейс**
```typescript
function toHttpHeaders(
  object: ISimple,
  headers: HttpHeaders = new HttpHeaders(),
): HttpHeaders
```

**Использование**

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

Функция создания объекта *query* параметров `HttpParams`

**Интерфейс**
```typescript
function toHttpParams<T extends object>(query: T): HttpParams
```

**Использование**

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

Функция создания контекста `HttpContext` для *http* запроса 

**Интерфейс**
```typescript
function toHttpParams<T extends object>(query: T): HttpParams
```

**Использование**

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

Функция изъятия *query* параметра по ключу из *url* адреса

**Интерфейс**
```typescript
function getQueryParam(paramKey: string, path: string = window.location.href): string
```

**Использование**

```typescript
import { getQueryParam } from '@ngmd/utils/http';

const url: string = 'https://some.api.host/users?role=Admin';

const role = getQueryParam('role', url); // "Admin"
```

### isExistQueryParams

Функция проверки на наличие всех переданных *query* параметров в *url* адресе

**Интерфейс**
```typescript
function isExistQueryParams(params: string[], path: string = window.location.href): boolean
```

**Использование**

```typescript
import { isExistQueryParams } from '@ngmd/utils/http';

const url: string = 'https://some.api.host/users?role=Admin&lang=en';

const truthyValue: boolean = isExistQueryParams(['role', 'lang'], url); // "true"

const falsyValue: boolean = isExistQueryParams(['role', 'lang', 'not-exist-key'], url); // "false"
```

### makeURL

Функция создания строки *url* адреса с параметрами

**Интерфейс**
```typescript
function makeURL(startUrl: string, query: ISimple, params?: ISimple): string
```

**Использование**

```typescript
import { makeURL } from '@ngmd/utils/http';

const startUrl: string = 'https://some.api.host/users/{%raw%}{{id}}{%endraw%}';
const params = { id: 123 }
const query = { role: "Admin" }

const url: string = makeURL(startUrl, query, params); // https://some.api.host/users/123?role=Admin
```

### getHostTag

Функция изъятия host тэга из строки *url* адреса

**Интерфейс**
```typescript
function getHostTag(tagUrl: string): string;
```

**Использование**

```typescript
import { getHostTag } from '@ngmd/utils/http';

const url: string = '@host/users/create';
const tag: string = getHostTag('@host/users/create'); // "@host"
```