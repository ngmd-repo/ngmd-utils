import { Pipe, PipeTransform } from '@angular/core';

export type TSrc = 'assets-img' | 'assets';

@Pipe({
  name: 'src',
  standalone: true,
})
export class SrcPipe implements PipeTransform {
  public transform(path: string, type: TSrc = null): string {
    switch (type) {
      case 'assets': {
        return `/assets/${path}`;
      }
      case 'assets-img': {
        return `/assets/images/${path}`;
      }
      default: {
        return path;
      }
    }
  }
}
