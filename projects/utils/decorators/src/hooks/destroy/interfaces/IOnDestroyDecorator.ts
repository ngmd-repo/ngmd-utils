import { OnDestroy } from '@angular/core';

export interface IOnDestroyDecorator<
  Context extends object = object,
  ProtoContext extends object = object,
> {
  name: string;
  patchMeta(meta: unknown, prototype: TOnDestroyHookPrototype<ProtoContext>): void;
  onDestroy(ctx: Context, prototype: TOnDestroyHookPrototype<ProtoContext>): void;
}

export type TOnDestroyHookPrototype<T extends object = object> = OnDestroy & T;
