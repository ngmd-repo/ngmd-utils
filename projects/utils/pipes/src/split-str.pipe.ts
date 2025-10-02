import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString',
})
export class SplitStringPipe implements PipeTransform {
  public transform(value: number | string, separator: string = ''): string[] {
    return String(value).split(separator);
  }
}
