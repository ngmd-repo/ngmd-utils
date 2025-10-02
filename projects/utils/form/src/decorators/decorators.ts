import { FormGroup } from '@angular/forms';

import { isDisabledForm } from '../handlers/form.handlers';

export function DisabledFormStatus<F extends (form: FormGroup) => boolean>(
  formKey: string = 'form',
  callbacks: (F | string)[] = [],
): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        const disabled: boolean = callbacks
          .map((cb) => (typeof cb === 'string' ? this[cb]() : cb(this[formKey])))
          .some(Boolean);

        return isDisabledForm(this[formKey]) || disabled;
      },
    });
  };
}
