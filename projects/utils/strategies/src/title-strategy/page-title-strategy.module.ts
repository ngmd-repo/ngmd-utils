import { ModuleWithProviders, NgModule } from '@angular/core';
import { TitleStrategy } from '@angular/router';

import { TitleStrategyService } from './services';
import { TITLE_STRATEGY_CONFIG } from './tokens';
import { TitleStrategyConfig } from './types';

/**
 * @deprecated use only provideTitleStrategy (https://md-utils.web.app/strategies/provide-title-strategy)
 */
@NgModule({})
export class UtilsPageTitleStrategyModule {
  /**
   * @deprecated use only provideTitleStrategy
   */
  public static forRoot(
    config?: TitleStrategyConfig,
  ): ModuleWithProviders<UtilsPageTitleStrategyModule> {
    return {
      ngModule: UtilsPageTitleStrategyModule,
      providers: [
        TitleStrategyService,
        {
          provide: TitleStrategy,
          useClass: TitleStrategyService,
        },
        {
          provide: TITLE_STRATEGY_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
