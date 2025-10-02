import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
})
export class MapPipe implements PipeTransform {
  public transform<T, G>(value: T, mapHandler: (v: T, ...args: any[]) => G, ...args: unknown[]): G {
    return Boolean(mapHandler) ? mapHandler(value, ...args) : (value as unknown as G);
  }
}
