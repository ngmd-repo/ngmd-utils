import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApiHub,
  ConnectionRef,
  GetRequest,
  routeQuery,
  UrlOptions,
  useApiHub,
  useGet,
} from '@ngmd/utils/http';

import { IUser } from '../user.interface';
import { TUserCandidate } from '../user.types';
import { UsersApiHub } from '../users.api.hub';
import { UsersService } from '../users.service';

type TGetUsersQuery = { skip: number; limit: number };
type TGetUsersUrlOptions = UrlOptions<null, TGetUsersQuery>;

@Component({
  selector: 'ng-users-list',
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  protected getUsers$: GetRequest<IUser[], TGetUsersUrlOptions> = useGet({
    url: '@/users',
    initialValue: [],
    force: { urlOptions: routeQuery('skip', 'limit') },
    onDestroy: {
      reset: true,
    },
  });
  private router: Router = inject(Router);
  private usersHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);
  protected usersService: UsersService = inject(UsersService);
  private deleteUserRef: ConnectionRef = this.usersHub.deleteUser$.connect({
    reload: this.getUsers$,
  });

  private pagination: WritableSignal<TGetUsersQuery> = signal({ limit: 20, skip: 0 });

  protected navigateToUserDetails(id: string): void {
    this.router.navigateByUrl(`/users-list/${id}`);
  }

  private setQueryParamsInUrl(pagination: TGetUsersQuery): void {
    this.router.navigate([], {
      queryParams: pagination,
    });
  }

  protected setPage(pagination: TGetUsersQuery): void {
    // * Для краткости записи не используем подписку на ActivatedRoute.queryParams
    if (this.getUsers$.loading()) this.getUsers$.abort();

    this.getUsers$.send({
      connect: { next: () => this.setQueryParamsInUrl(pagination) },
      urlOptions: { query: pagination },
    });
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id);
  }

  protected setUserStatus(id: string, status: IUser['status']): void {
    const candidate: TUserCandidate = { status };

    this.usersService.editUser(id, candidate);
  }

  public pag(type: 'minus' | 'plus'): void {
    this.pagination.update(({ limit, skip }) => ({
      limit,
      skip: type === 'minus' ? --skip : ++skip,
    }));

    this.setPage(this.pagination());
  }
}
