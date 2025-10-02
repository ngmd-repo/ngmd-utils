import { OnDestroy } from '@angular/core';

export function Cache(clearCacheBeforeDestroy?: boolean): MethodDecorator {
  return function (
    target: object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const { value: originalMethod } = descriptor;
    const store: Map<string, unknown> = new Map();

    if (clearCacheBeforeDestroy) {
      const { ngOnDestroy: originalDestroy } = target as OnDestroy;

      (target as OnDestroy).ngOnDestroy = function (): void {
        store.clear();
        originalDestroy?.call(this);
      };
    }

    return {
      value: function (...args: any[]): unknown {
        const jsonArgs: string = JSON.stringify(args);
        const isExistValue: boolean = store.has(jsonArgs);

        if (isExistValue) {
          return store.get(jsonArgs);
        }

        const value: unknown = originalMethod.apply(this, args);

        store.set(jsonArgs, value);

        return value;
      },
    };
  };
}
