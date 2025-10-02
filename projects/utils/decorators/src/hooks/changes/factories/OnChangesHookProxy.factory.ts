import { OnChanges, SimpleChanges } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';
import { noop } from 'rxjs';

import { IOnChangesDecorator, TOnChangesHookPrototype } from '../interfaces/IOnChangesDecorator';
import { TOnChangesDecoratorMeta, TOnChangesDecorators } from '../types';

const CHANGES_HOOK_PROXY_META = '__onChangesHookProxyMeta__';
type TOnChangesHookProxyPrototype = TOnChangesHookPrototype & {
  [CHANGES_HOOK_PROXY_META]?: IOnChangesDecorator[];
};

export class OnChangesHookProxy {
  public static registerProxy(prototype: TOnChangesHookProxyPrototype): void {
    if (OnChangesHookProxy.isRegisteredProxy(prototype)) {
      console.warn('OnChangesHookProxy method has been register previously');
    } else {
      prototype[CHANGES_HOOK_PROXY_META] = [];

      prototype.ngOnChanges = new Proxy(prototype.ngOnChanges ?? noop, {
        apply(
          originalNgOnChanges: OnChanges['ngOnChanges'],
          ctx: ISimple & OnChanges,
          args: [SimpleChanges],
        ): void {
          originalNgOnChanges.apply(ctx, args);

          prototype[CHANGES_HOOK_PROXY_META].forEach((decorator: IOnChangesDecorator) => {
            decorator.onChanges(args[0], ctx, prototype);
          });
        },
      });
    }
  }

  public static registerDecorator(
    prototype: TOnChangesHookProxyPrototype,
    decorator: IOnChangesDecorator,
  ): void {
    if (!OnChangesHookProxy.isRegisteredDecorator(prototype, decorator)) {
      prototype[CHANGES_HOOK_PROXY_META].push(decorator);
    } else {
      console.warn(`OnChanges decorator "${decorator.name}" has been register previously`);
    }
  }

  public static isRegisteredProxy(prototype: TOnChangesHookProxyPrototype): boolean {
    return CHANGES_HOOK_PROXY_META in prototype;
  }

  private static getDecoratorByName(
    prototype: TOnChangesHookProxyPrototype,
    candidateName: string,
  ): IOnChangesDecorator {
    const decorator: IOnChangesDecorator = prototype[CHANGES_HOOK_PROXY_META].find(
      (d: IOnChangesDecorator) => d.name === candidateName,
    );

    return decorator;
  }

  public static isRegisteredDecorator(
    prototype: TOnChangesHookProxyPrototype,
    candidate: IOnChangesDecorator,
  ): boolean {
    return Boolean(this.getDecoratorByName(prototype, candidate.name));
  }

  public static checkAndRegisterProxy(prototype: TOnChangesHookPrototype): void {
    if (!OnChangesHookProxy.isRegisteredProxy(prototype)) {
      OnChangesHookProxy.registerProxy(prototype);
    }
  }

  public static checkAndRegisterDecorator<Decorator extends IOnChangesDecorator>(
    prototype: TOnChangesHookPrototype,
    decorator: Decorator,
  ): void {
    OnChangesHookProxy.checkAndRegisterProxy(prototype);

    if (!OnChangesHookProxy.isRegisteredDecorator(prototype, decorator)) {
      OnChangesHookProxy.registerDecorator(prototype, decorator);
    }
  }

  public static patchDecoratorMeta<
    Name extends TOnChangesDecorators['name'],
    Meta extends TOnChangesDecoratorMeta<Name>,
  >(prototype: TOnChangesHookProxyPrototype, name: Name, meta: Meta): void {
    const decorator: IOnChangesDecorator = OnChangesHookProxy.getDecoratorByName(prototype, name);

    if (decorator) {
      decorator.patchMeta(meta, prototype);
    } else {
      console.warn(`Decorator "${name}" not found`);
    }
  }
}
