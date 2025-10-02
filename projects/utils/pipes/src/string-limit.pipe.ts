import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringLimit',
})
export class StringLimitPipe implements PipeTransform {
  public transform(value: string, length: number, suffix: string = '...'): string {
    return value?.length > length ? value.slice(0, length) + suffix : value;
  }
}
