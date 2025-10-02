import { isPlatformServer } from '@angular/common';
import {
  Directive,
  inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngServerRender]',
})
export class ServerRenderDirective implements OnInit {
  private platformId: object = inject(PLATFORM_ID);
  private templateRef: TemplateRef<unknown> = inject(TemplateRef);
  private viewContainer: ViewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
