/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { isEmptyObject, selectObjectProps } from '@ngmd/utils/handlers';

import { makeEnumerableProto } from '../../../handlers/managers.handlers';
import { OnInitController } from '../../../interfaces';
import { DatabaseManager } from '../managers/db/database.manager';
import { StatesManager } from '../managers/state/manager/states.manager';
import { TStatesConstructors } from '../managers/state/types/state.types';
import { TCheckDB, TCheckStates, TStateMeta, TStatesObject } from '../types/state.types';

function assignWithStatesManager(statesObject: TStatesObject, instances: TStateMeta[]): void {
  const states: TStatesConstructors = selectObjectProps(statesObject, ['flags', 'state']);

  if (!isEmptyObject(states)) {
    const instance: StatesManager<typeof states> = new StatesManager(states);
    const proto: object = Object.getPrototypeOf(instance);
    const enumerablePrototype: object = makeEnumerableProto(proto);

    instances.push({ instance, enumerablePrototype });
  }
}

function assignWithDBManager(statesObject: TStatesObject, instances: TStateMeta[]): void {
  const { db } = selectObjectProps(statesObject, ['db']);

  if (Boolean(db)) {
    const instance: DatabaseManager<typeof db> = new DatabaseManager(db);
    const proto: object = Object.getPrototypeOf(instance);
    const enumerablePrototype: object = makeEnumerableProto(proto);

    instances.push({ instance, enumerablePrototype });
  }
}

export function State<const States extends TStatesObject>(
  statesObject: States,
): TCheckDB<States> & TCheckStates<States> {
  const instances: TStateMeta[] = [];

  assignWithStatesManager(statesObject, instances);
  assignWithDBManager(statesObject, instances);

  const __StateController = class implements OnInitController {
    constructor(private stateManagers: TStateMeta[]) {}

    public __initController__(serviceInstance: any): void {
      this.stateManagers.forEach(({ instance }) => instance.init?.(serviceInstance));
    }
  };

  instances.forEach(({ enumerablePrototype }) =>
    Object.assign(__StateController.prototype, enumerablePrototype),
  );

  return new __StateController(instances) as unknown as TCheckDB<States> & TCheckStates<States>;
}
