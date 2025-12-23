import { Pipe, PipeTransform } from '@angular/core';
import { isJSType } from '@ngmd/utils/handlers';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, regExp: RegExp | string, replacement: string = ''): string {
    if (!isJSType(value, 'string')) return value;

    if (typeof regExp === 'string') {
      regExp = new RegExp(regExp, 'gi');
    }

    return value.replace(regExp, replacement);
  }
}
