import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNotNullish, isNullish } from '@ngmd/utils/handlers';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';

import { TAsyncDebounceParams } from '../types/form.types';

export class FormValidator {
  public static excludeSpaces(ctrl: AbstractControl): ValidationErrors {
    const { value } = ctrl;

    return isNotNullish(value) && !~String(value).search(' ') ? null : { excludeSpaces: true };
  }

  public static asyncDebounce<T>(
    [request$, errorChecker]: TAsyncDebounceParams<T>,
    ms: number = 400,
  ): AsyncValidatorFn {
    const sub$: BehaviorSubject<unknown> = new BehaviorSubject(null);
    const errorCheckSub$: Observable<ValidationErrors> = sub$.pipe(
      distinctUntilChanged(),
      debounceTime(ms),
      switchMap(request$),
      map(errorChecker),
      take(1),
    );

    return (ctrl: AbstractControl): Observable<ValidationErrors> | Promise<ValidationErrors> => {
      sub$.next(ctrl.value);

      return errorCheckSub$;
    };
  }

  /**
   *
   * @param regex - the parameter must be created via the new RegExp constructor
   *
   * @param errorKey - @\core\modules\form\db\general-error-messages.db.ts
   */
  public static pattern(
    regex: RegExp,
    errorKey: `${string}Pattern`,
    optional: boolean = false,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const { value } = control;
      const isOptional: boolean = optional && (isNullish(value) || value === '');

      if (isOptional) return null;

      const error: ValidationErrors = regex.test(value as string) ? null : { [errorKey]: true };

      return error;
    };
  }
}
