---
keyword: IntroductionPage
---

Imported from `@ngmd/utils/http`

[`Style guides`](/getting-started/style-guides#api)

---

## Description

This module provides automated interaction with the *backend* using a set of **CRUD** requests. The internal implementation uses the `HttpClient` from the `@angular/common/http` package.

## Key Aspects

Below are the main aspects of API interaction provided by the `@ngmd/utils/http` module.

### Requests

Currently, there are **7** types of requests:

  - <code info>`*UseGetPage`</code>  - **[GET]**
  - <code info>`*UseCachePage`</code> - **[GET]** *(with caching function)*
  - <code info>`*UsePostPage`</code> - **[POST]**
  - <code info>`*UsePatchPage`</code> - **[PATCH]**
  - <code info>`*UsePutPage`</code> - **[PUT]**
  - <code info>`*UseDeletePage`</code> - **[DELETE]**
  - <code info>`*UseOperatorPage`</code> - **[CUSTOM]**

All requests extend the base class <code info>`*ApiRequestPage`</code>, which provides a common set of methods and fields.

GET requests (<code info>`*UseGetPage`</code>, <code info>`*UseCachePage`</code>) extend the <code info>`*FetchRequestPage`</code> class (a descendant of <code info>`*CrudRequestPage`</code> and <code info>`*ApiRequestPage`</code>) with additional features.

The following request type also extends this class:

  - `*UseOperatorPage`

All requests have a set of entities for initialization and interaction, including:

  - **meta** information object for creating and managing the request **(1)**
  - Request type **(2)**
  - Request creation function **(3)**

  ```typescript name="resource.ts"
    const meta: GetRequestMeta<IUser[]> = {
      url: '@/users',
      force: true
    }; // (1)
    const getUsers$: GetRequest<IUser[]> = useGet(meta); // (2, 3)
  ```

Each request type has its own set of *generic* parameters, prioritized as follows. The main ones are:

  - `Response` - the return value of the request **(1)**

  ```typescript
    // Response
    interface IUser { /*...*/ } // (1)
    // Options
    type TGetUserParams = { id: string | number };
    type TGetUserUrlOpts = UrlOptions<TGetUserParams>; // (2)
    // Request
    const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}'); // (1, 2)
  ```

### Request Composition

To combine requests within a logical context, use `ApiHub`.
This allows you to store a set of requests within a single entity. `ApiHub` is used via **Angular DI**, enabling access to the state and management of each request from anywhere in the dependency tree. Example:

**Creation**  

```typescript name="users.api.hub.ts"
import {
  useGet,
  GetRequest,
  usePost,
  PostRequest,
  ...
} from '@ngmd/utils/http';
import { IUser, ... } from '../types';

export class UsersApiHub {
  public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet('@/users/{%raw%}{{id}}{%endraw%}');
  public postUser: PostRequest<TUserCandidate, IUser, TPostUserUrlOptions> = usePost('@/users');
  public putUser: PutRequest<TUserCandidate, IUser, TPutUserUrlOptions> = usePut('@/users/{%raw%}{{id}}{%endraw%}');
  public deleteUser: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{%raw%}{{id}}{%endraw%}');
}
```

**Usage in Parent** 

```typescript name="parent-example.component.ts" group="api-hub-parent" {9, 13, 16}
import { ApiHub, provideApiHub, useApiHub, routeParams } from '@ngmd/utils/http';
import { UsersApiHub } from './users.api.hub';
import { ChildExampleComponent } from '...';

@Component({
  // ...
  imports: [ChildExampleComponent],
  providers: [
    provideApiHub(UsersApiHub), // Provide
  ],
})
export class ParentExampleComponent {
  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub); // Inject

  constructor() {
    this.usersApiHub.getUser.send({ urlOptions: routeParams('id') }); // Usage
  }
}
```

```html name="parent-example.component.html" group="api-hub-parent"
Usage in parent:

@if(usersApiHub.getUser.loading()) {
  <span>Loading...</span>
} @else {
  <span>{%raw%}{{ usersApiHub.getUser.value().name }}{%endraw%}</span>
  <ng-child-example /> 
}
```

**Usage in Child** 

```typescript name="child-example.component.ts" group="api-hub-child" {9, 12}
import { ApiHub, useApiHub } from '@ngmd/utils/http';
import { UsersApiHub } from './users.api.hub';

@Component({
  // ...
  selector: "ng-child-example",
})
export class ChildExampleComponent {
  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub); // Inject

  protected deleteUser(id: string): void {
    this.usersApiHub.deleteUser.send({ urlOptions: { params: { id } } }); // Usage
  }
}
```

```html name="child-example.component.html" group="api-hub-child"
Usage in child:

@let user = usersApiHub.getUser.value();

<span>{{ user.email }}</span> 

<button (click)="deleteUser(user.id)">Delete User</button>
```

> **Note**
> Since `ApiHub` is used via **Angular DI**, you can have multiple instances of the same hub in different parts of your application if needed.

### OnDestroy

There are several ways to stop and reset request values.

**Automatic** <span class="tag" warning>Injection context only</span>

Configuration is set when creating the request and will be used automatically via `DestroyRef`:

```typescript {5-7}
@Component({...})
export class ExampleComponent {
  public getUsers$: GetRequest<IUser[]> = useGet({
    url: '@/users',
    onDestroy: {
      reset: true // Reset to default state and abort the request 
    }
  });
}
```

In `ApiHub`, you can also set a configuration that will be applied to selected or all requests:

```typescript {3-6}
export class ExampleComponent {
  private usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub, {
    onDestroy: {
      abort: true, // Stop all requests on ngOnDestroy
      reset: ['getUser'], // Reset to default state and abort the 'getUser' request
    },
  });
}
```

**Programmatic**

Called programmatically using available methods:

```typescript {6}
@Component(...)
export class ExampleComponent implements OnDestroy {
  protected usersService: UsersService = inject(UsersService);

  ngOnDestroy(): void {
    this.usersService.getUsers$.abort(); // Only stop the request
  }
}
```

In <code info>`*ApiHubPage`</code>, you can also programmatically reset:

```typescript {6-7}
@Component(...)
export class ExampleComponent implements OnDestroy {
  private usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);

  ngOnDestroy(): void {
    this.usersApiHub.hub.abort(); // Example, identical to automatic configuration above
    this.usersApiHub.hub.reset('getUser');
  }
}
```

### In-depth

For a deeper understanding of this module's capabilities, follow this sequence:

  - Study the base request class `*ApiRequestPage` 
  - Study the request class `*CrudRequestPage` 
  - Review the list of requests that directly inherit from `*CrudRequestPage`:  <code info>`*UsePostPage`</code>, <code info>`*UsePatchPage`</code>, <code info>`*UsePutPage`</code>, <code info>`*UseDeletePage`</code>
  - Study the **[GET]** request class `*FetchRequestPage`
  - Review the requests that directly inherit from `*FetchRequestPage`: <code info>`*UseGetPage`</code>, <code info>`*UseCachePage`</code>
  - Study the `OperatorRequest` class
  - Study <code info>`*ApiHubPage`</code>
  - Review the list of <code info>`*HttpHelpersPage`</code> functions 
  - Review the usage guide <code info>`*HttpUsagePage`</code>