import { makeEnumerableProto } from '../../../handlers/managers.handlers';
import { SERVICE_MANAGERS_MAP } from '../constants/service.const';
import { TServiceManager } from '../types/service.types';

export function createServiceManagersInstances<
  Managers extends Array<TServiceManager> = Array<TServiceManager>,
>(managers: Managers): InstanceType<(typeof SERVICE_MANAGERS_MAP)[Managers[number]]>[] {
  return managers.map(managerKey => new (SERVICE_MANAGERS_MAP as any)[managerKey]());
}

export function createServiceManagersPrototype<
  Managers extends Array<TServiceManager> = Array<TServiceManager>,
>(instances: InstanceType<(typeof SERVICE_MANAGERS_MAP)[Managers[number]]>[]): object {
  const prototype: object = instances.reduce((accum, instance) => {
    const instanceProto = Object.getPrototypeOf(instance);
    const enumerableInstanceProto: object = makeEnumerableProto(instanceProto);

    return Object.assign(accum, enumerableInstanceProto);
  }, {});

  return prototype;
}
