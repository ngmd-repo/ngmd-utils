/* eslint-disable @typescript-eslint/naming-convention */
import { OnInitController, OnInitManager } from '../../../interfaces';
import { FULL_MANAGERS } from '../constants/service.const';
import { createServiceManagersInstances, createServiceManagersPrototype } from '../handlers/service.handlers';
import { ServiceAction } from '../managers/actions/models/service-action.model';
import { TFullManagers, TServiceInstance, TServiceManager, TServiceManagersInstances } from '../types/service.types';


export function ServiceManager<
  const Managers extends TServiceManager[] = TFullManagers,
  Actions extends ServiceAction = null,
  ExtendsClass extends object = null,
>(managers: Managers = FULL_MANAGERS as Managers): TServiceInstance<Managers, ExtendsClass, Actions> {
  const instances: TServiceManagersInstances<Managers> = createServiceManagersInstances(managers);
  const mergedManagersProto: object = createServiceManagersPrototype(instances);


  const __ServiceController = class implements OnInitController {
    constructor(
      private managersInstances: TServiceManagersInstances<Managers>,
    ) {}

    public  __initController__(serviceInstance: object): void {
      this.managersInstances.forEach((instance) => (instance as unknown as OnInitManager).init?.(serviceInstance))
    }
  };

  Object.assign(__ServiceController.prototype, mergedManagersProto);

  return new __ServiceController(instances) as unknown as TServiceInstance<Managers, ExtendsClass, Actions>;
}

/**
 * @deprecated Use only ServiceManager 
 */
export function StreamManager<
ExtendsClass extends object,
Actions extends ServiceAction = null,
const Managers extends TServiceManager[] = TFullManagers,
>(managers: Managers = FULL_MANAGERS as Managers): TServiceInstance<Managers, ExtendsClass, Actions> {
  const instances: TServiceManagersInstances<Managers> =
    createServiceManagersInstances(managers);
  const mergedManagersProto: object = createServiceManagersPrototype(instances);

  const __ServiceController = class implements OnInitController {
    constructor(
      private managersInstances: TServiceManagersInstances<Managers>,
    ) {}

    public  __initController__(serviceInstance: object): void {
      this.managersInstances.forEach((instance) => (instance as unknown as OnInitManager).init?.(serviceInstance))
    }
  };

  Object.assign(__ServiceController.prototype, mergedManagersProto);

  return new __ServiceController(instances) as unknown as TServiceInstance<Managers, ExtendsClass, Actions>;
}
