import { ChangeDetectionStrategy, Component, output, OutputEmitterRef } from '@angular/core';
import { ApiHub, useApiHub } from '@ngmd/utils/http';
import { UsersApiHub } from 'src/app/data/users/api/users.api.hub';

@Component({
  selector: 'ng-requests-hub-one',
  imports: [],
  templateUrl: './requests-hub-one.component.html',
  styleUrl: './requests-hub-one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class RequestsHubOneComponent {
  public hide: OutputEmitterRef<void> = output();

  protected usersApiHub: ApiHub<UsersApiHub> = useApiHub(UsersApiHub, {
    onDestroy: { reset: ['deleteUser'], abort: true },
  });

  public getUser(): void {
    this.usersApiHub.getUser.send({
      urlOptions: { params: { id: 1 } },
      // connect: {
      //   next: () => {
      //     console.log('next', this.usersApiHub.getUser.loading());
      //   },
      //   finalize: () => {
      //     console.log('finalize', this.usersApiHub.getUser.loading());
      //   },
      // },
    });
  }

  public postUser(): void {
    this.usersApiHub.postUser.send(null, {
      urlOptions: { params: { id: 1 } },
    });
  }

  public putUser(): void {
    this.usersApiHub.putUser.send(null, {
      urlOptions: { params: { id: 1 } },
    });
  }

  public deleteUser(): void {
    // this.usersApiHub.deleteUser.send({
    //   urlOptions: { params: { id: 1 } },
    // });
  }
}
