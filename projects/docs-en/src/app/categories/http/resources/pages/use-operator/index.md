---
keyword: UseOperatorPage
---

Imported from `@ngmd/utils/http`

---

## Description

This page describes how to work with requests based on `rxjs` operators.

## useOperator

Function for creating a request:

```ts
function useOperator<Response = null>(
  meta?: OperatorRequestMeta<Response>,
): OperatorRequest<Response>
```

## OperatorRequest

Request class:

```ts
class OperatorRequest<Response = null> extends ApiRequest<Response> {
  public request(): Observable<Response>;
  public send(options?: OperatorSendOptions<Response>): Subscription;
}
```

## Methods

| Name | ReturnType | Description |
|----------|----------|----------|
| **request** | `Observable<Response>` | Returns the subscription from the `operator` property declared when creating the request. If there is no value, an error will be thrown. |
| **send** | `Subscription` | Executes the request from the subscription in the `operator` property, passed either as an argument in `options` or declared when creating the request. If `options.operator` has a value, it will be used; otherwise, the value provided when creating the request will be used. If neither is present, an error will be thrown. |

## Types

### OperatorRequestMeta

**Interface**

```ts
type OperatorRequestMeta<Response> = RequestMeta<Response> & {
  operator?: Observable<Response>;
  force?: boolean;
}
```

**Description**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **operator** | `Observable<Response>` | `false` | <span class="tag" success>full</span> | `Observable` to be used as the request when calling `request` and `send` methods. |
| **force** | `boolean` | `false` | <span class="tag" warning>Injection context only</span> | Send an **http** request when the request object is created.<br>[Details](/http/resources/use-get#force) (only for `boolean` value). Also available in the `force` field of the `ApiHubConfig` type. |

### OperatorSendOptions

**Interface**

```ts
export type OperatorSendOptions<Response = null> = RequestConnection<Response> & {
  operator?: Observable<Response>;
};
```

**Description**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **operator** | `Observable<Response>` | `false` | <span class="tag" success>full</span> | `Observable` to be executed as the request. If not provided, the `Observable` declared when creating the request will be used. |

## Usage

```ts name="./hub/index.ts" group="usage-api-hub" {8-15}
import {
  useGet,
  useOperator,
  OperatorRequest,
} from '@ngmd/utils/http';

export class ExampleApiHub {
  public usersInfo: OperatorRequest<TUsersInfo> = useOperator({
    operator: forkJoin({
      user: useGet<IUser>({
        url: '@/user',
      }).request(),
      users: useGet<IUser[]>('@/users').request(),
    }),
  });
}

export type TUsersInfo = {
  user: IUser;
  users: IUser[];
};
```

```ts name="example.component.ts" group="usage-api-hub"
import {
  provideApiHub,
  ApiHub,
  useApiHub,
} from '@ngmd/utils/http';
import {
  ExampleApiHub
} from '../hub';

@Component({
  // ...
  providers: [
    provideApiHub(ExampleApiHub),
  ],
})
export class ExampleComponent {
  protected hub$: ApiHub<ExampleApiHub> = useApiHub(ExampleApiHub, {
    force: ['usersInfo'], // The request will be made when the component is created
    onDestroy: {
      abort: true
    },
  });
}
```

```html name="example.component.html" group="usage-api-hub"
<div>
  @if(hub$.usersInfo.loading()) {
    Loading...
  } @else {
    User: {%raw%}{{hub$.usersInfo.value().user | json}}{%endraw%}
    Users: {%raw%}{{hub$.usersInfo.value().users | json}}{%endraw%}
  }
</div>
```
