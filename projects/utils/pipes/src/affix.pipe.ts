import { Pipe, PipeTransform } from '@angular/core';
import { prefix, suffix } from '@ngmd/utils/handlers';

@Pipe({
  name: 'affix',
})
export class AffixPipe implements PipeTransform {
  public transform(
    value: number | string,
    tag: number | string,
    placement: 'begin' | 'end' = 'end',
  ): string {
    const transformer: (str: string, tag: string) => string = placement === 'end' ? suffix : prefix;

    return transformer(`${value}`, `${tag}`);
  }
}
