/* eslint-disable @/brace-style */
import { ISimple } from '@ngmd/utils/interfaces';

import { IOnDestroyDecorator } from '../../interfaces/IOnDestroyDecorator';

const DESTROY_INSTANCES_META = '__destroyInstanceMethods__';
export type TDestroyMethodsInstanceContext = ISimple<() => void>;
export type TDestroyMethodsPrototypeContext = { [DESTROY_INSTANCES_META]: string[] };

export const DESTROY_METHODS_DECORATOR = 'DestroyMethodDecorator' as const;

export class DestroyMethodDecorator
  implements IOnDestroyDecorator<TDestroyMethodsInstanceContext, TDestroyMethodsPrototypeContext>
{
  // eslint-disable-next-line @typescript-eslint/typedef
  public name = DESTROY_METHODS_DECORATOR;

  public isRegisteredMeta(prototype: TDestroyMethodsPrototypeContext): boolean {
    return DESTROY_INSTANCES_META in prototype;
  }

  private isRegisteredMethod(
    methodName: string,
    prototype: TDestroyMethodsPrototypeContext,
  ): boolean {
    return prototype[DESTROY_INSTANCES_META].includes(methodName);
  }

  private registerMeta(prototype: TDestroyMethodsPrototypeContext): void {
    if (this.isRegisteredMeta(prototype)) {
      console.warn('DestroyMethodDecorator meta has been register previously');
    } else {
      prototype[DESTROY_INSTANCES_META] = [];
    }
  }

  private registerMethod(methodName: string, prototype: TDestroyMethodsPrototypeContext): void {
    if (!this.isRegisteredMethod(methodName, prototype)) {
      prototype[DESTROY_INSTANCES_META].push(methodName);
    }
  }

  private checkAndRegisterMeta(
    methodName: string,
    prototype: TDestroyMethodsPrototypeContext,
  ): void {
    if (!this.isRegisteredMeta(prototype)) this.registerMeta(prototype);
    if (!this.isRegisteredMethod(methodName, prototype)) this.registerMethod(methodName, prototype);
  }

  public patchMeta(methodName: string, prototype: TDestroyMethodsPrototypeContext): void {
    this.checkAndRegisterMeta(methodName, prototype);
  }

  public onDestroy(
    ctx: TDestroyMethodsInstanceContext,
    prototype: TDestroyMethodsPrototypeContext,
  ): void {
    prototype[DESTROY_INSTANCES_META].forEach((methodName: string) => {
      const isExistEffect: boolean = methodName in ctx;

      if (isExistEffect) ctx[methodName]();
      else console.warn(`Method ${methodName} not found`);
    });
  }
}
