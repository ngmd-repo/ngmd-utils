import { OnDestroyHookProxy } from '../../factories/OnDestroyHookProxy.factory';
import { TOnDestroyHookPrototype } from '../../interfaces/IOnDestroyDecorator';
import { DESTROY_METHODS_DECORATOR, DestroyMethodDecorator } from './DestroyMethod.decorator';

export function Destroy(): MethodDecorator {
  return function (target: object, methodName: string | symbol): void {
    const prototype: TOnDestroyHookPrototype = target as TOnDestroyHookPrototype;

    OnDestroyHookProxy.checkAndRegisterDecorator(prototype, new DestroyMethodDecorator() as any);
    OnDestroyHookProxy.patchDecoratorMeta(
      prototype,
      DESTROY_METHODS_DECORATOR,
      methodName as string,
    );
  };
}
