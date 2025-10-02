import { Pipe, PipeTransform } from '@angular/core';
import { TExtractValues, TJSDataType } from '@ngmd/utils/types';

type TParseTypes =
  | TExtractValues<TJSDataType, 'boolean' | 'number' | 'string'>
  | 'array'
  | 'date'
  | 'json'
  | 'stringify';

@Pipe({
  name: 'toType',
})
export class TypeParser implements PipeTransform {
  public transform(value: unknown, type: TParseTypes): unknown {
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'date':
        return new Date(value as number | string);
      case 'array':
        return Array.from(value as Iterable<unknown>);
      case 'json':
        return JSON.parse(value as string);
      case 'stringify':
        return JSON.stringify(value);
      default:
        return value;
    }
  }
}
