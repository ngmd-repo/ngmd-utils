import { OnChanges, SimpleChanges } from '@angular/core';

export interface IOnChangesDecorator<
  Context extends object = object,
  ProtoContext extends object = object,
> {
  name: string;
  patchMeta(meta: unknown, prototype: TOnChangesHookPrototype<ProtoContext>): void;
  onChanges(
    simpleChanges: SimpleChanges,
    ctx: Context,
    prototype: TOnChangesHookPrototype<ProtoContext>,
  ): void;
}

export type TOnChangesHookPrototype<T extends object = object> = OnChanges & T;
