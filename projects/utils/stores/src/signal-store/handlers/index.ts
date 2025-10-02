/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { WritableSignal } from '@angular/core';

import { TSignalsObject, TSignalStore, TWritableSignalStore } from '../types/signal-store.types';

export function makeReadonlyStore<T extends object>(
  store: TWritableSignalStore<T>,
): TSignalStore<T> {
  const storeWithReadonlySignals = Object.entries(store).reduce(
    (accum, [key, value]) => {
      (accum as any)[key as keyof T] = (value as WritableSignal<any>).asReadonly();

      return accum;
    },
    {} as TSignalsObject<T, 'readonly'>,
  );

  return Object.freeze(storeWithReadonlySignals);
}
