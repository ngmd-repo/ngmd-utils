import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class ToggleService {
  public isShow: WritableSignal<boolean> = signal(false);
  public toggle(): void {
    this.isShow.update(v => !v);
  }

  public set(isShow: boolean): void {
    this.isShow.set(isShow);
  }
}
