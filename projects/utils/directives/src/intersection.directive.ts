import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

@Directive({
  selector: '[ngIntersection]',
  exportAs: 'ngIntersectionRef',
})
export class IntersectionDirective implements AfterViewInit, OnDestroy {
  // * Inputs
  public rootSelector: InputSignal<string> = input(null, { alias: 'ngIntersection' });
  public isDetect: InputSignal<boolean> = input(true, { alias: 'ngIntersectionDetect' });
  public rootMargin: InputSignal<string> = input('0px', { alias: 'ngIntersectionMargin' });
  public threshold: InputSignal<number | string> = input<number | string>(1, {
    alias: 'ngIntersectionThreshold',
  });

  // * Outputs
  public intersection: OutputEmitterRef<IntersectionObserverEntry[]> = output();

  // * Inject
  private document: Document = inject(DOCUMENT);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef, { skipSelf: true, host: true });
  private $el: ElementRef<HTMLElement> = inject(ElementRef);

  private observer$: IntersectionObserver;
  public visible: boolean = false;

  public ngAfterViewInit(): void {
    this.initObserver();
  }

  public ngOnDestroy(): void {
    this.observer$.disconnect();
    this.observer$ = null;
  }

  private initObserver(): void {
    if (!this.observer$) {
      const $rootEl: HTMLElement = this.document.querySelector(this.rootSelector());

      this.observer$ = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const [{ isIntersecting }] = entries;

          this.visible = isIntersecting;
          this.intersection.emit(entries);

          if (this.isDetect()) {
            this.cdr?.detectChanges();
          }
        },
        {
          root: $rootEl,
          rootMargin: this.rootMargin(),
          threshold: Number(this.threshold()),
        },
      );

      this.observer$.observe(nativeElement(this.$el));
    }
  }
}
