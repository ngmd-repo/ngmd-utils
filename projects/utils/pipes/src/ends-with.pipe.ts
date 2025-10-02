import { Pipe, PipeTransform } from '@angular/core';
import { isJSType } from '@ngmd/utils/handlers';

@Pipe({
  name: 'endsWith',
})
export class EndsWithPipe implements PipeTransform {
  public transform(value: string, suffix: string): boolean {
    if (isJSType(value, 'string')) {
      return value.endsWith(suffix);
    }

    return false;
  }
}
