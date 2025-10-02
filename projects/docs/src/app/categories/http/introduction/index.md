---
keyword: IntroductionPage
---

Импортируется из `@ngmd/utils/http`

[`Style guides`](/getting-started/style-guides#api)

---

## Описание

Данный модуль предоставляет возможность автоматизированного взаимодействия с *backend* при помощи набора **CRUD** запросов. Внутренняя реализация использует `HttpClient` пакета `@angular/common/http`.



## Основные аспекты

Далее будут представлены основные аспекты взаимодействия с **api**, которые дает модуль `@ngmd/utils/http`

### Запросы

На данный момент существует **7** типов запросов:

  - <code info>`*UseGetPage`</code>  - **[GET]**
  - <code info>`*UseCachePage`</code> - **[GET]** *(c функцией кэширования)*
  - <code info>`*UsePostPage`</code> - **[POST]**
  - <code info>`*UsePatchPage`</code> - **[PATCH]**
  - <code info>`*UsePutPage`</code> - **[PUT]**
  - <code info>`*UseDeletePage`</code> - **[DELETE]**
  - <code info>`*UseOperatorPage`</code> - **[CUSTOM]**

Все запросы расширяют базовый класс <code info>`*ApiRequestPage`</code>, который в свою очередь предоставляет общий набор методов и полей. 

Запросы типа **GET** (<code info>`*UseGetPage`</code>, <code info>`*UseCachePage`</code>) расширяют класс <code info>`*FetchRequestPage`</code> (наследник <code info>`*CrudRequestPage`</code> и <code info>`*ApiRequestPage`</code>), но с рядом дополнительных возможностей.

Также данный класс расширяют следующие типы запросов:

  - `*UseOperatorPage`

Все запросы имеют набор сущностей для инициализации и взаимодействия. В этот набор входят: 

  - Объект **meta** информации для создания и управления запросом **(1)**
  - Тип запроса **(2)**
  - Функция создания запроса **(3)**

  ```typescript name="resource.ts"
    const meta: GetRequestMeta<IUser[]> = {
      url: '@/users',
      force: true
    }; // (1)
    const getUsers$: GetRequest<IUser[]> = useGet(meta); // (2, 3)
  ```

Каждый тип запроса имеет собственный набор *generic* параметров, расположенных по приоритету. Основные из них:

  - `Response` - возвращаемое значение запроса **(1)**

  ```typescript
    // Response
    interface IUser { /*...*/ } // (1)
    // Options
    type TGetUserParams = { id: string | number };
    type TGetUserUrlOpts = UrlOptions<TGetUserParams>; // (2)
    // Request
    const getUser$: GetRequest<IUser, TGetUserUrlOpts> = useGet('@/users/{%raw%}{{id}}{%endraw%}'); // (1, 2)
  ```

### Композиция запросов

Для объединения запросов в рамках логического контекста существует `ApiHub`.
Это позволяет хранить набор запросов в рамках одной сущности. Использование `ApiHub` осуществляется через **Angular DI**, что дает возможность получать доступ к состоянию и управлению каждым запросом из любого места в дереве зависимостей. Пример:

**Создание**  

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

**Использование в родителе** 

```typescript name="parent-example.component.ts" group="api-hub-parent" {9, 13, 16}
import { ApiHub, provideApiHub, useApiHub, routeParams } from '@ngmd/utils/http';
import { UsersApiHub } from './users.api.hub';
import { ChildExampleComponent } from '...';

@Component({
  // ...
  imports: [ChildExampleComponent],
  providers: [
    provideApiHub(UsersApiHub), // Внедрение
  ],
})
export class ParentExampleComponent {
  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub); // Инжектирование 

  constructor() {
    this.usersApiHub.getUser.send({ urlOptions: routeParams('id') }); // Использование
  }
}
```

```html name="parent-example.component.html" group="api-hub-parent"
Использование в родителе:

@if(usersApiHub.getUser.loading()) {
  <span>Loading...</span>
} @else {
  <span>{%raw%}{{ usersApiHub.getUser.value().name }}{%endraw%}</span>
  <ng-child-example /> 
}
```

**Использование в потомке** 

```typescript name="child-example.component.ts" group="api-hub-child" {9, 12}
import { ApiHub, useApiHub } from '@ngmd/utils/http';
import { UsersApiHub } from './users.api.hub';

@Component({
  // ...
  selector: "ng-child-example",
})
export class ChildExampleComponent {
  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub); // Инжектирование

  protected deleteUser(id: string): void {
    this.usersApiHub.deleteUser.send({ urlOptions: { params: { id } } }); // Использование
  }
}
```

```html name="child-example.component.html" group="api-hub-child"
Использование в потомке:

@let user = usersApiHub.getUser.value();

<span>{%raw%}{{ user.email }}{%endraw%}</span> 

<button (click) = "deleteUser(user.id)">Delete User</button>
```

> **Note**
> Т.к. использование `ApiHub` осуществляется через **Angular DI**, при необходимости вы можете иметь несколько экземпляров одного хаба в разных точках вашего приложения

### OnDestroy

Для остановки работы и сброса значений запросов существует несколько возможностей

**Автоматическая** <span class="tag" warning>Injection context only</span>

Конфигурация задается в момент создания запроса и будет использована автоматически в рамках `DestroyRef`:

```typescript {5-7}
@Component({...})
export class ExampleComponent {
  public getUsers$: GetRequest<IUser[]> = useGet({
    url: '@/users',
    onDestroy: {
      reset: true // Сбросить до дефолтного состояния и прервать запрос 
    }
  });
}
```

В рамках `ApiHub` также доступна возможность задания конфигурации, которая будет применена к выбранным или всем запросам:

```typescript {3-6}
export class ExampleComponent {
  private usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub, {
    onDestroy: {
      abort: true, // Остановить выполнение всех запросов при ngOnDestroy
      reset: ['getUser'], // Сбросить до дефолтного состояния и прервать запрос 'getUser'
    },
  });
}
```

**Программная**

Вызывается программно при помощи вызова доступных методов:

```typescript {6}
@Component(...)
export class ExampleComponent implements OnDestroy {
  protected usersService: UsersService = inject(UsersService);

  ngOnDestroy(): void {
    this.usersService.getUsers$.abort(); // Только остановить выполнение запроса
  }
}
```

В рамках <code info>`*ApiHubPage`</code> также доступна возможность программного вызова сброса:

```typescript {6-7}
@Component(...)
export class ExampleComponent implements OnDestroy {
  private usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);

  ngOnDestroy(): void {
    this.usersApiHub.hub.abort(); // Пример, идентичный автоматической конфигурации выше
    this.usersApiHub.hub.reset('getUser');
  }
}
```

### In-depth

Далее, для углубленного изучения возможностей данного модуля, рекомендуется следующая последовательность:

  - Изучить работу базового класса запросов `*ApiRequestPage` 
  - Изучить работу класса запросов `*CrudRequestPage` 
  - Ознакомиться со списком запросов, которые являются прямыми наследниками `*CrudRequestPage`:  <code info>`*UsePostPage`</code>, <code info>`*UsePatchPage`</code>, <code info>`*UsePutPage`</code>, <code info>`*UseDeletePage`</code>
  - Изучить работу класса **[GET]** запросов `*FetchRequestPage`
  - Изучить работу запросов, которые являются прямыми наследниками `*FetchRequestPage`: <code info>`*UseGetPage`</code>, <code info>`*UseCachePage`</code>
  - Изучить работу класса запросов `OperatorRequest`
  - Изучить работу <code info>`*ApiHubPage`</code>
  - Ознакомиться со списком <code info>`*HttpHelpersPage`</code> функций 
  - Ознакомиться с руководством по использованию <code info>`*HttpUsagePage`</code> 