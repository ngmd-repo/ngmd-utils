import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import {
  assign,
  excludeObjValues,
  isEmptyObject,
  isValidDate,
  replace,
} from '@ngmd/utils/handlers';
import { ISimple } from '@ngmd/utils/interfaces';

import { TDateRange, TFormErrorEntry } from '../types/form.types';

export function completeFormCtrlErrors(
  errors: ValidationErrors | unknown,
  errorsDb: ISimple<string>,
  defaultTagsValues: object = {},
): string[] {
  if (!errors) return null;

  // * TODO ADD Errors DB to first parameter
  const errorsDB: ISimple<string> = assign({}, errorsDb);

  return Object.entries(errors).reduce(
    (accum: string[], [errorKey, errorValue]: TFormErrorEntry) => {
      const errorWithTags: string = errorsDB[errorKey] || `Incorrect input`;
      const errorTagsValuesObject: object = Object.assign(defaultTagsValues, errorValue);
      const completedErrorMsg: string = Object.entries(errorTagsValuesObject).reduce(
        (errorMsg, [tag, value]) => {
          errorMsg = replace(errorMsg, `{{${tag}}}`, value);

          return errorMsg;
        },
        errorWithTags,
      );

      accum.push(completedErrorMsg);

      return accum;
    },
    [],
  );
}

export function isDisabledForm(form: FormGroup, ...flags: boolean[]): boolean {
  const { disabled, invalid, pristine } = form;

  return disabled || invalid || pristine || flags.includes(true);
}

export function makePureFilter<T extends object>(
  filter: T,
  ...values: any[]
): Partial<T> | T | null {
  values = values.length ? values : [null, ''];
  const pureFilter: Partial<T> | T = excludeObjValues(filter, values);

  return isEmptyObject(pureFilter) ? null : pureFilter;
}

export function isEmptyFilter(form: FormGroup): boolean {
  return Boolean(makePureFilter(form.value));
}

export function dateStartReset<T extends Date | string>(
  date: T,
  position: TDateRange,
  toJSON: boolean = true,
): Date | string {
  if (!date || !isValidDate(date)) return null;

  const resetDate: Date = new Date(date);
  type TDateReset = [number, number, number, number];
  const startTime: TDateReset = [
    0,
    0,
    0,
    0,
  ];
  const endTime: TDateReset = [
    23,
    59,
    59,
    59,
  ];

  const time: number[] = position === 'dateFrom' ? startTime : endTime;

  resetDate.setHours(...(time as TDateReset));

  if (toJSON) return resetDate.toJSON();

  return resetDate;
}

export function resetControls(form: FormGroup, controls: string[]): void {
  controls.forEach(c => form.get(c)?.reset());
}

export function updateValueAndValidity<
  T extends FormGroup,
  Controls extends Array<keyof T['controls']>,
>(
  form: T,
  controls: Controls = Object.keys(form.controls) as Controls,
  opts?: {
    emitEvent?: boolean;
    onlySelf?: boolean;
  },
): void {
  controls.forEach(c => form.get(c as string)?.updateValueAndValidity(opts));
}

export function updateTreeValidity(
  group: FormArray | FormGroup,
  opts?: {
    emitEvent?: boolean;
    onlySelf?: boolean;
  },
): void {
  Object.values(group.controls).forEach((control: AbstractControl): void => {
    if (control instanceof FormGroup || control instanceof FormArray) {
      updateTreeValidity(control, opts);
    } else {
      control.updateValueAndValidity(opts);
    }
  });
}

export function clearValidators(
  form: FormGroup,
  controls: string[],
  opts?: {
    emitEvent?: boolean;
    onlySelf?: boolean;
  },
): void {
  controls.forEach(c => {
    form.get(c)?.clearValidators();
    form.get(c)?.updateValueAndValidity(opts);
  });
}

// * forms values decorators

export function decorateFormValueReplaceValues<V extends object>(
  formValue: V,
  controlsNames: Array<keyof V>,
  fromValue: V[keyof V],
  toValue: V[keyof V],
): void {
  controlsNames.forEach((c: keyof V) => {
    const controlValue: V[keyof V] = formValue[c];
    const isCanChange: boolean = c in formValue && controlValue === fromValue;

    if (isCanChange) {
      formValue[c] = toValue;
    }
  });
}
