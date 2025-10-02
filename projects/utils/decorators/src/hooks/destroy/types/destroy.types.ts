/* eslint-disable @typescript-eslint/sort-type-constituents */
import { DestroyEffectDecorator } from '../decorators/destroy-effect/DestroyEffect.decorator';
import { DestroyMethodDecorator } from '../decorators/destroy-method/DestroyMethod.decorator';

export type TDestroyDecorators = DestroyMethodDecorator | DestroyEffectDecorator;
export type TDecoratorMeta<Name extends TDestroyDecorators['name']> = Parameters<
  Extract<TDestroyDecorators, { name: Name }>['patchMeta']
>[0];
