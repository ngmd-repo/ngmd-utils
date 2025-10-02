import {
  Directive,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

@Directive({
  selector: '[ngToggleClass]',
})
export class ToggleCssClassDirective implements OnChanges {
  // * Inputs
  public ngToggleClass: InputSignal<string> = input.required();

  private el$: ElementRef<HTMLElement> = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  public ngOnChanges(changes: SimpleChanges): void {
    const {
      ngToggleClass: { previousValue, currentValue, firstChange },
    } = changes;

    this.removeClassName(previousValue as string);

    if (Boolean(currentValue)) {
      firstChange
        ? setTimeout(() => {
            this.addClassName(currentValue as string);
          })
        : this.addClassName(currentValue as string);
    }
  }

  private removeClassName(className: string): void {
    const el$: HTMLElement = nativeElement(this.el$);

    this.renderer.removeClass(el$, className);
  }

  private addClassName(className: string): void {
    const el$: HTMLElement = nativeElement(this.el$);

    this.renderer.addClass(el$, className);
  }
}
