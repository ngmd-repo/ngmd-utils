import { Directive, HostListener, input, InputSignal } from '@angular/core';
import { redirectTo } from '@ngmd/utils/handlers';

@Directive({
  selector: '[ngLink]',
})
export class LinkDirective {
  public url: InputSignal<string> = input.required({ alias: 'ngLink' });

  @HostListener('click')
  public navigate(): void {
    if (this.url) {
      redirectTo(this.url());
    }
  }
}
