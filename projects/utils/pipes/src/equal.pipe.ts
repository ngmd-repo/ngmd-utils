import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equal',
})
export class EqualPipe implements PipeTransform {
  public transform(predicate: unknown, value: unknown): boolean {
    return predicate === value;
  }
}
