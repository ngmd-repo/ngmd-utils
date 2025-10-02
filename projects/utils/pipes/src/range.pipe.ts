import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
})
export class RangePipe implements PipeTransform {
  transform<T>(count: number, start: number = 0, value?: (value: number) => T): Iterable<T> {
    return {
      *[Symbol.iterator](): Generator<T> {
        for (let i = start; i < count + start; i++) {
          yield value ? value(i) : (i as T);
        }
      },
    };
  }
}
