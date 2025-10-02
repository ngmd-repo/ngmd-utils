/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { ApiHub, provideApiHub, provideRootApiHub, useApiHub } from '@ngmd/utils/http';
import { UsersApiHub } from 'src/app/data/users/api/users.api.hub';

import { RequestsHubOneComponent } from './components/requests-hub-one/requests-hub-one.component';

@Component({
  selector: 'ng-requests-hub',
  imports: [RequestsHubOneComponent],
  templateUrl: './requests-hub.component.html',
  styleUrl: './requests-hub.component.scss',
  providers: [
    provideApiHub(UsersApiHub),
    provideRootApiHub(UsersApiHub),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsHubComponent {
  public isShow: WritableSignal<boolean> = signal(true);
  public toggleShow(): void {
    this.isShow.update(v => !v);
  }
  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub, {
    // cache: ['cacheUsers'],
    // force: ['getUser'],
    onDestroy: {
      abort: true,
    },
  });
}
