import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, Observable } from 'rxjs';

@Injectable()
export class InitializeState<T extends object> {
  public config: WritableSignal<T> = signal(null);
  private isLoadedConfig: WritableSignal<boolean> = signal(null);
  public loaded: Signal<boolean> = this.isLoadedConfig.asReadonly();
  public whenLoaded$: Observable<boolean> = toObservable(this.isLoadedConfig.asReadonly()).pipe(
    filter(Boolean),
  );
}
