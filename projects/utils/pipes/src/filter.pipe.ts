import { Pipe, PipeTransform } from '@angular/core';
import { isNullish } from '@ngmd/utils/handlers';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  public transform<T extends object>(array: T[], field: keyof T, findStr: string): T[] {
    if (isNullish(findStr)) return array;
    else {
      return array.filter((item: T) => {
        const itemValue: string = String(item[field]).toLocaleLowerCase();
        const stringValue: string = String(findStr).toLocaleLowerCase();

        return itemValue.includes(stringValue);
      });
    }
  }
}
