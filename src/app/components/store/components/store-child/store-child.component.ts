import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersStore } from '@data/users';
import { Store, useStore } from '@ngmd/utils/store';

@Component({
  selector: 'ng-store-child',
  imports: [],
  templateUrl: './store-child.component.html',
  styleUrl: './store-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreChildComponent {
  protected store: Store<UsersStore> = useStore(UsersStore, {
    onDestroy: {
      reset: ['user'],
    },
  });
}
