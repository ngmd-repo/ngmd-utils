import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

type TLetCtx<T = unknown> = {
  ngLet: T;
};
@Directive({
  selector: '[ngLet]',
})
export class LetDirective<T = unknown> implements OnInit {
  private letContext: TLetCtx<T> = { ngLet: null };

  @Input('ngLet')
  public set ngAsync(value: T) {
    this.letContext.ngLet = value;
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<TLetCtx<T>>,
  ) {}

  public ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, this.letContext);
  }

  public static ngTemplateContextGuard<T>(
    directive: LetDirective<T>,
    context: unknown,
  ): context is TLetCtx<Exclude<T, '' | 0 | false | null | undefined>> {
    return true;
  }
}
