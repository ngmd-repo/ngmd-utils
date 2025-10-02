import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpField, HttpStore, useHttpStore } from '@ngmd/utils/stores';

import { IUser } from '../../../../data/users/interface/user.interface';
import { UsersHttpStore } from '../../../../data/users/store/users.http.store';
import { TUserUrlOptions } from '../../../../data/users/types/index';

@Component({
  selector: 'ng-http-store-child-one',
  imports: [
    JsonPipe,
  ],
  templateUrl: './http-store-child-one.component.html',
  styleUrl: './http-store-child-one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpStoreChildOneComponent {
  private store$: HttpStore<UsersHttpStore> = useHttpStore(UsersHttpStore);
  protected user: HttpField<IUser, TUserUrlOptions> = this.store$.select('user');

  public send(): void {
    this.user.send({
      urlOptions: { params: { id: 3 } },
      observer: {
        next(user: IUser): void {
          console.log('One:', user);
        },
      },
    });
  }
}
