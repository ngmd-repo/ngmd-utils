import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notEqual',
})
export class NotEqualPipe implements PipeTransform {
  public transform(value: unknown, compareValue: unknown): boolean {
    return value !== compareValue;
  }
}
