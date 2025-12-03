/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Provider } from '@angular/core';
import { TConstructor } from '@ngmd/utils/types';

import { createGqlHubFactory } from './handlers';
import { GqlHub, GqlHubConfig, TGqlHub } from './types';

export function provideGqlHub<T extends TGqlHub<T>>(Hub: TConstructor<T>): Provider {
  return {
    provide: Hub,
    useFactory: createGqlHubFactory(Hub),
  };
}

export function useGqlHub<T extends TGqlHub<T>>(
  Hub: TConstructor<T>,
  config?: GqlHubConfig<T>,
): GqlHub<T> {
  const hub: GqlHub<T> = inject(Hub);

  if (config) hub.hub['initConfigInUseContext'](config);

  return hub;
}
