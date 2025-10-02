import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

//  * Validations
export type TRange = 'max' | 'min';

export type TDateRange = 'dateFrom' | 'dateTo';
// *Form Controls

export type TAllowStatus = 'disabled' | 'enabled';
export type TimeValue = 'hours' | 'minutes';
export type TFormMode = 'create' | 'edit';
export type TMask =
  | 'default'
  | 'iban'
  | 'lowercase'
  | 'number'
  | 'phone'
  | 'sort-routing'
  | 'string'
  | 'swift'
  | 'tax'
  | 'uppercase';

//  ! Errors types

export type TFormErrorEntry = [string, unknown];

// * FormValidator Types

export type TAsyncDebounceParams<T> = [(v: unknown) => Observable<T>, (v: T) => ValidationErrors];

export type TForm<T extends object> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
