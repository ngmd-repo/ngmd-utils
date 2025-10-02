/* eslint-disable @typescript-eslint/naming-convention */
import { inject } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { HttpStore } from '../services/http-store.service';
import { ROOT_HTTP_STORE } from '../tokens';
import { THttpMetaStore } from '../types';

/**
 * @deprecated use @ngmd/requests
 */
export function useHttpRootStore<T extends THttpMetaStore<T>>(): HttpStore<T> {
  return inject(ROOT_HTTP_STORE) as HttpStore<T>;
}

/**
 * @deprecated use @ngmd/requests
 */
export function useHttpStore<T extends THttpMetaStore<T>>(Store: TConstructor<T>): HttpStore<T> {
  return inject(Store) as HttpStore<T>;
}
