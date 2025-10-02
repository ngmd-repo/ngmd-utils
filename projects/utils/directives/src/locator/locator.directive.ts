import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

import { LocatorItem, TLocatorItemChild } from './models/LocatorItem';

@Directive({
  selector: '[ngLocator]',
  exportAs: 'ngLocatorRef',
})
export class LocatorDirective implements AfterViewInit {
  @Input('ngLocator') public locator: LocatorItem;

  constructor(
    private $el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  public ngAfterViewInit(): void {
    this.applyRootLocator(this.locator);
  }

  public trigger(): void {
    this.applyRootLocator(this.locator);
  }

  private applyRootLocator(locator: LocatorItem): void {
    const $rootEl: HTMLElement = nativeElement(this.$el);
    const { locatorChildren, locatorValue } = locator;

    if (locatorValue) {
      this.applyLocator($rootEl, locator);
    }

    if (locatorChildren) {
      locatorChildren.forEach(({ selector, locator: childrenLocator }: TLocatorItemChild) => {
        const $childEl: HTMLElement = $rootEl.querySelector(selector);
        const isExistChild: boolean = Boolean($childEl);

        if (isExistChild) {
          this.applyLocator($childEl, childrenLocator);
        }
      });
    }
  }

  private applyLocator($el: HTMLElement, { locatorName, locatorValue }: LocatorItem): void {
    this.renderer.setAttribute($el, locatorName, String(locatorValue));
  }
}
