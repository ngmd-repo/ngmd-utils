import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '@ngmd/utils/handlers';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {
  public transform<T extends object>(value: T, key: keyof T): T[typeof key] | null {
    return isObject(value) ? value[key] : null;
  }
}
