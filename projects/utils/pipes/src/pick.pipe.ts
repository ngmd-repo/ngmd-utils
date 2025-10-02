import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pick',
})
export class PickPipe implements PipeTransform {
  public transform<T extends object, K extends Array<keyof T>>(
    value: T,
    keys: K,
  ): Pick<T, K[number]> {
    return keys.reduce<Pick<T, K[number]>>((accum, key: keyof T) => {
      accum[key] = value[key];

      return accum;
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
    }, {} as Pick<T, K[number]>);
  }
}
