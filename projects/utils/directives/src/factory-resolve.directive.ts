import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  inject,
  Injector,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TShowState } from '@ngmd/utils/types';

@Directive({
  selector: '[ngFactoryResovle]',
})
export abstract class FactoryResolveDirective<T> {
  protected tpl: TemplateRef<T> = inject(TemplateRef);
  protected viewContainer: ViewContainerRef = inject(ViewContainerRef);
  protected injector: Injector = inject(Injector);
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private _showState: TShowState = 'hide';

  protected get showState(): TShowState {
    return this._showState;
  }

  protected set showState(value: TShowState) {
    this._showState = value;
  }

  protected insertComponent(componentType: Type<T>): ComponentRef<T> {
    this.clearContainer();

    const componentRef: ComponentRef<T> = this.viewContainer.createComponent(componentType, {
      index: 0,
      injector: this.injector,
    });

    this.setShowState('show');
    this.cdr.detectChanges();

    return componentRef;
  }

  protected removeComponent(): void {
    this.clearContainer();
    this.cdr.detectChanges();
  }

  protected insertTemplate(context: unknown = null): void {
    this.clearContainer();
    this.viewContainer.createEmbeddedView(this.tpl, context);
    this.setShowState('show');
    this.cdr.detectChanges();
  }

  protected clearContainer(): void {
    this.viewContainer.clear();
    this.setShowState('hide');
    this.cdr.detectChanges();
  }

  protected setShowState(state: TShowState): void {
    this.showState = state;
  }
}
