/* eslint-disable @typescript-eslint/member-ordering */
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { IUser, TGetUserUrlOptions, TPostUserUrlOptions, TUserCandidate } from '@data/users';
import { ApiHub, GetRequest, PostRequest, useApiHub, useGet, usePost } from '@ngmd/utils/http';

import { TestApiHub } from '../../requests.component';
import { RequestsItemsImports } from './imports';
import { RequestsItemsViewService } from './services/requests-items.view.service';

@Component({
  selector: 'ng-requests-items',
  imports: RequestsItemsImports,
  providers: [
    RequestsItemsViewService,
  ],
  templateUrl: './requests-items.component.html',
  styleUrl: './requests-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsItemsComponent implements OnInit {
  public isShow: WritableSignal<boolean> = signal(false);
  public toggleShow(): void {
    this.isShow.update(v => !v);
  }
  public hide: OutputEmitterRef<void> = output();

  private getUser$: GetRequest<IUser, TGetUserUrlOptions> = useGet({
    force: true,
    url: '@/users/1',
    strategy: 'switch',
  });

  // private getUsers$: GetRequest<IUser[]> = useGet({
  //   url: '@/users',
  //   transform: (users: IUser[]) => users.slice(0, 3),
  // });
  private postUser$: PostRequest<TUserCandidate, IUser, TPostUserUrlOptions> = usePost({
    url: '@/post',
    transform: (user: IUser) => user,
    connect: {
      with: this.getUser$.value,
    },
  });
  // private patchUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions>;
  // private putUser$: PutRequest<TUserCandidate, IUser, TPutUserUrlOptions>;
  // private deleteUser$: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{{id}}');
  // protected operatorUsers$: OperatorRequest<TOperatorForkResponse> = useOperator({
  //   force: true,
  //   operator: forkJoin({
  //     user: useGet<IUser>('@/users/1').request(),
  //     users: useGet<IUser[]>('@/users').request(),
  //   }),
  // });

  protected hub$: ApiHub<TestApiHub> = useApiHub(TestApiHub, {
    // force: ['operatorUsers$'],
    onDestroy: {
      abort: true,
      // reset: ['operatorUsers$'],
    },
  });

  ngOnInit(): void {}

  private testOperator(): void {
    // this.hub$.operatorUsers$.send();
    // this.hide.emit();
  }
}
