import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersState } from '@data/users';
import { State, useState } from '@ngmd/utils/state';

@Component({
  selector: 'ng-state-child',
  imports: [],
  templateUrl: './state-child.component.html',
  styleUrl: './state-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateChildComponent {
  protected state: State<UsersState> = useState(UsersState, {
    onDestroy: {
      reset: ['editModalVisibleState'],
    },
  });
}
