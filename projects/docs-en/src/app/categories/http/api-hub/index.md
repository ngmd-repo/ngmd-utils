---
keyword: ApiHubPage
---

Imported from `@ngmd/utils/http`

---

## Description

Manager for combining and centralized storage of requests with shared access via DI. Extends the hub class with the manager property **hub** using the manager class `ApiHubManager`, providing additional methods for general management of the class.

**Interface**

```ts
type ApiHub<Hub extends TApiHub<Hub>> = Hub & {
  hub: ApiHubManager<Hub>;
}
```

## Providers

### provideRootApiHub

Provider for registering the root hub class

```ts
function provideRootApiHub<Hub extends TApiHub>(Hub: TConstructor<Hub>): Provider
```

> **NOTE**
> Used to register classes whose requests are needed throughout the entire application

### useRootApiHub

Function for injecting the root hub class

```ts
function useRootApiHub<Hub extends TApiHub<Hub>>(config?: ApiHubConfig<Hub>): ApiHub<Hub> 
```

### provideApiHub

Provider for registering a module hub class

```ts
function provideApiHub<Hub extends TApiHub>(Hub: TConstructor<Hub>): Provider
```

### useApiHub

Function for injecting a module hub class

```ts
function useApiHub<Hub extends TApiHub<Hub>>(
  Hub: TConstructor<Hub>,
  config?: ApiHubConfig<Hub>,
): ApiHub<Hub> 
```

## ApiHubManager

Manager class for handling the hub class. Created as the **hub** field in the `ApiHub` type.

**Interface**

```ts
class ApiHubManager<Hub extends TApiHub<Hub>> { 
  public get<K extends Array<keyof Hub<FetchRequest>>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] };
  public abort(...keys: Array<keyof Hub>): void;
  public clear(...keys: Array<keyof Hub>): void;
  public reset(...keys: Array<keyof Hub>): void;
  public destroy(...keys: Array<keyof Hub>): void;
}
```

**Description**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `FetchRequest[value]()` | Returns `untracked` values of the `value` fields from requests inheriting `FetchRequest` |
| **abort** | `void` | Accepts request keys for which the `abort` method will be called |
| **clear** | `void` | Accepts request keys for which the `clear` method will be called |
| **reset** | `void` | Accepts request keys for which the `reset` method will be called |
| **destroy** | `void` | Accepts request keys for which the `destroy` method will be called |

> **WARNING**
> If the **keys** parameter is not provided, the call will be applied to all request objects

## Types

### TApiHub

**Interface**

```ts
type TApiHub<Hub extends object> = {
  [K in keyof Hub]: TApiRequest;
};
```

**Description**

Type that the hub class must conform to

### ApiHubConfig

**Interface**

```ts
type ApiHubConfig<Hub extends TApiHub<Hub>> = {
  cache?: Array<keyof CacheRequest>,
  force?: Array<keyof GetRequest>,
  onDestroy?: {
    abort?: Array<keyof Hub> | true;
    reset?: Array<keyof Hub> | true;
  }
}
```

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **cache** | `keyof CacheRequest[]` | `false` | On component initialization, calls the **cache** method on requests of the `CacheRequest` class |
| **force** | `keyof GetRequest[]` | `false` | Works similarly to the **force** option of the `GetRequestMeta` type for requests of the `GetRequest` class |
| **onDestroy** | `DestroyConfig<keyof Hub[] \| true>` | `false` | Calls the `abort`, `reset` methods on requests for the provided keys during the `OnDestroy` lifecycle hook. If `true` is provided, the method will be called on all request objects |

## Usage

The process of using `ApiHub` can be divided into the following steps:

1. Create a class with requests
2. Register the class in the `providers` field
3. Inject the class into a component

Implementation below

**Creation**

```ts name="users.api.hub.ts" {9-14}
import {
  useGet,
  GetRequest,
  usePost,
  PostRequest,
} from '@ngmd/utils/http';
import { IUser, ... } from '../types';

export class UsersApiHub {
  public getUser$: GetRequest<IUser, TGetUserUrlOptions> = useGet('@/users/{%raw%}{{id}}{%endraw%}');
  public postUser$: PostRequest<TUserCandidate, IUser, TPostUserUrlOptions> = usePost('@/users');
  public putUser$: PutRequest<TUserCandidate, IUser, TPutUserUrlOptions> = usePut('@/users/{%raw%}{{id}}{%endraw%}');
  public deleteUser$: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{%raw%}{{id}}{%endraw%}');
}
```

**Registration** 

```ts name="example.component.ts" {8}
import { provideApiHub } from '@ngmd/utils/http';
import { UsersApiHub } from './users.api.hub';

@Component({
  // ...
  imports: [ChildExampleComponent],
  providers: [
    provideApiHub(UsersApiHub), 
  ],
})
export class ExampleComponent {}
```

**Injection and usage**

```ts name="example.component.ts" group="example-component"
import { ApiHub, provideApiHub, useApiHub, routeParams } from '@ngmd/utils/http';
import { UsersApiHub } from './users.api.hub';

@Component({
  imports: [ChildExampleComponent]
})
export class ExampleComponent implements OnInit {
  public id: InputSignal<string> = input.required();
  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);

  ngOnInit(): void {
    this.usersApiHub.getUser$.send({
      urlOptions: { params: { id: this.id() } }
    })
  }
}
```

```ts name="child-example.component.ts" group="example-component"
import { ApiHub, provideApiHub, useApiHub, routeParams } from '@ngmd/utils/http';
import { UsersApiHub } from './users.api.hub';

@Component({/**/})
export class ChildExampleComponent {
  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);
  
  public deleteUser(id: string): void {
    this.usersApiHub.deleteUser$.send({
      urlOptions: { params: { id } }
    })
  }
}
```