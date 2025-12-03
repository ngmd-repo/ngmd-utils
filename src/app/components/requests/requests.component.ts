/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { IUser, TOperatorForkResponse } from '@data/users';
import {
  ApiHub,
  DeleteRequest,
  GetRequest,
  OperatorRequest,
  PatchRequest,
  PostRequest,
  provideApiHub,
  PutRequest,
  useApiHub,
  useGet,
  useOperator,
} from '@ngmd/utils/http';
import { forkJoin } from 'rxjs';

import { RequestsImports } from './imports';

export class TestApiHub {
  public users: GetRequest<IUser[]> = useGet('@/users');
  public user: GetRequest<IUser> = useGet(`@/users/1`);
  public operatorUsers$: OperatorRequest<TOperatorForkResponse> = useOperator({
    operator: forkJoin({
      user: useGet<IUser>({
        url: '@/users/1',
      }).request(),
      users: useGet<IUser[]>('@/users').request(),
    }),
  });
}

@Component({
  selector: 'ng-requests',
  imports: RequestsImports,
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideApiHub(TestApiHub),
  ],
})
export class RequestsComponent {
  public get$: GetRequest<IUser>;
  public post$: PostRequest<any, IUser>;
  public patch$: PatchRequest<any, IUser>;
  public put$: PutRequest<any, IUser>;
  public delete$: DeleteRequest;
  public isShow: WritableSignal<boolean> = signal(true);
  public toggleShow(): void {
    this.isShow.update(v => !v);
  }

  protected hub$: ApiHub<TestApiHub> = useApiHub(TestApiHub, {
    // force: ['users'],
    onDestroy: {
      abort: true,
    },
  });

  private test(): void {}
}
