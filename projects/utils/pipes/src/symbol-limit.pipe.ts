import { Pipe, PipeTransform } from '@angular/core';
import { isNullish } from '@ngmd/utils/handlers';

@Pipe({
  name: 'symbolLimit',
})
export class SymbolLimit implements PipeTransform {
  public transform(value: number | string, limit: number, endsWith: string = '...'): string {
    if (isNullish(value)) return null;

    const stringValue = String(value);

    if (stringValue.length > limit) {
      return stringValue.slice(0, limit).concat(endsWith);
    }

    return stringValue;
  }
}
