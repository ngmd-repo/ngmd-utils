import { Pipe, PipeTransform } from '@angular/core';
import { isDate, isJSType } from '@ngmd/utils/handlers';
import { TJSDataType } from '@ngmd/utils/types';

@Pipe({
  name: 'isJSType',
})
export class JsTypePipe implements PipeTransform {
  public transform(value: unknown, type: TJSDataType | 'date'): boolean {
    switch (type) {
      case 'date': {
        return isDate(value);
      }
      default: {
        return isJSType(value, type);
      }
    }
  }
}
