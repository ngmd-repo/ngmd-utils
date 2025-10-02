import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {
  public transform<T extends object>(value: T, key: keyof T): T[typeof key] | null {
    return Boolean(value) ? value[key] : null;
  }
}
