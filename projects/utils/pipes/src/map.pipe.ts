import { Pipe, PipeTransform } from '@angular/core';
import { isJSType } from '@ngmd/utils/handlers';

@Pipe({
  name: 'map',
})
export class MapPipe implements PipeTransform {
  public transform<T, G>(value: T, mapHandler: (v: T, ...args: any[]) => G, ...args: unknown[]): G {
    return isJSType(mapHandler, 'function') ? mapHandler(value, ...args) : (value as unknown as G);
  }
}
