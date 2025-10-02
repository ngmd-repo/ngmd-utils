import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exist',
})
export class ExistPipe implements PipeTransform {
  public transform<T>(value: T, array: T[] = []): boolean {
    return array.includes(value);
  }
}
