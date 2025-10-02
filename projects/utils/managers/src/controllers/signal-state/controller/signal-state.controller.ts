/* eslint-disable @typescript-eslint/naming-convention */

import { makeEnumerableProto } from '../../../handlers/managers.handlers';
import { OnInitController } from '../../../interfaces';
import {
  SignalStateManager,
  TExcludeSignalStateFields,
} from '../managers/signal-state/manager/signal-state.manager';
import { TSignalStatesObject } from '../types/signal-state.types';

export function SignalState<const States extends TSignalStatesObject>(
  states: States,
): Omit<SignalStateManager<States>, TExcludeSignalStateFields> {
  const instance = new SignalStateManager(states);
  const managerPrototype = makeEnumerableProto(Object.getPrototypeOf(instance));

  const __SignalStateController = class implements OnInitController {
    constructor(private stateManager: SignalStateManager<States>) {}

    public __initController__(serviceInstance: any): void {
      this.stateManager.init(serviceInstance);
    }
  };

  Object.assign(__SignalStateController.prototype, managerPrototype);

  return new __SignalStateController(instance) as unknown as Omit<
    SignalStateManager<States>,
    TExcludeSignalStateFields
  >;
}
