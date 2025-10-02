import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'condition',
})
export class ConditionPipe implements PipeTransform {
  public transform<V1, V2>(condition: unknown, ifValue: V1, elseValue: V2): V1 | V2 {
    return Boolean(condition) ? ifValue : elseValue;
  }
}
