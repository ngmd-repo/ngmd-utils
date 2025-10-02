import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngViewContainer]',
  exportAs: 'viewContainerRef',
})
export class ViewContainerDirective {
  constructor(public $ref: ViewContainerRef) {}
}
