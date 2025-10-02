import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngSwitchContainDefault]',
})
export class SwitchContainDefaultDirective {
  // * Inject
  private tpl$: TemplateRef<unknown> = inject(TemplateRef);
  private viewContainer$: ViewContainerRef = inject(ViewContainerRef);

  public insert(): void {
    this.viewContainer$.createEmbeddedView(this.tpl$).detectChanges();
  }

  public remove(): void {
    this.viewContainer$.clear();
  }
}
