import { InjectionToken } from '@angular/core';

import { TitleStrategyConfig } from '../types';

export const TITLE_STRATEGY_CONFIG = new InjectionToken<TitleStrategyConfig>(
  'title-strategy-config',
);
