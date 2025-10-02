import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TITLE_STRATEGY_CONFIG } from '../tokens';
import { TitleStrategyConfig } from '../types';

@Injectable()
export class TitleStrategyService extends TitleStrategy {
  private titleConfig: TitleStrategyConfig = inject(TITLE_STRATEGY_CONFIG);
  private title: Title = inject(Title);

  public override updateTitle(snapshot: RouterStateSnapshot): void {
    const buildTitle: string = this.buildTitle(snapshot);

    if (Boolean(buildTitle)) {
      const title: string = this.titleConfig.handler(buildTitle);

      this.title.setTitle(title);
    }
  }
}
