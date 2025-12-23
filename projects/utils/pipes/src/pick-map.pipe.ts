import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pickMap',
})
export class PickMapPipe implements PipeTransform {
  public transform<T extends object>(items: T[], pickedProp: keyof T): Array<T[keyof T]> {
    if (Array.isArray(items)) {
      return items.map(item => item[pickedProp]);
    }

    return null;
  }
}
