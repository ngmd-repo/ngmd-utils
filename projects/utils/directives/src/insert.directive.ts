import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, inject, input, InputSignal } from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

@Directive({
  selector: '[ngInsert]',
})
export class InsertDirective implements AfterViewInit {
  // * Inputs
  public position: InputSignal<InsertPosition> = input<InsertPosition>('afterend', {
    alias: 'ngInsert',
  });
  public targetSelector: InputSignal<string> = input.required({
    alias: 'ngInsertTargetSelector',
  });

  // * Inject
  private document: Document = inject(DOCUMENT);
  private $el: ElementRef<HTMLElement> = inject(ElementRef);

  public ngAfterViewInit(): void {
    if (!this.targetSelector()) {
      throw new Error('property "ngInsertTargetSelector" must not be empty');
    }

    this.insert();
  }

  private insert(): void {
    const $targetElement: HTMLElement = this.document.querySelector(this.targetSelector());

    if (Boolean($targetElement)) {
      $targetElement.insertAdjacentElement(this.position(), nativeElement(this.$el));
    }
  }
}
