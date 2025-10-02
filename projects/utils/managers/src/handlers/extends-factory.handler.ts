import { TConstructor, TMergeToUnionType } from '@ngmd/utils/types';

import { OnInitController } from '../interfaces';

export function ExtendsFactory<Mixins extends Array<unknown>>(
  ...mixins: Mixins
): TConstructor<TMergeToUnionType<Mixins>> {
  const mergedExtends: object = mixins.reduce<object>((accum, instance) => {
    const prototype: object = Object.getPrototypeOf(instance);

    return Object.assign(accum, prototype);
  }, {});

  const __FactoryExtender = class {
    constructor() {
      this._initializeFactory();
    }

    private _initializeFactory(): void {
      mixins.forEach(instance => (instance as OnInitController).__initController__(this));
    }
  };

  Object.assign(__FactoryExtender.prototype, mergedExtends);

  return __FactoryExtender as unknown as TConstructor<TMergeToUnionType<Mixins>>;
}
