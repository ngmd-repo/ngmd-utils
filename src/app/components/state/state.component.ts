/* eslint-disable @typescript-eslint/member-ordering */
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { UsersState } from '@data/users';
import { provideState, State, useState } from '@ngmd/utils/state';

import { StateChildComponent } from './components/state-child/state-child.component';

@Component({
  selector: 'ng-state',
  imports: [StateChildComponent],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
  providers: [
    provideState(UsersState),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateComponent {
  public isShow: WritableSignal<boolean> = signal(true);
  public toggleShow(): void {
    this.isShow.update(v => !v);
  }

  protected state: State<UsersState> = useState(UsersState);

  public ef: EffectRef = effect(() => {
    // const { editModalVisibleState, isUserActive } = this.state;
    // console.log('effect', this.state.editModalVisibleState());
    console.log('effect: isUserActive', this.state.isUserActive());
    console.log('effect: editModalVisibleState', this.state.state.get('editModalVisibleState'));
  });

  public setState(): void {
    console.log('setState');
    this.state.state.patch({
      isUserActive: true,
    });
  }
  public setState1(): void {
    console.log('setState silent');
    this.state.state.patch({
      editModalVisibleState: 'show',
    });
  }
}
