import { getDataFromDB } from '../handlers';
import { TIsCopyResult } from '../types';

export class StaticDB<T extends object> {
  constructor(private db: T) {}

  public get<K1 extends keyof T, C extends boolean = true>(
    keys: [K1],
    copy?: C,
  ): TIsCopyResult<T[K1], C>;
  public get<K1 extends keyof T, K2 extends keyof T[K1], C extends boolean = true>(
    keys: [K1, K2],
    copy?: C,
  ): TIsCopyResult<T[K1][K2], C>;
  public get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    C extends boolean = true,
  >(keys: [K1, K2, K3], copy?: C): TIsCopyResult<T[K1][K2][K3], C>;
  public get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    C extends boolean = true,
  >(keys: [K1, K2, K3, K4], copy?: C): TIsCopyResult<T[K1][K2][K3][K4], C>;

  public get(keys: string[], isCopy?: boolean): unknown {
    return getDataFromDB(this.db, keys as any, isCopy);
  }
}
