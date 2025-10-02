/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpStore, provideHttpStore, useHttpStore } from '@ngmd/utils/stores';

import { UsersHttpStore } from '../../data/users/store/users.http.store';
import { HttpStoreChildOneComponent } from './components/http-store-child-one/http-store-child-one.component';
import { HttpStoreChildTwoComponent } from './components/http-store-child-two/http-store-child-two.component';

@Component({
  selector: 'ng-http-store',
  imports: [
    HttpStoreChildOneComponent,
    HttpStoreChildTwoComponent,
  ],
  providers: [
    provideHttpStore(UsersHttpStore),
  ],
  templateUrl: './http-store.component.html',
  styleUrl: './http-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpStoreComponent implements OnInit {
  public isShowOne: WritableSignal<boolean> = signal(false);
  public toggleShowOne(): void {
    this.isShowOne.update(v => !v);
  }
  public isShowTwo: WritableSignal<boolean> = signal(false);
  public toggleShowTwo(): void {
    this.isShowTwo.update(v => !v);
  }

  public toggle(type?: 'one' | 'two'): void {
    switch (type) {
      case 'one': {
        this.toggleShowOne();
        break;
      }
      case 'two': {
        this.toggleShowTwo();
        break;
      }
      default: {
        this.toggleShowOne();
        this.toggleShowTwo();
      }
    }
  }

  //  ------------------------------- Content -------------------------------

  private store$: HttpStore<UsersHttpStore> = useHttpStore(UsersHttpStore);
  // protected user: HttpField<IUser, TUserParams> = this.store$.select('user');

  ngOnInit(): void {}
}
