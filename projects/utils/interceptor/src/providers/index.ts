import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';

import { UtilsInterceptorFeatures } from '../features';
import { RequestsInterceptor } from '../services';

export function provideUtilsInterceptor(
  ...features: UtilsInterceptorFeatures[]
): EnvironmentProviders {
  const providers: Provider[] = [
    RequestsInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
  ];

  return makeEnvironmentProviders(providers.concat(...features));
}
