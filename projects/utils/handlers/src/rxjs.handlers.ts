import { filter, map, MonoTypeOperatorFunction, Observable, pipe, UnaryFunction } from 'rxjs';

import { selectObjectProps } from './utility.handlers';

export function ofType<T extends string>(...actions: T[]): MonoTypeOperatorFunction<T> {
  return filter((action: T) => actions.includes(action));
}

export function pick<
  T extends object,
  K extends Array<keyof T>,
  Value = K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] },
>(...keys: K): UnaryFunction<Observable<T>, Observable<Value>> {
  return pipe(
    map((response: T): Value => {
      return keys.length === 1
        ? (response[keys[0]] as Value)
        : (selectObjectProps(response, keys) as Value);
    }),
  );
}

export function noop<T>(): MonoTypeOperatorFunction<T> {
  return source => source; // Просто возвращает исходный Observable
}

export const NOOP = noop<any>();
