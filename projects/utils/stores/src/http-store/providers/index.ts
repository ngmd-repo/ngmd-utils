/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Injector, Provider } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { HttpStore } from '../services/http-store.service';
import { ROOT_HTTP_STORE } from '../tokens';
import { THttpMetaStore } from '../types';

/**
 * @deprecated use @ngmd/requests
 */
export function provideRootHttpStore<Store extends THttpMetaStore<Store>>(
  StoreConstructor: TConstructor<Store>,
): Provider {
  return {
    provide: ROOT_HTTP_STORE,
    useFactory(): HttpStore<Store> {
      const injector: Injector = inject(Injector);
      const store = new HttpStore(StoreConstructor, injector);

      return store as unknown as HttpStore<Store>;
    },
  };
}

/**
 * @deprecated use @ngmd/requests
 */
export function provideHttpStore<T extends THttpMetaStore<T>>(Store: TConstructor<T>): Provider[] {
  return [
    {
      provide: Store,
      useFactory(): HttpStore<T> {
        const injector: Injector = inject(Injector);
        const store = new HttpStore(Store, injector);

        return store as unknown as HttpStore<T>;
      },
    },
  ];
}
