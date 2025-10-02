import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class ShowChildrenViewService {
  public isShowOne: WritableSignal<boolean> = signal(false);
  public toggleShowOne(): void {
    this.isShowOne.update(v => !v);
  }
  public isShowTwo: WritableSignal<boolean> = signal(false);
  public toggleShowTwo(): void {
    this.isShowTwo.update(v => !v);
  }

  public toggle(type?: 'one' | 'two'): void {
    switch (type) {
      case 'one': {
        this.toggleShowOne();
        break;
      }
      case 'two': {
        this.toggleShowTwo();
        break;
      }
      default: {
        const value: boolean = !this.isShowTwo();

        this.isShowOne.set(value);
        this.isShowTwo.set(value);
      }
    }
  }
}
