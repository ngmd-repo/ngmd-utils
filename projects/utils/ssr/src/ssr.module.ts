import { NgModule, Type } from '@angular/core';

import { BrowserRenderDirective, ServerRenderDirective } from './directives';

const imports: Type<unknown>[] = [BrowserRenderDirective, ServerRenderDirective];

@NgModule({
  imports,
  exports: imports,
})
export class SsrModule {}
