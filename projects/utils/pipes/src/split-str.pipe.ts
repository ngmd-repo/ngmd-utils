import { Pipe, PipeTransform } from '@angular/core';
import { isNullish } from '@ngmd/utils/handlers';

@Pipe({
  name: 'splitString',
})
export class SplitStringPipe implements PipeTransform {
  public transform(value: number | string, separator: string = ''): string[] {
    if (isNullish(value)) return null;

    return String(value).split(separator);
  }
}
