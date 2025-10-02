import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisabledDirective } from './directives/disabled.directive';
import { FormDisabledDirective } from './directives/form-disabled.directive';
import { UpdateFormValueDirective } from './directives/update-form-value.directive';

const imports: Type<unknown>[] = [
  FormsModule,
  // *Directives
  DisabledDirective,
  FormDisabledDirective,
  UpdateFormValueDirective,
];

@NgModule({
  imports: [
    ...imports,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  exports: [...imports, ReactiveFormsModule],
})
export class UtilsFormModule {}
