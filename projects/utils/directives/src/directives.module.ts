import { NgModule, Type } from '@angular/core';

import { AfkDirective } from './afk-event.directive';
import { ClosestDirective } from './closest.directive';
import { CopyDirective } from './copy.directive';
import { InsertDirective } from './insert.directive';
import { IntersectionDirective } from './intersection.directive';
import { LetDirective } from './let.directive';
import { LinkDirective } from './link.directive';
import { LocatorDirective } from './locator/locator.directive';
import { PageEndpointDirective } from './page-endpoint.directive';
import { SelectorStylesDirective } from './selector-styles.directive';
import { SwitchContainDirective } from './switch-contain.directive';
import { SwitchContainCaseDirective } from './switch-contain-case.directive';
import { SwitchContainDefaultDirective } from './switch-contain-default.directive';
import { TrackByKeyDirective } from './track-by-key.directive';
import { ViewContainerDirective } from './view-container.directive';
import { DownloadDirective } from './download/download.directive';

const imports: Type<unknown>[] = [
  LetDirective,
  PageEndpointDirective,
  SwitchContainDirective,
  SwitchContainCaseDirective,
  SwitchContainDefaultDirective,
  ClosestDirective,
  LinkDirective,
  SelectorStylesDirective,
  CopyDirective,
  TrackByKeyDirective,
  AfkDirective,
  IntersectionDirective,
  InsertDirective,
  LocatorDirective,
  ViewContainerDirective,
  DownloadDirective,
];

@NgModule({
  imports,
  exports: imports,
})
export class UtilsDirectivesModule {}
