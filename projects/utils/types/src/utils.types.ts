/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { InjectionToken } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';

import { TConstructor } from './libs.types';

export type TMathAction = 'dec' | 'inc';

export type TIfElse<V1, V2, R1, R2> = V1 extends V2 ? R1 : R2;
export type TExtractKeys<T, K extends keyof T> = K;
export type TIfElseKeys<V1, V2, R1 extends object, R2 extends object> = keyof TIfElse<
  V1,
  V2,
  R1,
  R2
>;
export type TIfElseObject<T> = {
  true: T;
  false: T;
};

export type TArrayItem<T> = {
  index: number;
  item: T;
};

export type TExcludeKeysByValue<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
  }[keyof Base]
>;

export type TExtractKeysByValue<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

export type TagsMap = ISimple<boolean | number | string | (() => boolean | number | string)>;

export type TypedPayload<T, V = null> = {
  type: T;
  payload: V;
};
export type TMergeToUnionType<T extends unknown[]> = T extends [infer A, ...infer B]
  ? A & TMergeToUnionType<B>
  : {};

export type ToInstances<T extends Record<string, TConstructor>> = {
  [K in keyof T]: InstanceType<T[K]>;
};
export type TConstructorInstance<T> = T extends new (...args: any) => infer V ? V : never;

export type TUseValueProvider<Value> = { provide: InjectionToken<Value>; useValue: Value };
export type TUseClassProvider<Value> = { provide: InjectionToken<Value>; useClass: Value };
export type TUseFactoryProvider<Value> = {
  provide: InjectionToken<Value>;
  useFactory: () => Value;
};
export type TUseCombineProvider<Value> = TUseFactoryProvider<Value> | TUseValueProvider<Value>;
export type TExtractParams<T extends string> = T extends `${string}{{${infer Param}}}${infer Rest}`
  ? Param | TExtractParams<Rest>
  : never;
export type TExtractParamsToObject<T extends string> = Record<TExtractParams<T>, any>;
export type TRequiredArray<V> = [V, ...Array<V>];
export type TExtendValue<T, Value extends T = T> = Value;
export type TMutableObject<T> = T extends Function
  ? T
  : {
      -readonly [P in keyof T]: T[P] extends object ? TMutableObject<T[P]> : T[P];
    };

export type IsPartial<T extends object> =
  T extends Required<{ [K in keyof T]: T[K] }> ? false : true;

export type IsRequired<T extends object> =
  T extends Required<{ [K in keyof T]: T[K] }> ? true : false;
