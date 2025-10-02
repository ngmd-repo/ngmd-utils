---
keyword: HttpUsagePage
---

---

## Описание

На данный странице описываются способы работы с модулем `@ngmd/utils/http`.

Для демонстрации работы создадим типичное **СRUD** приложение для работы с пользователями

## Задание

1. Создать корневой компонент `UsersPage`, в `router-outlet` которого будут отображаться компоненты `UserList`, `UserDetails`
2. Создать компонент со списком пользователей `UserList`, с таблицей и пагинацией. Функционал компонента:
    - Компонент должен отрисовывать список пользователей в таблице. Таблица должна иметь пагинацию.
    - Навигироваться на страницу `UserDetails` по **id** пользователя
    - Удалять пользователя из списка
    - Менять статус пользователя 
3. Создать компонент `UserDetails` с детальной информацией о пользователе. Функционал компонента:
    - Отображать детали пользователя
    - Возможность редактирования, удаления пользователя в рамках модального окна
4. Создать компонент модального окна `UserEdit` с формой редактирования информации об пользователе.

Далее приступим к реализации

## Типы

Начнем с создания необходимых типов:

```ts name="user.interface.ts"
interface IUser {
  id: string;
  name: string;
  status: 'Disabled' | 'Enabled';
}
```

```ts name="user.types.ts"
export type TUserCandidate = Partial<Pick<IUser, 'name' | 'status'>>;
```

## UsersState

Создадим state-класс для управления отображением компонента `UserEdit`

```ts name="users.state.ts"
export class UsersState {
  public isUserEditVisible: boolean = false;
}
```

## ApiHub

Далее выделим в `ApiHub` необходимые запросы для общего доступа:

```ts name="users.api.hub.ts"
import { DeleteRequest, PutRequest, UrlOptions, useDelete, usePatch } from '@ngmd/utils/http';

export class UsersApiHub {
  public patchUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> = usePatch('@/users/{%raw%}{{id}}{%endraw%}');
  public deleteUser$: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{%raw%}{{id}}{%endraw%}');
}

export type TUserParams = { id: string };
export type TPatchUserUrlOptions = UrlOptions<TUserParams>;
export type TDeleteUserUrlOptions = UrlOptions<TUserParams>;
```

## UsersService

Создадим сервиса для обслуживания общей логики при удалении и редактировании пользователя:

```ts name="users.service.ts"
@Injectable()
export class UsersService {
  private usersHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub, {
    onDestroy: { abort: true }
  });

  public editUser(id: string, candidate: TUserCandidate): void {
    this.usersHub.patchUser$.send(candidate, {
      urlOptions: { params: { id } },
      connect: { next: this.afterEditUser }
    })
  }

  @Bind()
  private afterEditUser(): void {
    console.log('The user has been edited');
  }

  public deleteUser(id: string): void {
    this.usersHub.deleteUser$.send({
      urlOptions: { params: { id } },
      connect: { next: this.afterDeleteUser }
    })
  }

  @Bind()
  private afterDeleteUser(): void {
    console.log('The user has been deleted');
  }
}
```

Разберем реализацию сервиса.

1. Инжектируем `UsersApiHub` c конфигом `ApiHubConfig`. В рамках поля `onDestroy` указываем, что при `ngOnDestroy` хуке прервать все исполняемые **http** запросы, если они есть.
2. Создаем `editUser` для редактирования пользователя, в котором:
    - Отправляем запрос `patchUser$` на сервер с отредактированными данным
    - Передаем обработчик в поле `connect`, который выполнит метод `afterEditUser` после успешного выполнения запроса 
3. Создаем `deleteUser` для удаления пользователя, в котором:
    - Отправляем запрос `deleteUser$` на сервер для удаления пользователя
    - Передаем обработчик в поле `connect`, который выполнит метод `afterDeleteUser` после успешного выполнения запроса 

**UsersPage**

Далее создаем корневой компонент `UsersPage`. В поле `providers` предоставляем зависимости модуля

```ts name="users-page.component.ts" group="users-page" {10-12}
import { inject } from '@angular/core';
import { ApiHub, provideApiHub } from '@ngmd/utils/http';
import { provideState } from '@ngmd/utils/state';
import { UsersApiHub } from './api/users.api.hub';
import { UsersService } from './services/users.service';

@Component({
  // ...
  providers: [
    provideState(UsersState),
    provideApiHub(UsersApiHub),
    UsersService
  ],
})
export class UsersPage { /**/ }
```
```html name="users-page.component.html" group="users-page"
 <router-outlet />
```

## UserList

Создаем компонент списка пользователей

```ts name="users-list.component.ts" group="users-list"
import { Router } from '@angular/router';
import { routeQuery, ApiHub, useApiHub } from '@ngmd/utils/http';
import { UsersApiHub } from './api/users.api.hub';
import { UsersService } from './services/users.service';
import { TUserCandidate } from './types/user.types';

type TGetUsersQuery = { skip: number, limit: number };
type TGetUsersUrlOptions = UrlOptions<null, TGetUsersQuery>;

@Component()
export class UsersList {
  protected getUsers$: GetRequest<IUser[], TGetUsersUrlOptions> = useGet({
    url: '@/users',
    initialValue: [],
    strategy: 'switch',
    force: { urlOptions: routeQuery('skip', 'limit') },
    onDestroy: {
      reset: true
    }
  });
  private router: Router = inject(Router);
  private usersHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub); 
  protected usersService: UsersService = inject(UsersService);
  private deleteUserRef: ConnectionRef = this.usersHub.deleteUser$.connect({ reload: this.getUsers$ });

  protected navigateToUserDetails(id: string): void {
    this.router.navigateByUrl(`/users/${id}`);  
  } 

  private setQueryParamsInUrl(pagination: TGetUsersQuery): void { /**/ }

  protected setPage(pagination: TGetUsersQuery): void {
    // * Для краткости записи не используем подписку на ActivatedRoute.queryParams

    this.getUsers$.send({
      connect: { next: () => this.setQueryParamsInUrl(pagination) },
      urlOptions: { query: pagination }
    })
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id);
  }

  protected setUserStatus(id: string, status: IUser['status']): void {
    const candidate: TUserCandidate = { status };

    this.usersService.editUser(id, candidate);
  }
}
```

