import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { getProvideKey, TProvideKey } from '@ngmd/utils/src';

import { TitleStrategyService } from '../services';
import { TITLE_STRATEGY_CONFIG } from '../tokens';
import { TitleStrategyConfig } from '../types';

function makeTitleStrategyConfigProvider(
  config: TitleStrategyConfig | (() => TitleStrategyConfig),
): Provider {
  const useKey: TProvideKey = getProvideKey(config);
  const provider = {
    provide: TITLE_STRATEGY_CONFIG,
    [useKey]: config,
  };

  return provider as unknown as Provider;
}

export function provideTitleStrategy(
  config: TitleStrategyConfig | (() => TitleStrategyConfig),
): EnvironmentProviders {
  const configProvider: Provider = makeTitleStrategyConfigProvider(config);

  return makeEnvironmentProviders([
    {
      provide: TitleStrategy,
      useClass: TitleStrategyService,
    },
    TitleStrategyService,
    configProvider,
  ]);
}
