import { Directive, HostListener, inject, input, InputSignal } from '@angular/core';
import { TWindowDocument, WINDOW } from '@ngmd/utils/injection';

@Directive({
  selector: '[ngCopy]',
})
export class CopyDirective {
  // * Inputs
  public text: InputSignal<string> = input.required({ alias: 'ngCopy' });

  // * Inject
  private window: TWindowDocument = inject(WINDOW);

  @HostListener('click', ['$event'])
  private handleCopy(e: MouseEvent): void {
    e.stopPropagation();
    this.copy();
  }

  public copy(): void {
    this.window.navigator.clipboard.writeText(this.text());
  }
}
