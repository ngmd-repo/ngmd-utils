---
keyword: HttpUsagePage
---

---

## Description

This page describes ways to work with the `@ngmd/utils/http` module.

To demonstrate, let's create a typical **CRUD** application for managing users.

## Task

1. Create a root component `UsersPage`, which displays `UserList` and `UserDetails` components in its `router-outlet`.
2. Create a user list component `UserList` with a table and pagination. Component functionality:
    - The component should render a list of users in a table with pagination.
    - Navigate to the `UserDetails` page by user **id**
    - Delete a user from the list
    - Change user status
3. Create a `UserDetails` component with detailed user information. Component functionality:
    - Display user details
    - Allow editing and deleting the user via a modal window
4. Create a modal component `UserEdit` with a form for editing user information.

Let's proceed with the implementation.

## Types

Start by creating the necessary types:

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

Create a state class for managing the visibility of the `UserEdit` component:

```ts name="users.state.ts"
export class UsersState {
  public isUserEditVisible: boolean = false;
}
```

## ApiHub

Next, define the required requests in `ApiHub` for shared access:

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

Create a service for handling common logic for deleting and editing a user:

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

Service implementation breakdown:

1. Inject `UsersApiHub` with `ApiHubConfig`. In the `onDestroy` field, specify that all running **http** requests should be aborted on the `ngOnDestroy` hook.
2. Create `editUser` for editing a user:
    - Send a `patchUser$` request to the server with edited data
    - Pass a handler in the `connect` field to execute `afterEditUser` after a successful request
3. Create `deleteUser` for deleting a user:
    - Send a `deleteUser$` request to the server to delete the user
    - Pass a handler in the `connect` field to execute `afterDeleteUser` after a successful request

**UsersPage**

Create the root component `UsersPage`. Provide module dependencies in the `providers` field.

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

Create the user list component:

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
    // For brevity, not using subscription to ActivatedRoute.queryParams

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
  <!-- Conditional table rendering logic -->
  <app-table 
    [rows] = "getUsers$.value()"
    [loading] = "getUsers$.loading()"
    [deleteUser] = "deleteUser($event)" 
    [setUserStatus] = "setUserStatus($event)"
    (setPage) = "setPage($event)"
    (userDetails) = "navigateToUserDetails($event)"
  /> 
```

Component implementation breakdown:

1. Create **getUsers$** request with parameters:
    - `force` - get query parameters from url and execute **http** request with them when the component is created
    - `strategy: "switch"` - for correct pagination, automatically abort the request if it is active
    - `onDestroy` - abort the request and reset `value` to `initialValue` on component `OnDestroy`
2. Inject `UsersApiHub`
3. For the `deleteUser$` method, connect a handler with:
    - `reload` - repeat the previous request for the user list to get up-to-date data after deletion
4. Create `setPage` method:
    - Abort the request if it is running (when quickly switching table pages)
    - Send a request to the server with new *query* parameters
    - Pass a handler in the `connect` field to execute `setQueryParamsInUrl` for updating url parameters after a successful request
5. Create `deleteUser` method to send a `deleteUser$` request via `UsersService`
6. Create `setUserStatus` method to send a `patchUser$` request via `UsersService`
7. Implement the component's **html** template

## UserDetails

Create the user details component:

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
  <!-- Conditional component logic -->
  @if(getUser$.loading()) {
    Loading...
  } @else {
   <div>
    <p>{%raw%}{{ getUser$.value().name }}{%endraw%}</p>
    <p>{%raw%}{{ getUser$.value().status }}{%endraw%}</p>
   </div>
   <button (click)="state.isUserEditVisible.set(true)">Show edit modal</button>
   <button (click)="deleteUser()">Delete User</button>
  }

  @if(state.isUserEditVisible()) {
    <app-user-edit 
      [user]="getUser$.value()" 
      [disabled]="usersHub.patchUser$.loading()"
      (editUser)="editUser($event)" 
    />
  }
```

Component implementation breakdown:

1. Create **getUser$** request with parameters:
    - `force` - get params from url and execute **http** request with them when the component is created
    - `onDestroy` - abort the request and reset `value` to `null` on component `OnDestroy`
2. Inject `UsersApiHub`
3. For the `editUser$` method, connect a handler with:
    - `next` - execute the component's `afterEditUser` method after a successful request
4. For the `deleteUser$` method, connect a handler with:
    - `next` - execute the component's `afterDeleteUser` method after a successful request
5. Implement the component's **html** template

## Result

Thus, using the `@ngmd/utils/http` module, we have implemented one of the possible approaches for a user management page.
