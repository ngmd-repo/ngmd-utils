import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Directive,
  effect,
  EffectRef,
  ElementRef,
  inject,
  input,
  InputSignalWithTransform,
} from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

@Directive({
  selector: '[ngFocus]',
})
export class FocusDirective {
  // * Inputs
  public ngFocus: InputSignalWithTransform<boolean, boolean | ''> = input<boolean, boolean | ''>(
    true,
    {
      transform: (value: boolean | ''): boolean => {
        return value === true || value === '' ? true : false;
      },
    },
  );

  // * Inject
  private $el: ElementRef<HTMLElement> = inject(ElementRef);
  private focusMonitor: FocusMonitor = inject(FocusMonitor);

  // * Effects
  private focusEffect: EffectRef = effect(() => queueMicrotask(() => this.focus(this.ngFocus())));

  public focus(isFocused: boolean): void {
    const $el: HTMLElement = nativeElement(this.$el);

    if (isFocused) {
      this.focusMonitor.focusVia($el, 'program');
      nativeElement(this.$el).click(); // ! Убрать после того, как откажемся от @angular/material
    }
  }
}
