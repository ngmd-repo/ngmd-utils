import { Signal, WritableSignal } from '@angular/core';
import { TConstructorInstance } from '@ngmd/utils/types';

import { TSignalStatesObject } from '../../../types/signal-state.types';
import { SignalStateWorker, TExcludeSignalStateWorkerFields } from '../classes/signal-state.worker';

export type TSignalStatesInstances<States extends TSignalStatesObject> = {
  [K in keyof States]: TConstructorInstance<States[K]>;
};
export type TSignalStateWorkers<States extends TSignalStatesObject> = {
  [K in keyof States]: Omit<SignalStateWorker<States[K] & any>, TExcludeSignalStateWorkerFields>;
};

export type TSignalState<T> = {
  [K in keyof T]: Signal<T[K]>;
};

export type TWritableSignalState<T extends object> = {
  [K in keyof T]: WritableSignal<T[K]>;
};

export type TSignalStateResetOptions = {
  nonNullable: boolean;
};
