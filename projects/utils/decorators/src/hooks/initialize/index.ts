import { OnInit } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';

const INITIALIZE_HOOKS_META = '__initializeHooks__';
type TInitializeHooksPrototype = OnInit & { [INITIALIZE_HOOKS_META]: string[] };

// TODO переделать в соответствии с логикой Destroy декоратора
export function Initialize(): MethodDecorator {
  return function (
    target: object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const prototype: TInitializeHooksPrototype = target as TInitializeHooksPrototype;
    const isExistMethodArray: boolean = INITIALIZE_HOOKS_META in prototype;

    if (!isExistMethodArray) {
      const { ngOnInit: originalOnInit } = prototype;

      prototype[INITIALIZE_HOOKS_META] = [];
      prototype.ngOnInit = function (): void {
        if (originalOnInit) {
          originalOnInit.call(this);
        }

        prototype[INITIALIZE_HOOKS_META].forEach((methodKey: string) => {
          (this as unknown as ISimple<() => void>)[methodKey as string]();
        });
      };
    }

    prototype[INITIALIZE_HOOKS_META].push(methodName as string);

    return descriptor;
  };
}
