import { Pipe, PipeTransform } from '@angular/core';

import { ExistPipe } from './exist.pipe';

@Pipe({
  name: 'notExist',
})
export class NotExistPipe extends ExistPipe implements PipeTransform {
  public override transform<T>(value: T, array: T[] = []): boolean {
    return !super.transform(value, array);
  }
}
