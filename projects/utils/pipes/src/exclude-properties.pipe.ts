import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeProps',
})
export class ExcludePropertiesPipe implements PipeTransform {
  public transform<T extends object, K extends Array<keyof T>>(
    object: T,
    props: K,
  ): { [Q in K[number]]: T[Q] } {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    if (!object || !props?.length) return {} as { [Q in K[number]]: T[Q] };

    type TPartObject = { [Q in K[number]]: T[Q] };

    return Object.entries(object).reduce<TPartObject>((accum, [key, value]) => {
      const isExclude: boolean = props.includes(key as keyof T);
      if (!isExclude) {
        accum[key as keyof T] = value;
      }

      return accum;
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
    }, {} as TPartObject);
  }
}
