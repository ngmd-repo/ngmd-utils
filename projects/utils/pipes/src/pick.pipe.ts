import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '@ngmd/utils/handlers';

@Pipe({
  name: 'pick',
})
export class PickPipe implements PipeTransform {
  public transform<T extends object, K extends Array<keyof T>>(
    value: T,
    keys: K,
  ): Pick<T, K[number]> {
    if (!isObject(value)) return null;

    return keys.reduce<Pick<T, K[number]>>(
      (accum, key: keyof T) => {
        accum[key] = value[key];

        return accum;
      },
      {} as Pick<T, K[number]>,
    );
  }
}
