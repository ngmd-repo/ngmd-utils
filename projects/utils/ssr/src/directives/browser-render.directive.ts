import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngBrowserRender]',
})
export class BrowserRenderDirective implements OnInit {
  private platformId: object = inject(PLATFORM_ID);
  private templateRef: TemplateRef<unknown> = inject(TemplateRef);
  private viewContainer: ViewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
