import { Pipe, PipeTransform } from '@angular/core';
import { isEqual, isNullish } from '@ngmd/utils/handlers';

@Pipe({
  name: 'defaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  public transform<T, V>(value: T, defaultValue: V): T | V {
    const isShowDefaultValue: boolean = isNullish(value) || isEqual(value, '');

    return isShowDefaultValue ? defaultValue : value;
  }
}
