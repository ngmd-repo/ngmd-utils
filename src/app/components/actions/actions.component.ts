import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ActionByType,
  ActionsChannel,
  ChannelAction,
  provideActionsChannel,
  provideRootActionsChannel,
  useActionsChannel,
  useRootActionsChannel,
} from '@ngmd/utils/actions';

import { MODAL_ACTIONS, TModalActions, TRootActions } from './actions';
import { ActionsChildComponent } from './components/actions-child/actions-child.component';

@Component({
  selector: 'ng-actions',
  imports: [ActionsChildComponent],
  providers: [
    provideRootActionsChannel(),
    provideActionsChannel(MODAL_ACTIONS),
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  private rootActions$: ActionsChannel<TRootActions> = useRootActionsChannel();
  private actions$: ActionsChannel<TModalActions> = useActionsChannel(MODAL_ACTIONS);

  constructor() {
    this.rootActions$.listen().subscribe(action => {
      console.log(action);
      switch (action.type) {
        case 'env': {
          console.log('Root ActionsComponent: env', action.payload);
          break;
        }
        case 'sort': {
          console.log('Root ActionsComponent: sort', action.payload);
          break;
        }
      }
    });

    this.actions$.listen().subscribe(action => {
      console.log(action);
      switch (action.type) {
        case 'show-modal': {
          console.log('ActionsComponent: show-modal', action.payload);
          break;
        }
        case 'toggle-modal': {
          console.log('ActionsComponent: toggle-modal', action.payload);
          break;
        }
      }
    });
  }

  protected hide(): void {
    this.actions$.action('hide-modal');
  }

  protected show(): void {
    this.actions$.action('show-modal', true);
  }

  protected toggle(): void {
    this.actions$.action('toggle-modal', 'hide');
  }

  protected sort(): void {
    this.rootActions$.action('sort', 'desc');
  }

  protected env(): void {
    const action: ActionByType<TModalActions, 'hide-modal'> = new ChannelAction('hide-modal');
    const { type, payload } = new ChannelAction('toggle-modal', 'show');

    // this.actions$.action(type, payload);
    // this.actions$.action('hide-modal');

    // this.rootActions$.action('env', 'PRODUCTION');
    this.rootActions$.actions(
      new ChannelAction('env', 'PRODUCTION'),
      new ChannelAction('sort', 'asc'),
    );
  }
}
