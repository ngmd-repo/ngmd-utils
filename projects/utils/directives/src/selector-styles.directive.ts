import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  inject,
  input,
  InputSignal,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';

@Directive({
  selector: '[ngSelectorStyles]',
})
export class SelectorStylesDirective implements AfterViewInit, OnDestroy {
  // * Inputs
  public styles: InputSignal<ISimple<number | string>> = input.required({
    alias: 'ngSelectorStyles',
  });
  public selector: InputSignal<string> = input.required({
    alias: 'ngSelector',
  });

  // * Inject
  private document: Document = inject(DOCUMENT);
  private renderer: Renderer2 = inject(Renderer2);

  private defaultStyles: ISimple<number | string>;

  public ngAfterViewInit(): void {
    this.defaultStyles = this.getCurrentStyles(Object.keys(this.styles()));
    this.applyStyles(this.styles());
  }

  public ngOnDestroy(): void {
    this.applyStyles(this.defaultStyles);
  }

  private getCurrentStyles(props: string[]): ISimple<number | string> {
    const el$: HTMLElement = this.document.querySelector(this.selector());

    return props.reduce<ISimple<number | string>>((accum, prop) => {
      const value: string = getComputedStyle(el$).getPropertyValue(prop);

      accum[prop] = value;

      return accum;
    }, {});
  }

  private applyStyles(styles: ISimple<number | string>): void {
    const el$: HTMLElement = this.document.querySelector(this.selector());

    if (el$ && styles) {
      Object.entries(styles).forEach(([prop, value]) => {
        this.renderer.setStyle(el$, prop, value);
      });
    }
  }
}
