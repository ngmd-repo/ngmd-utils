import { OnDestroy } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';
import { noop } from 'rxjs';

import { IOnDestroyDecorator, TOnDestroyHookPrototype } from '../interfaces/IOnDestroyDecorator';
import { TDecoratorMeta, TDestroyDecorators } from '../types/destroy.types';

const DESTROY_HOOK_PROXY_META = '__destroyHookProxyMeta__';
type TOnDestroyHookProxyPrototype = TOnDestroyHookPrototype & {
  [DESTROY_HOOK_PROXY_META]?: IOnDestroyDecorator[];
};

export class OnDestroyHookProxy {
  public static registerProxy(prototype: TOnDestroyHookProxyPrototype): void {
    if (OnDestroyHookProxy.isRegisteredDestroyProxy(prototype)) {
      console.warn('OnDestroyHookProxy method has been register previously');
    } else {
      prototype[DESTROY_HOOK_PROXY_META] = [];

      prototype.ngOnDestroy = new Proxy(prototype.ngOnDestroy ?? noop, {
        apply(originalNgOnDestroy: OnDestroy['ngOnDestroy'], ctx: ISimple & OnDestroy): void {
          originalNgOnDestroy.apply(ctx);

          prototype[DESTROY_HOOK_PROXY_META].forEach((decorator: IOnDestroyDecorator) => {
            decorator.onDestroy(ctx, prototype);
          });
        },
      });
    }
  }

  public static registerDecorator(
    prototype: TOnDestroyHookProxyPrototype,
    decorator: IOnDestroyDecorator,
  ): void {
    if (!OnDestroyHookProxy.isRegisteredDecorator(prototype, decorator)) {
      prototype[DESTROY_HOOK_PROXY_META].push(decorator);
    } else {
      console.warn(`Destroy decorator "${decorator.name}" has been register previously`);
    }
  }

  public static isRegisteredDestroyProxy(prototype: TOnDestroyHookProxyPrototype): boolean {
    return DESTROY_HOOK_PROXY_META in prototype;
  }

  private static getDecoratorByName(
    prototype: TOnDestroyHookProxyPrototype,
    candidateName: string,
  ): IOnDestroyDecorator {
    const decorator: IOnDestroyDecorator = prototype[DESTROY_HOOK_PROXY_META].find(
      (d: IOnDestroyDecorator) => d.name === candidateName,
    );

    return decorator;
  }

  public static isRegisteredDecorator(
    prototype: TOnDestroyHookProxyPrototype,
    candidate: IOnDestroyDecorator,
  ): boolean {
    return Boolean(this.getDecoratorByName(prototype, candidate.name));
  }

  public static checkAndRegisterProxy(prototype: TOnDestroyHookPrototype): void {
    if (!OnDestroyHookProxy.isRegisteredDestroyProxy(prototype)) {
      OnDestroyHookProxy.registerProxy(prototype);
    }
  }

  public static checkAndRegisterDecorator<Decorator extends IOnDestroyDecorator>(
    prototype: TOnDestroyHookPrototype,
    decorator: Decorator,
  ): void {
    OnDestroyHookProxy.checkAndRegisterProxy(prototype);

    if (!OnDestroyHookProxy.isRegisteredDecorator(prototype, decorator)) {
      OnDestroyHookProxy.registerDecorator(prototype, decorator);
    }
  }

  public static patchDecoratorMeta<
    Name extends TDestroyDecorators['name'],
    Meta extends TDecoratorMeta<Name>,
  >(prototype: TOnDestroyHookProxyPrototype, name: Name, meta: Meta): void {
    const decorator: IOnDestroyDecorator = OnDestroyHookProxy.getDecoratorByName(prototype, name);

    if (decorator) {
      decorator.patchMeta(meta, prototype);
    } else {
      console.warn(`Decorator "${name}" not found`);
    }
  }
}
