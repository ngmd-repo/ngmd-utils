/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Provider } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { createApiHubFactory } from '../handlers';
import { ROOT_API_HUB } from '../tokens';
import { ApiHub, ApiHubConfig, TApiHub } from '../types';

export function provideRootApiHub<T extends TApiHub<T>>(Hub: TConstructor<T>): Provider {
  return {
    provide: ROOT_API_HUB,
    useFactory: createApiHubFactory(Hub),
  };
}

export function provideApiHub<T extends TApiHub<T>>(Hub: TConstructor<T>): Provider {
  return {
    provide: Hub,
    useFactory: createApiHubFactory(Hub),
  };
}

export function useRootApiHub<T extends TApiHub<T>>(config?: ApiHubConfig<T>): ApiHub<T> {
  const hub: ApiHub<T> = inject(ROOT_API_HUB);

  if (config) hub.hub['initConfigInUseContext'](config);

  return hub;
}

export function useApiHub<T extends TApiHub<T>>(
  Hub: TConstructor<T>,
  config?: ApiHubConfig<T>,
): ApiHub<T> {
  const hub: ApiHub<T> = inject(Hub);

  if (config) hub.hub['initConfigInUseContext'](config);

  return hub;
}
