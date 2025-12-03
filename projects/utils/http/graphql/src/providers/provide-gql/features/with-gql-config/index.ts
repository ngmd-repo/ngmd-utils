/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';
import { getProvideKey, TProvideKey } from '@ngmd/utils/src';
import { TUseCombineProvider } from '@ngmd/utils/types';

export type GqlConfig = {
  url: string;
};
export const GQL_CONFIG: InjectionToken<GqlConfig> = new InjectionToken<GqlConfig>('GQL_CONFIG');
export type GqlConfigFeature = TUseCombineProvider<GqlConfig>;

export function withGqlConfig(config: GqlConfig | (() => GqlConfig)): GqlConfigFeature {
  const providerKey: TProvideKey = getProvideKey(config);

  return {
    provide: GQL_CONFIG,
    [providerKey]: config,
  } as unknown as GqlConfigFeature;
}
