import { Pipe, PipeTransform } from '@angular/core';
import { isNullish } from '@ngmd/utils/handlers';

@Pipe({
  name: 'notDefined',
})
export class NotDefinedPipe implements PipeTransform {
  public transform(value: unknown): boolean {
    return isNullish(value);
  }
}
