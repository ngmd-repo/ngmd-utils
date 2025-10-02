/* eslint-disable @typescript-eslint/naming-convention */
import { TUseClassProvider } from '@ngmd/utils/types';

import { InitializeState } from './initialize-state.service';

export * from './initialize-state.service';

export type InitializeStateFeature<T extends object = object> = TUseClassProvider<
  InitializeState<T>
>;
export function withInitializeState(): InitializeStateFeature {
  return InitializeState as unknown as InitializeStateFeature;
}
