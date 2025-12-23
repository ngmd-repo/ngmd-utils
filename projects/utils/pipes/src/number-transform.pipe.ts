import { Pipe, PipeTransform } from '@angular/core';
import { isNullish } from '@ngmd/utils/handlers';

@Pipe({
  name: 'numberTransform',
})
export class NumberTransformPipe implements PipeTransform {
  public transform(value: number | string): number | string {
    if (isNullish(value)) return null;

    value = Number(value);

    switch (true) {
      case value < 1000: {
        return value;
      }

      case value < 1e6: {
        const result: number = value / 1e3;

        return this.dropZero(result.toFixed(1)) + 'K';
      }

      case value < 1e9: {
        const result: number = value / 1e6;

        return this.dropZero(result.toFixed(1)) + 'M';
      }

      default: {
        const result: number = value / 1e9;

        return this.dropZero(result.toFixed(1)) + 'B';
      }
    }
  }

  private dropZero(value: string): string {
    const [integer, float = '0'] = value.split('.');
    const result: string = `${integer}${float === '0' ? '' : '.' + float}`;

    return result;
  }
}
