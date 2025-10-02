/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */

import { getDataFromDB, TIsCopyResult } from '@ngmd/utils/db';

import { OnInitManager } from '../../../../interfaces';

export type TExcludeDatabaseFields = Extract<keyof DatabaseManager<any>, '__db__' | 'init'>;
export class DatabaseManager<DB extends object> implements OnInitManager {
  constructor(public __db__: DB) {}

  public init(serviceInstance: any): void {
    serviceInstance.__db__ = this.__db__;
  }

  public getDataFromDB<V = null, K1 extends keyof DB = keyof DB, IsCopy extends boolean = true>(
    keys: [K1],
    isCopy?: IsCopy,
  ): V extends null ? TIsCopyResult<DB[K1], IsCopy> : V;

  public getDataFromDB<
    V = null,
    K1 extends keyof DB = keyof DB,
    K2 extends keyof DB[K1] = keyof DB[K1],
    IsCopy extends boolean = true,
  >(keys: [K1, K2?], isCopy?: IsCopy): V extends null ? TIsCopyResult<DB[K1][K2], IsCopy> : V;

  public getDataFromDB<
    V = null,
    K1 extends keyof DB = keyof DB,
    K2 extends keyof DB[K1] = keyof DB[K1],
    K3 extends keyof DB[K1][K2] = keyof DB[K1][K2],
    IsCopy extends boolean = true,
  >(
    keys: [K1, K2?, K3?],
    isCopy?: IsCopy,
  ): V extends null ? TIsCopyResult<DB[K1][K2][K3], IsCopy> : V;

  public getDataFromDB<
    V = null,
    K1 extends keyof DB = keyof DB,
    K2 extends keyof DB[K1] = keyof DB[K1],
    K3 extends keyof DB[K1][K2] = keyof DB[K1][K2],
    K4 extends keyof DB[K1][K2][K3] = keyof DB[K1][K2][K3],
    IsCopy extends boolean = true,
  >(
    keys: [K1, K2?, K3?, K4?],
    isCopy?: IsCopy,
  ): V extends null ? TIsCopyResult<DB[K1][K2][K3][K4], IsCopy> : V;

  public getDataFromDB<V>(keys: string[], isCopy?: boolean): V {
    return getDataFromDB(this.__db__, keys as any, isCopy) as V;
  }
}
