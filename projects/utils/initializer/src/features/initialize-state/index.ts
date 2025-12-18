/* eslint-disable @typescript-eslint/naming-convention */
import { Provider } from '@angular/core';
import { makeCombineProvider } from '@ngmd/utils/src';
import { TUseClassProvider, TUseCombineProvider } from '@ngmd/utils/types';

import { InitializeState } from './services';
import { INITIALIZE_STATE_OPTIONS } from './tokens';
import { InitializeStateOptions } from './types';

export * from './services';

export type InitializeStateFeature<T extends object = object> = [
  TUseClassProvider<InitializeState<T>>,
];

export function withInitializeState(
  opts?: InitializeStateOptions | (() => InitializeStateOptions),
): InitializeStateFeature {
  const providers: Provider[] = [InitializeState];

  if (opts) {
    const provider: TUseCombineProvider<InitializeStateOptions> = makeCombineProvider(
      opts,
      INITIALIZE_STATE_OPTIONS,
    );

    providers.push(provider);
  }

  return providers as unknown as InitializeStateFeature;
}
