/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';
import { TUseFactoryProvider } from '@ngmd/utils/types';

export const INITIALIZE_HANDLER = new InjectionToken<InitializeHandler<object>>(
  'INITIALIZE_HANDLER',
);

export type InitializeHandler<T extends object> = (env: T) => void;
export type InitializeHandlerFeature = TUseFactoryProvider<InitializeHandler<object>>;
export function withInitializeHandler<T extends object>(
  handler: () => InitializeHandler<T>,
): InitializeHandlerFeature {
  const provider = {
    provide: INITIALIZE_HANDLER,
    useFactory: handler,
  };

  return provider as unknown as InitializeHandlerFeature;
}
