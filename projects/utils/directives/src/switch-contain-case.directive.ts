import {
  Directive,
  inject,
  input,
  InputSignal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngSwitchContainCase]',
})
export class SwitchContainCaseDirective {
  // * Inputs
  public values: InputSignal<unknown[]> = input.required({ alias: 'ngSwitchContainCase' });

  // * Inject
  private tpl$: TemplateRef<unknown> = inject(TemplateRef);
  private viewContainer$: ViewContainerRef = inject(ViewContainerRef);

  public insert(): void {
    this.viewContainer$.createEmbeddedView(this.tpl$).detectChanges();
  }

  public remove(): void {
    this.viewContainer$.clear();
  }

  public isContain(value: unknown): boolean {
    return this.values().includes(value);
  }
}
