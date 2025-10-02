/* eslint-disable @typescript-eslint/naming-convention */

import { InjectionToken } from '@angular/core';
import { getProvideKey, TProvideKey, TUseParam } from '@ngmd/utils/src';
import { TUseCombineProvider } from '@ngmd/utils/types';

export const INTERCEPTOR_DEFAULT_CONFIG = new InjectionToken<InterceptorDefaultConfig>(
  'INTERCEPTOR_DEFAULT_CONFIG',
);

export type InterceptorDefaultConfig = {
  API_TAG: string;
  API_HOST: string;
};
export type DefaultConfigFeature = TUseCombineProvider<InterceptorDefaultConfig>;
export function withDefaultConfig(
  defaultConfig: TUseParam<InterceptorDefaultConfig>,
): DefaultConfigFeature {
  const useKey: TProvideKey = getProvideKey(defaultConfig);
  const provider = {
    provide: INTERCEPTOR_DEFAULT_CONFIG,
    [useKey]: defaultConfig,
  };

  return provider as unknown as DefaultConfigFeature;
}
