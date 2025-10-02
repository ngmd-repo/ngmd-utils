import {
  AfterViewInit,
  contentChild,
  contentChildren,
  Directive,
  effect,
  EffectRef,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

import { SwitchContainCaseDirective } from './switch-contain-case.directive';
import { SwitchContainDefaultDirective } from './switch-contain-default.directive';

@Directive({
  selector: '[ngSwitchContain]',
})
export class SwitchContainDirective implements AfterViewInit {
  // * Inputs
  public containValue: InputSignal<unknown> = input.required({ alias: 'ngSwitchContain' });

  // * Effects
  private switchContainEffect: EffectRef = effect(() => {
    if (this.isViewInit && this.containValue() !== this.switchValue) {
      this.repaintCases(this.containValue());
    }
    this.switchValue = this.containValue();
  });

  private isViewInit: boolean = false;
  private switchValue: unknown;
  private currentCase$: SwitchContainCaseDirective | SwitchContainDefaultDirective;

  private defaultCase$: Signal<SwitchContainDefaultDirective> = contentChild(
    SwitchContainDefaultDirective,
  );
  private caseRefs$: Signal<readonly SwitchContainCaseDirective[]> = contentChildren(
    SwitchContainCaseDirective,
  );

  public ngAfterViewInit(): void {
    this.isViewInit = true;
    this.repaintCases(this.switchValue);
  }

  public repaintCases(value: unknown): void {
    const caseRef$: SwitchContainCaseDirective | SwitchContainDefaultDirective =
      this.caseRefs$().find(case$ => case$.isContain(value)) || this.defaultCase$();

    this.resetCurrentCase();

    if (caseRef$) {
      this.currentCase$ = caseRef$;
      this.currentCase$.insert();
    }
  }

  private resetCurrentCase(): void {
    if (this.currentCase$) {
      this.currentCase$.remove();
      this.currentCase$ = null;
    }
  }
}
