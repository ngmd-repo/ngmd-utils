import { isJSType } from '@ngmd/utils/handlers';
import { ISimple } from '@ngmd/utils/interfaces';

import { TServiceManager } from '../controllers/service/types/service.types';

export function makeEnumerableProto(instanceProto: object): object {
  const descriptors: ISimple<PropertyDescriptor> = Object.getOwnPropertyDescriptors(instanceProto);

  return Object.entries(descriptors).reduce((accum: object, [key, descriptor]) => {
    const isFunctionalMethod: boolean =
      key !== 'constructor' && key !== 'init' && isJSType(descriptor.value, 'function');

    if (isFunctionalMethod) Object.assign(accum, { [key]: descriptor.value });

    return accum;
  }, {});
}

export function UseManagers<const T extends TServiceManager[]>(managers: T): T {
  return managers;
}
