import { deepCopy, deepCopyArray, isObject } from '@ngmd/utils/handlers';

import { TIsCopyResult } from '../types';

export function getDataFromDB<T extends object, K1 extends keyof T, C extends boolean = true>(
  db: T,
  keys: [K1],
  copy?: C,
): TIsCopyResult<T[K1], C>;
export function getDataFromDB<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  C extends boolean = true,
>(db: T, keys: [K1, K2], copy?: C): TIsCopyResult<T[K1][K2], C>;
export function getDataFromDB<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  C extends boolean = true,
>(db: T, keys: [K1, K2, K3], copy?: C): TIsCopyResult<T[K1][K2][K3], C>;
export function getDataFromDB<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  C extends boolean = true,
>(db: T, keys: [K1, K2, K3, K4], copy?: C): TIsCopyResult<T[K1][K2][K3][K4], C>;

export function getDataFromDB(db: object, keys: string[], copy: boolean = true): unknown {
  const result = keys.reduce<any>((accum, key) => accum[key], db);
  if (!copy) return result;

  return isObject(result)
    ? deepCopy(result)
    : Array.isArray(result)
      ? deepCopyArray(result)
      : result;
}