```html name="users-list.component.html" group="users-list"
  <!-- Условная логика отрисовки таблицы  -->
  <app-table 
    [rows] = "getUsers$.value()"
    [loading] = "getUsers$.loading()"
    [deleteUser] = "deleteUser($event)" 
    [setUserStatus] = "setUserStatus($event)"
    (setPage) = "setPage($event)"
    (userDetails) = "navigateToUserDetails($event)"
  /> 
```

Разберем реализацию компонента:

1. Создаем запрос **getUsers$** c параметрами:
    - `force` - взять query параметры из url и выполнить с ними **http** запрос в момент создания компонента
    - `strategy: "switch"` - для корректной работы пагинации автоматически прерывать выполнение запроса, если он находится в активной фазе. 
    - `onDestroy` - прервать запрос и сбросить `value` до значения `initialValue` при `OnDestroy` компонента
2. Инжектируем `UsersApiHub`
3. Для метода `deleteUser$` коннектим обработчик с полями:
    - `reload` - повторить предыдущий запрос за списком пользователей, для получения актуальных данных с учетом удаленного пользователя
4. Создаем метод `setPage`, в котором:
    - Сбрасываем запрос, если он выполняется (при быстрой смене страниц таблицы)
    - Отправляем запрос на сервер с новыми *query* параметрами
    - Передаем обработчик в поле `connect`, который выполнит метод `setQueryParamsInUrl` для актуализации параметров с *url* адресом, при успешном выполнении запроса
5. Создаем метод `deleteUser`, с отправкой запроса `deleteUser$` в сервисе `UsersService`
6. Создаем метод `setUserStatus`, с отправкой запроса `patchUser$` в сервисе `UsersService`
7. Реализуем **html** шаблон компонента

## UserDetails

Создаем компонент с деталями пользователя

```ts name="users-details.component.ts" group="user-details"
import { Router } from '@angular/router';
import { useState, State } from '@ngmd/utils/state';
import { Bind } from '@ngmd/utils/decorators';
import { routeQuery, ApiHub, useApiHub, UrlOptions } from '@ngmd/utils/http';
import { UsersApiHub } from './api/users.api.hub';
import { UsersState } from './state/users.state';
import { UsersService } from './services/users.service';

type TGetUserUrlOptions = UrlOptions<{ id: string }>;

@Component()
export class UserDetails {
  private router: Router = inject(Router);
  protected state: State<UsersState> = useState(UsersState, { 
    onDestroy: { reset: ["isUserEditVisible"] }
  });
  protected usersHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);
  protected usersService: UsersService = inject(UsersService);
  private editUserRef: ConnectionRef = this.usersHub.patchUser$.connect({ next: this.afterEditUser });
  private deleteUserRef: ConnectionRef = this.usersHub.deleteUser$.connect({ next: this.afterDeleteUser });
  protected getUser$: GetRequest<IUser, TGetUserUrlOptions> = useGet({
    url: '@/users/{%raw%}{{id}}{%endraw%}',
    force: { urlOptions: routeParams('id') },
    onDestroy: {
      reset: true
    }
  });

  protected editUser(candidate: TUserCandidate): void { 
    this.usersService.editUser(this.getUser$.value().id, candidate);
  }

  @Bind()
  private afterEditUser(): void { 
    this.state.isUserEditVisible.set(false);
  }

  protected deleteUser(): void {
    this.usersService.deleteUser(this.getUser$.value().id);
  }

  @Bind()
  private afterDeleteUser(): void { 
    this.router.navigateByUrl(`/users-list`);
  }
}
```

```html name="users-details.component.html" group="user-details"
  <!-- Условная логика работы компонента  -->
  @if(getUser$.loading()) {
    Loading...
  } @else {
   <div>
    <p>{%raw%}{{ getUser$.value().name }}{%endraw%}</p>
    <p>{%raw%}{{ getUser$.value().status }}{%endraw%}</p>
   </div>
   <button (click) = "state.isUserEditVisible.set(true)">Show edit modal</button>
   <button (click) = "deleteUser()">Delete User</button>
  }


  @if(state.isUserEditVisible()) {
    <app-user-edit 
      [user] = "getUser$.value()" 
      [disabled] = "usersHub.patchUser$.loading()"
      (editUser) = "editUser($event)" 
    />
  }
```

Разберем реализацию компонента:

1. Создаем запрос **getUser$** c параметрами:
    - `force` - взять params из url и выполнить с ними **http** запрос в момент создания компонента
    - `onDestroy` - прервать запрос и сбросить `value` до значения `null` при `OnDestroy` компонента
2. Инжектируем `UsersApiHub`
3. Для метода `editUser$` коннектим обработчик с полями:
    - `next` - выполнить метод компонента `afterEditUser`, при успешном выполнении запроса
4. Для метода `deleteUser$` коннектим обработчик с полями:
    - `next` - выполнить метод компонента `afterDeleteUser`, при успешном выполнении запроса
5. Реализуем **html** шаблон компонента


## Итог

Таким образом при помощи модуля `@ngmd/utils/http` мы написали один из вариантов реализации страницы по работе с пользователями
