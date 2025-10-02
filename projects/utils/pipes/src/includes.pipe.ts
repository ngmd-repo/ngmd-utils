import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
})
export class IncludesPipe implements PipeTransform {
  public transform<T>(items: T[], item: T): boolean {
    return items.includes(item);
  }
}
