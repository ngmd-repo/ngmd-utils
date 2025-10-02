/* eslint-disable @typescript-eslint/naming-convention */
import { EnvironmentProviders, ErrorHandler, makeEnvironmentProviders } from '@angular/core';

import { SsrLoggerErrorHandlerFeature } from '../features/logger-error-handler';
import { SsrLogger } from '../services/ssr.logger.service';

export type SsrLoggerFeatures = SsrLoggerErrorHandlerFeature;

export function provideSsrLogger(...features: SsrLoggerFeatures[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...features,
    {
      provide: ErrorHandler,
      useClass: SsrLogger,
    },
  ]);
}
