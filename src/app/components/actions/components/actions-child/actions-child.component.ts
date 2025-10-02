import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsChannel, useActionsChannel, useRootActionsChannel } from '@ngmd/utils/actions';

import { MODAL_ACTIONS, TModalActions, TRootActions } from '../../actions';

@Component({
  selector: 'ng-actions-child',
  imports: [],
  templateUrl: './actions-child.component.html',
  styleUrl: './actions-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsChildComponent {
  private actions$: ActionsChannel<TModalActions> = useActionsChannel(MODAL_ACTIONS);
  private rootActions$: ActionsChannel<TRootActions> = useRootActionsChannel();

  constructor() {
    this.rootActions$.listen('env').subscribe(action => {
      console.log(action);
    });

    this.actions$.listen('toggle-modal').subscribe(action => {
      console.log(`ActionsChildComponent: ${action.type}`, action.payload);
    });
  }
}
