import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

@Directive({
  selector: '[ngClosest]',
})
export class ClosestDirective {
  // * Inputs
  public takeSelectors: InputSignal<string[] | string> = input.required({ alias: 'ngClosest' });
  // * Outputs
  public closest: OutputEmitterRef<boolean> = output();

  // * Inject
  private el$: ElementRef<HTMLElement> = inject(ElementRef);

  @HostListener('window:click', ['$event'])
  private click(e: Event): void {
    const el: HTMLElement = nativeElement(this.el$);

    const classList: string = Array.from(el.classList).reduce(
      (accum: string, className: string) => (accum += `.${className}`),
      '',
    );
    let parentSelectors: string[] = [classList];

    if (this.takeSelectors()) {
      parentSelectors = parentSelectors.concat(this.takeSelectors());
    }

    const isContain: boolean = parentSelectors.some(selector =>
      (e.target as HTMLElement).closest(selector),
    );

    this.closest.emit(isContain);
  }
}
