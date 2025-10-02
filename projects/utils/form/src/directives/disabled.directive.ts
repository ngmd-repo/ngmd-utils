import { Directive, Inject, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ngDisabled]',
})
export class DisabledDirective {
  @Input('ngDisabled')
  public set ngDisabled(value: boolean) {
    this.formControl?.valueAccessor.setDisabledState(Boolean(value));
  }

  constructor(@Optional() @Inject(NgControl) private formControl: NgControl) {}
}
