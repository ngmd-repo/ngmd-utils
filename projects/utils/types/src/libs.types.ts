import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

//  *RxJS

export type TRxSubject<T> = BehaviorSubject<T> | ReplaySubject<T> | Subject<T>;

// *Typescript

export type TConstructor<T = object> = new (...args: any[]) => T;
export type TEntries<T extends object, K extends keyof T = keyof T> = (K extends infer Key
  ? [Key, T[K]]
  : [K, T[K]])[];

export type TTitleCase<T extends string> = T extends `${infer F}${infer L}`
  ? `${Uppercase<F>}${L}`
  : T;
export type TKeys<T> = keyof T;
export type TExtractValues<T, K extends T> = K;
export type TKeysFiller<T extends object, V> = {
  [K in keyof T]?: V;
};
export type TKeyValue<K, V> = {
  key: K;
  value: V;
};
export type TEnumKeys<T = object> = keyof T;
export type TEnumValues<T = object> = T[TEnumKeys<T>];

export type TMixedRequired<T extends object, R extends keyof T> = Partial<Omit<T, R>> & {
  [K in R]: T[K];
};

//  *JS
export type TJSDataType =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';
