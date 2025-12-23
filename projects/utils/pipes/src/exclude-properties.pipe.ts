import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeProps',
})
export class ExcludePropertiesPipe implements PipeTransform {
  public transform<T extends object, K extends Array<keyof T>>(
    object: T,
    props: K,
  ): { [Q in K[number]]: T[Q] } {
    if (!object || !props?.length) return null;

    return Object.entries(object).reduce(
      (accum, [key, value]) => {
        const isExclude: boolean = props.includes(key as keyof T);
        if (!isExclude) {
          accum[key as keyof T] = value;
        }

        return accum;
      },
      {} as { [Q in K[number]]: T[Q] },
    );
  }
}
