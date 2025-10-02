---
keyword: UseOperatorPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

На данной странице описан процесс взаимодействия с запросом на основе `rxjs` операторов.

## useOperator

Функция создания запроса:

```ts
function useOperator<Response = null>(
  meta?: OperatorRequestMeta<Response>,
): OperatorRequest<Response>
```

## OperatorRequest

Класс запроса:

```ts
class OperatorRequest<Response = null> extends ApiRequest<Response> {
  public request(): Observable<Response>;
  public send(options?: OperatorSendOptions<Response>): Subscription;
}
```

## Методы

| Name | ReturnType | Description |
|----------|----------|----------|
| **request** | `Observable<Response>` | Возвращает подписку из свойства `operator`, объявленного в момент создания запроса. Если значения нет, будет выброшена ошибка. |
| **send** | `Subscription` | Выполняет запрос у подписки из свойства `operator`, переданной в момент вызова метода в рамках аргумента `options` или объявленной в момент создания запроса. Т.е.,если в параметре `options.operator` есть значение, будет использовано оно, если нету, будет использовано значение, переданное при создании объекта запроса. Если значения нет и там, тогда будет выброшена ошибка. |

## Types

### OperatorRequestMeta

**Интерфейс**

```ts
type OperatorRequestMeta<Response> = RequestMeta<Response> & {
  operator?: Observable<Response>;
  force?: boolean;
}
```

**Описание**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **operator** | `Observable<Response>` | `false` | <span class="tag" success>full</span> | `Observable`, который будет использован в качестве запроса при вызове методов `request` и `send`. |
| **force** | `boolean` | `false` | <span class="tag" warning>Injection context only</span> | Отправить **http** запрос в момент создания объекта запроса.<br>[Подробности](/http/resources/use-get#force) (только в рамках значения `boolean`). Так же доступно в рамках поля `force` типа `ApiHubConfig` |

### OperatorSendOptions

**Интерфейс**

```ts
export type OperatorSendOptions<Response = null> = RequestConnection<Response> & {
  operator?: Observable<Response>;
};
```

**Описание**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **operator** | `Observable<Response>` | `false` | <span class="tag" success>full</span> | `Observable`, который будет выполнен в качестве запроса. Если значение не передано, будет использоваться `Observable`, объявленный при создании запроса. |

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
    force: ['usersInfo'], // Запрос будет сделан в момент создания компонента
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
