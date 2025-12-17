import { Signal, WritableSignal } from '@angular/core';
import { TConstructor, TJSDataType } from '@ngmd/utils/types';

export function isNotNullish(value: unknown): boolean {
  switch (value) {
    case null:
    case undefined: {
      return false;
    }
    default: {
      return true;
    }
  }
}

export function isNullish(value: unknown): boolean {
  return !isNotNullish(value);
}

type TJSTypesMap = {
  bigint: bigint;
  boolean: boolean;
  function: () => unknown;
  number: number;
  object: object;
  string: string;
  symbol: symbol;
  undefined: undefined;
};
export function isJSType<const T extends TJSDataType>(
  value: unknown,
  type: T,
): value is TJSTypesMap[T] {
  return typeof value === type;
}

export function isObject(obj: unknown): obj is object {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return isNotNullish(obj) && !Array.isArray(obj) && String(obj) === '[object Object]';
}

export function isEveryJSType(type: TJSDataType, ...values: any[]): boolean {
  return values.every(v => isJSType(v, type));
}

export function isInstance(value: unknown, constructor: TConstructor<unknown>): boolean {
  return value instanceof constructor;
}

export function isEqual(v1: unknown, v2: unknown): boolean {
  return Object.is(v1, v2);
}

export function isEqualJSON(v1: unknown, v2: unknown): boolean {
  return Boolean(v1) && Boolean(v2) && JSON.stringify(v1) === JSON.stringify(v2);
}

export function isEmptyObject<T>(object: T): boolean {
  return Object.keys(object).length === 0;
}

export function arraysIsContain(searchElement: unknown, ...arrays: Array<unknown[]>): boolean {
  return arrays.some(arr => arr.includes(searchElement));
}

export function isDate(value: unknown): boolean {
  return !Number.isNaN(Date.parse(value as string));
}

export function condition<T>(conditionValue: boolean, ifValue: unknown, elseValue: unknown): T {
  return (conditionValue ? ifValue : elseValue) as T;
}

export function isWritableSignal<T = unknown>(
  signal: Signal<T> | WritableSignal<T>,
): signal is WritableSignal<T> {
  return Boolean((signal as WritableSignal<T>).asReadonly);
}

export function isExistAllObjectFields<T extends object>(
  obj: T,
  keys: Array<string | keyof Partial<T>>,
): boolean {
  return keys.every(k => k in obj);
}

export function isExistSomeFieldInObject<T extends object>(
  obj: T,
  keys: Array<string | keyof Partial<T>>,
): boolean {
  return keys.some(k => k in obj);
}
