import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  InputSignal,
  Renderer2,
} from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

@Directive({
  selector: '[ngBackgroundImage]',
})
export class BackgroundImageDirective implements AfterViewInit {
  private renderer: Renderer2 = inject(Renderer2);
  private $el: ElementRef<HTMLElement> = inject(ElementRef);

  public ngBackgroundImage: InputSignal<string> = input.required<string>();

  ngAfterViewInit(): void {
    this.applyBackgroundImage();
  }

  private applyBackgroundImage(): void {
    const element: HTMLElement = nativeElement(this.$el);

    this.renderer.setStyle(element, 'background-image', `url(${this.ngBackgroundImage()})`);
  }
}
