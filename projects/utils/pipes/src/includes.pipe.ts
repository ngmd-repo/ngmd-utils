import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
})
export class IncludesPipe implements PipeTransform {
  public transform<T>(items: T[], item: T): boolean {
    if (!Array.isArray(items)) return false;

    return items.includes(item);
  }
}
