import { Pipe, PipeTransform } from '@angular/core';
import { wrapToArray } from '@ngmd/utils/handlers';

@Pipe({
  name: 'wrapToArray',
})
export class WrapToArrayPipe implements PipeTransform {
  public transform<T>(value: T | T[]): T[] {
    return wrapToArray(value);
  }
}
