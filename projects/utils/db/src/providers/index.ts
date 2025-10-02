/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Provider } from '@angular/core';

import { StaticDB } from '../services';
import { ROOT_DB } from '../tokens';

export function provideRootDB<DB extends object>(db: DB): Provider {
  return {
    provide: ROOT_DB,
    useFactory(): StaticDB<DB> {
      return new StaticDB(db);
    },
  };
}

export function useRootDB<DB extends object>(): StaticDB<DB> {
  return inject(ROOT_DB);
}

export function useDB<DB extends object>(db: DB): StaticDB<DB> {
  return new StaticDB(db);
}
