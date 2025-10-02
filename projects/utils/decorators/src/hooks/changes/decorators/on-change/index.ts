import { OnChangesHookProxy } from '../../factories/OnChangesHookProxy.factory';
import { IOnChangesDecorator, TOnChangesHookPrototype } from '../../interfaces/IOnChangesDecorator';
import {
  ON_CHANGES_DECORATOR,
  OnChangeDecorator,
  TOnChangesInstanceContext,
  TOnChangesPrototypeContext,
} from './on-change.decorator';
import { TOnChangeMethod } from './types';

export function OnChange(dependsOn: TOnChangeMethod['dependsOn']): MethodDecorator {
  return function (target: object, methodName: string | symbol): void {
    const prototype: TOnChangesHookPrototype = target as TOnChangesHookPrototype;
    const meta: TOnChangeMethod = { methodName, dependsOn } as unknown as TOnChangeMethod;

    OnChangesHookProxy.checkAndRegisterDecorator(
      prototype,
      new OnChangeDecorator() as IOnChangesDecorator<
        TOnChangesInstanceContext,
        TOnChangesPrototypeContext
      >,
    );
    OnChangesHookProxy.patchDecoratorMeta(prototype, ON_CHANGES_DECORATOR, meta);
  };
}
