import { NgForOf } from '@angular/common';
import { Directive, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
})
export class TrackByKeyDirective<T> {
  @Input('ngForTrackByKey')
  public set ngForTrackByKey(key: keyof T | 'index') {
    this.ngFor.ngForTrackBy = (index: number, item: T): unknown =>
      key === 'index' ? index : item[key];
  }

  constructor(private ngFor: NgForOf<T>) {}
}
