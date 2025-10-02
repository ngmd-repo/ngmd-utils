/* eslint-disable @/brace-style */

import { SimpleChanges } from '@angular/core';
import { selectObjectProps, serializeSimpleChanges, wrapToArray } from '@ngmd/utils/handlers';
import { ISimple } from '@ngmd/utils/interfaces';

import { IOnChangesDecorator } from '../../interfaces/IOnChangesDecorator';
import { TOnChangeMethod } from './types';

const ON_CHANGES_META = '__onChange__';

export type TOnChangesInstanceContext = ISimple<any>;
export type TOnChangesPrototypeContext = { [ON_CHANGES_META]: TOnChangeMethod[] };

export const ON_CHANGES_DECORATOR = 'OnChangeDecorator' as const;

export class OnChangeDecorator
  implements IOnChangesDecorator<SimpleChanges, TOnChangesPrototypeContext>
{
  // eslint-disable-next-line @typescript-eslint/typedef
  public name = ON_CHANGES_DECORATOR;

  public isRegisteredMeta(prototype: TOnChangesPrototypeContext): boolean {
    return ON_CHANGES_META in prototype;
  }

  private registerMeta(prototype: TOnChangesPrototypeContext): void {
    if (this.isRegisteredMeta(prototype)) {
      console.warn('OnChangeDecorator meta has been register previously');
    } else {
      prototype[ON_CHANGES_META] = [];
    }
  }

  private registerMethod(meta: TOnChangeMethod, prototype: TOnChangesPrototypeContext): void {
    if (!this.isRegisteredMethod(meta, prototype)) {
      prototype[ON_CHANGES_META].push(meta);
    }
  }

  private isRegisteredMethod(
    meta: TOnChangeMethod,
    prototype: TOnChangesPrototypeContext,
  ): boolean {
    const methodMeta: TOnChangeMethod = prototype[ON_CHANGES_META].find(
      m => m.methodName === meta.methodName,
    );

    return Boolean(methodMeta);
  }

  private checkAndRegisterMeta(meta: TOnChangeMethod, prototype: TOnChangesPrototypeContext): void {
    if (!this.isRegisteredMeta(prototype)) this.registerMeta(prototype);
    if (!this.isRegisteredMethod(meta, prototype)) this.registerMethod(meta, prototype);
  }

  public patchMeta(meta: TOnChangeMethod, prototype: TOnChangesPrototypeContext): void {
    this.checkAndRegisterMeta(meta, prototype);
  }

  private isDependsOn(dependsOn: TOnChangeMethod['dependsOn'], changes: ISimple): boolean {
    if (typeof dependsOn === 'string') {
      dependsOn = wrapToArray(dependsOn);
    }

    return dependsOn.some(d => d in changes);
  }

  public onChanges(
    simpleChanges: SimpleChanges,
    ctx: TOnChangesInstanceContext,
    prototype: TOnChangesPrototypeContext,
  ): void {
    const changes: ISimple = serializeSimpleChanges(simpleChanges);

    prototype[ON_CHANGES_META].filter(({ dependsOn }) =>
      this.isDependsOn(dependsOn, changes),
    ).forEach(({ methodName, dependsOn }) => {
      const params: unknown =
        typeof dependsOn === 'string' ? changes[dependsOn] : selectObjectProps(changes, dependsOn);

      ctx[methodName](params);
    });
  }
}
