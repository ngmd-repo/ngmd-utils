import {
  Directive,
  HostListener,
  input,
  InputSignal,
  OnDestroy,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Directive({
  selector: '[ngAfk]',
})
export class AfkDirective implements OnDestroy {
  // * Inputs
  public delay: InputSignal<number | string> = input<number | string>(2500, { alias: 'ngAfk' });
  public retryCount: InputSignal<number | string> = input<number | string>(
    Number.MAX_SAFE_INTEGER,
    { alias: 'ngAfkRetryCount' },
  );
  public disabled: InputSignal<boolean> = input<boolean>(false, { alias: 'ngAfkDisabled' });

  // * Outputs
  public afk: OutputEmitterRef<void> = output();

  private timeout$: ReturnType<typeof setTimeout> = null;
  private runCount: number = 0;

  @HostListener('document:mousemove')
  @HostListener('document:mousedown')
  @HostListener('document:keypress')
  @HostListener('document:touchstart')
  private action(): void {
    this.check();
  }

  public ngOnDestroy(): void {
    this.reset();
  }

  public get isCanRun(): boolean {
    return !this.disabled() && this.runCount < Number(this.retryCount());
  }

  private check(): void {
    this.isCanRun ? this.run() : this.reset();
  }

  private run(): void {
    this.reset();

    this.timeout$ = setTimeout(() => {
      this.afk.emit();
      this.runCount++;
    }, Number(this.delay()));
  }

  public reset(): void {
    const isExistTimeout: boolean = Boolean(this.timeout$);

    if (isExistTimeout) {
      clearTimeout(this.timeout$);
      this.timeout$ = null;
    }
  }
}
