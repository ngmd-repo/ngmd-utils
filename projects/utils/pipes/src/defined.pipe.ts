import { Pipe, PipeTransform } from '@angular/core';
import { isNotNullish } from '@ngmd/utils/handlers';

@Pipe({
  name: 'defined',
})
export class DefinedPipe implements PipeTransform {
  public transform(value: unknown): boolean {
    return isNotNullish(value);
  }
}
