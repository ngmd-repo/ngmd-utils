/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';
import { getProvideKey, TProvideKey, TUseParam } from '@ngmd/utils/src';
import { TUseCombineProvider } from '@ngmd/utils/types';

export type InterceptorHeaders<T = string> = { headers: ISimple<T> };
export const INTERCEPTOR_HEADERS = new InjectionToken<InterceptorHeaders>('INTERCEPTOR_HEADERS');
export type HeadersFeature = TUseCombineProvider<InterceptorHeaders>;
export function withHeaders(headers: TUseParam<InterceptorHeaders>): HeadersFeature {
  const useKey: TProvideKey = getProvideKey<InterceptorHeaders>(headers);
  const provider = {
    provide: INTERCEPTOR_HEADERS,
    [useKey]: headers,
  };

  return provider as unknown as HeadersFeature;
}
