/* eslint-disable @typescript-eslint/naming-convention */
import { HttpRequest } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { getProvideKeyByType, TProvideKey, TUseProvideType } from '@ngmd/utils/src';
import { TUseCombineProvider } from '@ngmd/utils/types';

import { InterceptorHeaders } from '../with-headers';

export type InterceptorHeadersHandler<T = string> = (
  req: HttpRequest<unknown>,
) => InterceptorHeaders<T>;
export const INTERCEPTOR_HEADERS_HANDLER = new InjectionToken<InterceptorHeadersHandler>(
  'INTERCEPTOR_HEADERS_HANDLER',
);
export type HeadersHandlerFeature = TUseCombineProvider<InterceptorHeadersHandler>;
export function withHeadersHandler<const T extends TUseProvideType>(
  handler: T extends 'default' ? InterceptorHeadersHandler : () => InterceptorHeadersHandler,
  type: T = 'default' as T,
): HeadersHandlerFeature {
  const useKey: TProvideKey = getProvideKeyByType(type);
  const provider = {
    provide: INTERCEPTOR_HEADERS_HANDLER,
    [useKey]: handler,
  };

  return provider as unknown as HeadersHandlerFeature;
}
