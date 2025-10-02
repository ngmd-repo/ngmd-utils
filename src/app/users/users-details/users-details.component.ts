/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Bind } from '@ngmd/utils/decorators';
import {
  ApiHub,
  ConnectionRef,
  GetRequest,
  routeParams,
  UrlOptions,
  useApiHub,
  useGet,
} from '@ngmd/utils/http';
import { State, useState } from '@ngmd/utils/state';

import { IUser } from '../user.interface';
import { UsersState } from '../user.state';
import { TUserCandidate } from '../user.types';
import { UsersApiHub } from '../users.api.hub';
import { UsersService } from '../users.service';

type TGetUserUrlOptions = UrlOptions<{ id: string }>;

@Component({
  selector: 'ng-users-details',
  imports: [],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailsComponent {
  private router: Router = inject(Router);
  protected state: State<UsersState> = useState(UsersState, {
    onDestroy: { reset: ['isUserEditVisible'] },
  });
  protected usersHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);
  protected usersService: UsersService = inject(UsersService);
  private editUserRef: ConnectionRef = this.usersHub.patchUser$.connect({
    next: this.afterEditUser,
  });
  private deleteUserRef: ConnectionRef = this.usersHub.deleteUser$.connect({
    next: this.afterDeleteUser,
  });
  protected getUser$: GetRequest<IUser, TGetUserUrlOptions> = useGet({
    url: '@/users/{{id}}',
    force: { urlOptions: routeParams('id') },
    onDestroy: {
      reset: true,
    },
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
