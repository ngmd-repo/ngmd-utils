import { TConstructor, TConstructorInstance } from '@ngmd/utils/types';

import { StateWorker } from '../classes/state.worker';

export type TStateFlags<T extends TConstructor<unknown> = TConstructor<unknown>> = TConstructor<{
  [K in keyof InstanceType<T>]: boolean;
}>;
export type TStateObject<T extends TConstructor<unknown> = TConstructor<unknown>> = TConstructor<
  InstanceType<T>
>;
export type TStateWorkers = {
  flags?: StateWorker<any>;
  state?: StateWorker<any>;
};

export type TStatesConstructors = {
  flags?: TStateFlags;
  state?: TStateObject;
};

export type TStatesInstances<T extends TStatesConstructors> = {
  [K in keyof T]: TConstructorInstance<T[K]>;
};
