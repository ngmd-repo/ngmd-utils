import { OnDestroyHookProxy } from '../../factories/OnDestroyHookProxy.factory';
import { IOnDestroyDecorator, TOnDestroyHookPrototype } from '../../interfaces/IOnDestroyDecorator';
import {
  DESTROY_EFFECTS_DECORATOR,
  DestroyEffectDecorator,
  TDestroyEffectInstanceContext,
  TDestroyEffectsPrototypeContext,
} from './DestroyEffect.decorator';

export function DestroyEffect(): PropertyDecorator {
  return function (target: object, propertyName: string | symbol): void {
    const prototype: TOnDestroyHookPrototype = target as TOnDestroyHookPrototype;

    OnDestroyHookProxy.checkAndRegisterDecorator(
      prototype,
      new DestroyEffectDecorator() as IOnDestroyDecorator<
        TDestroyEffectInstanceContext,
        TDestroyEffectsPrototypeContext
      >,
    );
    OnDestroyHookProxy.patchDecoratorMeta(
      prototype,
      DESTROY_EFFECTS_DECORATOR,
      propertyName as string,
    );
  };
}
