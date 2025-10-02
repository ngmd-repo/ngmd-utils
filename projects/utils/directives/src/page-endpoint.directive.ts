import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  OnDestroy,
  OnInit,
  output,
  OutputEmitterRef,
  Renderer2,
} from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';
import { WINDOW } from '@ngmd/utils/injection';
import { TSide } from '@ngmd/utils/types';

@Directive({
  selector: '[ngPageEndpoint]',
})
export class PageEndpointDirective implements OnInit, OnDestroy {
  // * Inputs
  public pageEndpoint: InputSignalWithTransform<TSide[], TSide[] | ''> = input(['bottom'], {
    alias: 'ngPageEndpoint',
    transform: (value: TSide[] | ''): TSide[] => {
      return value === '' ? ['bottom'] : value || ['bottom'];
    },
  });
  public disabled: InputSignal<boolean> = input(false, { alias: 'ngEndpointDisabled' });
  public endpointElement: InputSignal<'document' | 'element'> = input<'document' | 'element'>(
    'document',
    { alias: 'ngEndpointElement' },
  );

  // * Outputs
  public endpoint: OutputEmitterRef<TSide> = output();

  // * Inject
  private window: Window = inject(WINDOW);
  private document: Document = inject(DOCUMENT);
  private el$: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  private listenElement$: HTMLElement;
  private unsubscribe$: () => void;

  public ngOnInit(): void {
    this.initScrollListener();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$();
  }

  private scrollHandler: () => void = (): void => {
    if (!this.disabled()) {
      this.pageEndpoint().forEach((endpoint: TSide) => this[endpoint]());
    }
  };

  private initScrollListener(): void {
    this.listenElement$ =
      this.endpointElement() === 'document'
        ? this.document.documentElement
        : nativeElement(this.el$);
    const scrollElement$: HTMLElement =
      this.endpointElement() === 'document' ? this.window : nativeElement(this.el$);

    this.unsubscribe$ = this.renderer.listen(scrollElement$, 'scroll', this.scrollHandler);
  }

  private top(): void {
    const { scrollTop } = this.listenElement$;

    if (scrollTop === 0) this.endpoint.emit('top');
  }

  private bottom(): void {
    const { scrollTop, scrollHeight, clientHeight } = this.listenElement$;
    const isBottom: boolean = scrollTop >= scrollHeight - clientHeight;

    if (isBottom) this.endpoint.emit('bottom');
  }

  private left(): void {
    const { scrollLeft } = this.listenElement$;

    if (scrollLeft === 0) this.endpoint.emit('left');
  }

  private right(): void {
    const { scrollLeft, scrollWidth, clientWidth } = this.listenElement$;
    const isRight: boolean = scrollLeft >= scrollWidth - clientWidth;

    if (isRight) this.endpoint.emit('right');
  }
}
