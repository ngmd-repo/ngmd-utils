import { OnChangeDecorator } from '../decorators/on-change/on-change.decorator';

export type TOnChangesDecorators = OnChangeDecorator;
export type TOnChangesDecoratorMeta<Name extends TOnChangesDecorators['name']> = Parameters<
  Extract<TOnChangesDecorators, { name: Name }>['patchMeta']
>[0];
