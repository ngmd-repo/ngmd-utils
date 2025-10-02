import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { UsersStore } from '@data/users';
import { provideStore, Store, useStore } from '@ngmd/utils/store';

import { StoreChildComponent } from './components/store-child/store-child.component';

@Component({
  selector: 'ng-store',
  imports: [StoreChildComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  providers: [provideStore(UsersStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {
  public isShow: WritableSignal<boolean> = signal(true);
  public toggleShow(): void {
    this.isShow.update(v => !v);
  }

  protected store: Store<UsersStore> = useStore(UsersStore);

  public setStore(): void {
    this.store.store.patch({
      users: 'Hello array' as any,
      user: 'Hello object' as any,
    });
  }
}
