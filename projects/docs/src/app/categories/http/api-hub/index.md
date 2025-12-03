---
keyword: ApiHubPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

Менеджер для объединения и централизованного хранения запросов с общим доступом в рамках DI. Расширяет hub-класс менеджер-свойством **hub** с менеджер-классом `ApiHubManager`, предоставляя дополнительные методы общего управления классом

**Интерфейс**

```ts
type ApiHub<Hub extends TApiHub<Hub>> = Hub & {
  hub: ApiHubManager<Hub>;
}
```

## Providers

### provideRootApiHub

Провайдер для регистрации корневого hub-класса

```ts
function provideRootApiHub<Hub extends TApiHub>(Hub: TConstructor<Hub>): Provider
```

> **NOTE**
> Используется для регистрации классов, запросы которых нужны в рамках всего приложения 

### useRootApiHub

Функция для инжектирования корневого hub-класса

```ts
function useRootApiHub<Hub extends TApiHub<Hub>>(config?: ApiHubConfig<Hub>): ApiHub<Hub> 
```

### provideApiHub

Провайдер для регистрации модульного hub-класса

```ts
function provideApiHub<Hub extends TApiHub>(Hub: TConstructor<Hub>): Provider
```

### useApiHub

Функция для инжектирования модульного hub-класса

```ts
function useApiHub<Hub extends TApiHub<Hub>>(
  Hub: TConstructor<Hub>,
  config?: ApiHubConfig<Hub>,
): ApiHub<Hub> 
```


## ApiHubManager

Менеджер-класс для управления hub-классом. Создается в рамках поля **hub** в типе `ApiHub`

**Интерфейс**

```ts
class ApiHubManager<Hub extends TApiHub<Hub>> { 
  public get<K extends Array<keyof Hub<FetchRequest>>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] };
  public abort(...keys: Array<keyof Hub>): void;
  public clear(...keys: Array<keyof Hub>): void;
  public reset(...keys: Array<keyof Hub>): void;
  public destroy(...keys: Array<keyof Hub>): void;
}
```

**Описание**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `FetchRequest[value]()` | Возвращает `untracked` значения полей `value` у запросов-наследников `FetchRequest` |
| **abort** | `void` | Принимает ключи запросов, у которых будет вызван метод `abort` |
| **clear** | `void` | Принимает ключи запросов, у которых будет вызван метод `clear` |
| **reset** | `void` | Принимает ключи запросов, у которых будет вызван метод `reset`  |
| **destroy** | `void` | Принимает ключи запросов, у которых будет вызван метод `destroy` |

> **WARNING**
> Если параметр **keys** не передан, то вызов будет применен ко всем объектам запросов

## Types

### TApiHub

Тип, которому должен соответствовать hub-класс

**Интерфейс**

```ts
type TApiHub<Hub extends object> = {
  [K in keyof Hub]: TApiRequest;
};
```

### ApiHubConfig

Объект конфигурации, используемый в функциях-инжекторах `useRootApiHub`, `useApiHub`

**Интерфейс**

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

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **cache** | `keyof CacheRequest[]` | `false` | При инициализации компонента вызывает метод **cache** у запросов класса `CacheRequest` |
| **force** | `keyof GetRequest[]` | `false` | Работает аналогично опции **force** типа `GetRequestMeta` у запросов класса `GetRequest` |
| **onDestroy** | `DestroyConfig<keyof Hub[] \| true>` | `false` | Вызывает методы `abort`, `reset` у запросов по переданным ключам в рамках хука жизненного цикла `OnDestroy`. Если передано значение `true`, тогда метод будет вызван у всех объектов запросов |


## Usage

Процесс использования `ApiHub` можно разделить на следующие шаги:

1. Создание класса с запросами
2. Регистрация класса в поле `providers`
3. Инжектирование класса в компонент

Далее реализация

**Создание**

```ts name="users.api.hub.ts" {9-14}
import {
  useGet,
  GetRequest,
  usePost,
  PostRequest,
  usePut,
  PutRequest,
  useDelete,
  DeleteRequest,
} from '@ngmd/utils/http';
import { IUser, ... } from '../types';

export class UsersApiHub {
  public getUser$: GetRequest<IUser, TGetUserUrlOptions> = useGet('@/users/{%raw%}{{id}}{%endraw%}');
  public postUser$: PostRequest<TUserCandidate, IUser, TPostUserUrlOptions> = usePost('@/users');
  public putUser$: PutRequest<TUserCandidate, IUser, TPutUserUrlOptions> = usePut('@/users/{%raw%}{{id}}{%endraw%}');
  public deleteUser$: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{%raw%}{{id}}{%endraw%}');
}
```

**Регистрация** 

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

**Инжектирование и использование**

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
import { ApiHub, useApiHub } from '@ngmd/utils/http';
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