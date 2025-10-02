/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import {
  ElementRef,
  InjectionToken,
  Provider,
  Signal,
  SimpleChange,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';
import { TagsMap, TMathAction, TSortDirection } from '@ngmd/utils/types';

import { isJSType, isNullish, isObject, isWritableSignal } from './condition.handlers';
import { titlecase } from './string.handlers';

export type TUseProvider = 'class' | 'existing' | 'factory' | 'value';
export function DIProvider<V, T extends InjectionToken<V>>(
  provide: T,
  value: V,
  use: TUseProvider = 'class',
  multi: boolean = true,
): Provider {
  const useKey: `use${Capitalize<TUseProvider>}` = `use${titlecase(use)}`;

  return {
    provide,
    [useKey]: value,
    multi,
  } as unknown as Provider;
}

export function randomid(): string {
  const bytes = new Uint8Array(16);

  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex: string = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function nativeElement<T extends HTMLElement>(el$: ElementRef<T>): T {
  return el$.nativeElement;
}

export function assign<T = ISimple>(...args: unknown[]): T {
  return Object.assign({}, ...args);
}

export function redirectTo(url: string, target: '_blank' | '_self' = '_blank'): void {
  const link$: HTMLAnchorElement = document.createElement('a');

  link$.setAttribute('href', url);
  link$.setAttribute('target', target);

  link$.click();
}

export function isValidDate(date: unknown): boolean {
  if (isNullish(date)) return false;

  const toDate: number = +new Date(date as number | string);

  return !Number.isNaN(toDate);
}

export function copyDate(date: unknown): Date {
  return new Date(date as number | string);
}

export function getWeekDays(
  type: 'current-week' | 'previous-week',
  date: Date = new Date(),
): Date[] {
  date = copyDate(date);
  const firstWeekDay: number = 1;
  const lastWeekDay: number = 7;
  const currentDay: number = date.getDay() || lastWeekDay;
  const days: Date[] = [];
  const isNotFirstWeekDay: boolean = date.getDay() !== firstWeekDay;

  if (isNotFirstWeekDay) {
    date.setDate(date.getDate() - (currentDay - 1));
  }

  if (type === 'previous-week') {
    date.setDate(date.getDate() - lastWeekDay);
  }

  while (days.length < 7) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  if (type === 'current-week') {
    days.splice(currentDay);
  }

  return days;
}

export function getFirstAndLastElements<T>(array: T[]): [T, T] {
  const firstElement: T = array[0];
  const lastElement: T = array.length >= 1 ? array.at(-1) : null;

  return [firstElement, lastElement];
}

export function getNextSortDirection(sortDir: TSortDirection): TSortDirection {
  switch (sortDir) {
    case '': {
      return 'asc';
    }
    case 'asc': {
      return 'desc';
    }
    case 'desc': {
      return '';
    }
  }
}

export function excludeObjValues<T extends object>(
  obj: T,
  values: unknown[] = ['', null, undefined],
): Partial<T> {
  return Object.entries(obj).reduce<Partial<T>>((accum, [key, value]) => {
    if (values.includes(value)) return accum;

    accum[key as keyof T] = value;

    return accum;
  }, {});
}

export function excludeObjProps<T extends object, K extends keyof T>(
  object: T,
  keys: Array<K>,
): Omit<T, K> {
  return Object.entries(object).reduce<Omit<T, K>>(
    (accum, [key, value]) => {
      const isCanAddProperty: boolean = !keys.includes(key as K);

      if (isCanAddProperty) {
        accum[key as keyof Omit<T, K>] = value;
      }

      return accum;
    },
    {} as Omit<T, K>,
  );
}

export function excludeEmptyProps<T extends object>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((accum, [key, value]) => {
    const isDefinedValue: boolean = !isNullish(value);

    if (isDefinedValue) {
      (accum as Partial<T>)[key as keyof T] = value;
    }

    return accum;
  }, {});
}

export function pickEqualProps<T extends object, V extends T>(parent: T, child: V): V {
  return Object.keys(parent).reduce<Partial<T>>(
    (accum, key) => {
      if (key in child) {
        (<V>accum)[key as keyof V] = child[key as keyof V];
      }

      return accum;
    },
    {} as unknown as V,
  ) as V;
}

export function selectObjectProps<T extends object, K extends Array<keyof T> = Array<keyof T>>(
  object: T,
  props: K,
): { [Key in K[number]]: T[Key] } {
  return props.reduce((accum, key) => {
    if (key in object) (accum as unknown)[key] = object[key];

    return accum;
  }, {}) as { [Key in K[number]]: T[Key] };
}

export function setObjectValues<T extends object>(object: T, value: T[keyof T]): T {
  return Object.entries(object).reduce<T>(
    (accum, [key]) => {
      accum[key as keyof T] = value;

      return accum;
    },
    {} as unknown as T,
  );
}

export function findIndexByProp<T, K extends keyof T>(items: T[], prop: K, value: T[K]): number {
  return items.findIndex(curr => curr[prop] === value);
}

export function removeItemByProp<T>(items: T[], item: T, prop: keyof T): T[] {
  return items.filter(curr => curr[prop] !== item[prop]);
}

export function removeItem<T>(items: T[], item: T): T[] {
  return items.filter(curr => curr !== item);
}

export function updateItem<T>(items: T[], item: Partial<T> | T, prop: keyof T): T[] {
  const currentIdx: number = findIndexByProp(items, prop, item[prop] as T[keyof T]);

  if (~currentIdx) {
    const updatedItem: T = assign(items[currentIdx], item);

    items[currentIdx] = updatedItem;

    return items.concat();
  }

  return items;
}

export function findAndMergeItems<T extends object>(
  newItems: T[],
  currentItems: T[],
  prop: keyof T,
): T[] {
  currentItems = currentItems.concat();

  newItems.forEach(item => {
    const idx: number = findIndexByProp(currentItems, prop, item[prop]);

    if (~idx) {
      currentItems[idx] = assign(currentItems[idx], item);
    }
  });

  return currentItems;
}

export function createRangeArray(from: number, to: number): number[] {
  const length: number = to - from;

  return Array.from({ length }, (v, i) => from + i);
}

export function toFixed(num: number | string, fixed: number): number {
  num = String(num);

  const isFractional: boolean = String(num).includes('.');

  if (!isFractional) return Number(num);

  const [integer, float] = num.split('.');

  if (fixed === 0) {
    return Number(integer);
  }
  const slicedFloatValue: string = float.slice(0, fixed);
  const value: string = `${integer}.${slicedFloatValue}`;

  return Number(value);
}

export function sumNumber(a: number, b: number, action: TMathAction): number {
  const isFloat: boolean = !Number.isInteger(b);

  if (isFloat) {
    a = +(a * 100).toFixed(0);
    b = +(b * 100).toFixed(0);
  }

  const value: number = action === 'inc' ? a + b : a - b;

  return isFloat ? value / 100 : value;
}

export function toTag(str: string): string {
  return `{{${str}}}`;
}

export function replaceTags(str: string, tagsObj: TagsMap): string {
  if (isNullish(str) || isNullish(tagsObj)) return str;

  return Object.entries(tagsObj).reduce((accum: string, [key, value]) => {
    const regex: RegExp = new RegExp(toTag(key), 'gi');

    if (isJSType(value, 'function')) value = (value as any)();

    return accum.replace(regex, value as string);
  }, str);
}

export function getEnumMap<T, V = number>(enumObj: T): { keys: string[]; values: V[] } {
  const enumSerialize: unknown[] = Object.values(enumObj);
  const enumMap: ReturnType<typeof getEnumMap<typeof enumObj, V>> = { keys: [], values: [] };

  for (const key of enumSerialize) {
    const value: T[keyof T] = enumObj[key as keyof T];
    const isEndCycle: boolean = enumMap.keys.includes(value as any);

    if (isEndCycle) break;
    else {
      enumMap.keys.push(key as string);
      enumMap.values.push(value as any);
    }
  }

  return enumMap;
}

export function wrapToArray<T>(value: T | T[]): T[] {
  const array: T[] = [];

  return array.concat(value);
}

export function serializeSimpleChanges<T extends object>(changes: SimpleChanges): T {
  return Object.entries(changes).reduce<T>(
    (
      accum: T,
      [
        key,
        simpleChanges,
      ]: [
        string,
        SimpleChange,
      ],
    ) => {
      accum[key as keyof T] = simpleChanges.currentValue;

      return accum;
    },
    {} as T,
  );
}

export function fillObject<T extends object, V extends T[keyof T]>(obj: T, value: V): T {
  return Object.entries(obj).reduce<T>(
    (
      accum: T,
      [
        key,
      ],
    ) => {
      accum[key as keyof T] = value;

      return accum;
    },
    {} as T,
  );
}

export function recordObject<const T extends readonly string[], V = null>(
  fields: T,
  value: V,
): Record<T[number], V> {
  return fields.reduce<Record<T[number], V>>(
    (accum: Record<T[number], V>, field: T[number]) => {
      accum[field] = value;

      return accum;
    },
    {} as Record<T[number], V>,
  );
}

export function makeReadonlySignal<T = unknown>(signal: Signal<T> | WritableSignal<T>): Signal<T> {
  return isWritableSignal(signal) ? signal.asReadonly() : signal;
}

export function deepReplaceValue<T>(
  entity: T,
  targetValue: unknown = '',
  replaceWith: unknown = null,
): T {
  if (Array.isArray(entity)) {
    return entity.map(item => deepReplaceValue(item, targetValue, replaceWith)) as T;
  } else if (isObject(entity)) {
    const result = {} as T;
    for (const key in entity) {
      result[key] = deepReplaceValue(entity[key], targetValue, replaceWith);
    }

    return result;
  } else {
    return entity === targetValue ? (replaceWith as T) : entity;
  }
}
