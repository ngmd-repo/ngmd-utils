/* eslint-disable @/brace-style */
import { EffectRef } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';

import { IOnDestroyDecorator } from '../../interfaces/IOnDestroyDecorator';

const DESTROY_EFFECTS_META = '__destroyEffects__';
export type TDestroyEffectInstanceContext = ISimple<EffectRef>;
export type TDestroyEffectsPrototypeContext = { [DESTROY_EFFECTS_META]: string[] };

export const DESTROY_EFFECTS_DECORATOR = 'DestroyEffectDecorator' as const;

export class DestroyEffectDecorator
  implements IOnDestroyDecorator<TDestroyEffectInstanceContext, TDestroyEffectsPrototypeContext>
{
  // eslint-disable-next-line @typescript-eslint/typedef
  public name = DESTROY_EFFECTS_DECORATOR; // * Maybe lately DestroyEffectDecorator.name (from constructor)

  public isRegisteredMeta(prototype: TDestroyEffectsPrototypeContext): boolean {
    return DESTROY_EFFECTS_META in prototype;
  }

  private registerMeta(prototype: TDestroyEffectsPrototypeContext): void {
    if (this.isRegisteredMeta(prototype)) {
      console.warn('DestroyEffectDecorator meta has been register previously');
    } else {
      prototype[DESTROY_EFFECTS_META] = [];
    }
  }

  private registerEffect(effectName: string, prototype: TDestroyEffectsPrototypeContext): void {
    if (!this.isRegisteredEffect(effectName, prototype)) {
      prototype[DESTROY_EFFECTS_META].push(effectName);
    }
  }

  private isRegisteredEffect(
    effectName: string,
    prototype: TDestroyEffectsPrototypeContext,
  ): boolean {
    return prototype[DESTROY_EFFECTS_META].includes(effectName);
  }

  private checkAndRegisterMeta(
    effectName: string,
    prototype: TDestroyEffectsPrototypeContext,
  ): void {
    if (!this.isRegisteredMeta(prototype)) this.registerMeta(prototype);
    if (!this.isRegisteredEffect(effectName, prototype)) this.registerEffect(effectName, prototype);
  }

  public patchMeta(effectName: string, prototype: TDestroyEffectsPrototypeContext): void {
    this.checkAndRegisterMeta(effectName, prototype);
  }

  public onDestroy(
    ctx: TDestroyEffectInstanceContext,
    prototype: TDestroyEffectsPrototypeContext,
  ): void {
    prototype[DESTROY_EFFECTS_META].forEach((effectKey: string) => {
      const isExistEffect: boolean = effectKey in ctx;

      if (isExistEffect) ctx[effectKey].destroy();
      else console.warn(`Effect ${effectKey} not found`);
    });
  }
}
