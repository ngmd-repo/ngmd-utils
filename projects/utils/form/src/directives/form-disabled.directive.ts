import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TAllowStatus } from '../types/form.types';

@Directive({
  selector: '[ngFormDisabled]',
})
export class FormDisabledDirective {
  @Input('formGroup') public formGroup: FormGroup;

  // TODO: replace setter -> ngOnChanges
  @Input('ngFormDisabled')
  public set ngFormDisabled(value: boolean) {
    const method: 'disable' | 'enable' = value ? 'disable' : 'enable';

    this.formGroup[method]();

    const status: TAllowStatus = method === 'disable' ? 'disabled' : 'enabled';

    this._setDisabledState.emit(status);
  }

  @Output('setDisabledState')
  public _setDisabledState: EventEmitter<TAllowStatus> = new EventEmitter<TAllowStatus>();
}
