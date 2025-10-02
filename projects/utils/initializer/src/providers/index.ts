import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
  Provider,
} from '@angular/core';

import { StrategyInitializerFeatures, UtilsInitializerFeatures } from '../features';
import { InitializeMeta } from '../interfaces/initialize-meta.interface';
import { InitializeService } from '../services';

export function provideUtilsInitializer(
  meta: InitializeMeta,
  strategyFeature: StrategyInitializerFeatures,
  ...features: UtilsInitializerFeatures[]
): EnvironmentProviders {
  const providers: Provider[] = (features as Provider[]).concat([
    strategyFeature,
    InitializeService,
    provideAppInitializer(() => {
      const initializeService = inject(InitializeService);

      return initializeService.initialize(meta);
    }),
  ]);

  return makeEnvironmentProviders(providers);
}
