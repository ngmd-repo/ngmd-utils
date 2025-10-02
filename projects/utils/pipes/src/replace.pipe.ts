import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, regExp: RegExp | string, replacement: string = ''): string {
    if (typeof regExp === 'string') {
      regExp = new RegExp(regExp, 'gi');
    }

    return value.replace(regExp, replacement);
  }
}
