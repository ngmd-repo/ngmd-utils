import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbollimit',
})
export class SymbolLimit implements PipeTransform {
  public transform(value: number | string, limit: number, endsWith: string = '...'): string {
    const stringValue = String(value);

    if (stringValue.length > limit) {
      return stringValue.slice(0, limit).concat(endsWith);
    }

    return stringValue;
  }
}
