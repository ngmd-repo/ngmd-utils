/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Bind } from '@ngmd/utils/decorators';
import { ApiHub, useApiHub } from '@ngmd/utils/http';

import { TUserCandidate } from './user.types';
import { UsersApiHub } from './users.api.hub';

@Injectable()
export class UsersService {
  private usersHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub, {
    onDestroy: { abort: true },
  });

  public editUser(id: string, candidate: TUserCandidate): void {
    this.usersHub.patchUser$.send(candidate, {
      urlOptions: { params: { id } },
      connect: { next: this.afterEditUser },
    });
  }

  @Bind()
  private afterEditUser(): void {
    console.log('The user has been edited');
  }

  public deleteUser(id: string): void {
    this.usersHub.deleteUser$.send({
      urlOptions: { params: { id } },
      connect: { next: this.afterDeleteUser },
    });
  }

  @Bind()
  private afterDeleteUser(): void {
    console.log('The user has been deleted');
  }
}
