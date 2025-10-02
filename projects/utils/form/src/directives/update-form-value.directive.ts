import { Directive, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[ngUpdateFormValue]',
  exportAs: 'formValueRef',
})
export class UpdateFormValueDirective {
  @Input('ngUpdateFormValueType')
  public type: 'control' | 'form' = 'form';
  @Input('formControl')
  public formControl: FormControl = null;
  @Input('formGroup') public formGroup: FormGroup = null;

  @Input('ngUpdateFormValue')
  public ngUpdateFormValue(value: unknown): void {
    const el$: FormControl | FormGroup = this.getControlElement();

    if (el$) {
      this.update(el$, value);
    } else {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      setTimeout(this.update, 0, el$, value);
    }
  }

  private getControlElement(): FormControl | FormGroup {
    return this.type === 'form' ? this.formGroup : this.formControl;
  }

  private update(el$: FormControl | FormGroup, value: unknown): void {
    el$.patchValue(value);
  }

  public getValue(): unknown {
    const el$: FormControl | FormGroup = this.getControlElement();

    return el$.value;
  }
}
