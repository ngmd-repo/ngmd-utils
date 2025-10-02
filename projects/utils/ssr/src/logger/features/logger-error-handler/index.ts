/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';
import { getProvideKeyByType, TProvideKey, TUseProvideType } from '@ngmd/utils/src';

import { ErrorMessage } from '../../models/ErrorMessage.model';

export type SsrLoggerErrorHandler = (error: unknown) => void;

export const SSR_LOGGER_ERROR_HANDLER = new InjectionToken<SsrLoggerErrorHandler>(
  'SSR_LOGGER_ERROR_HANDLER',
  {
    factory(): SsrLoggerErrorHandler {
      return (error: unknown): void => {
        const msg: ErrorMessage = new ErrorMessage(error);

        console.error(JSON.stringify(msg));
      };
    },
  },
);

export type SsrLoggerErrorHandlerFeature = {
  provide: typeof SSR_LOGGER_ERROR_HANDLER;
} & ({ useFactory: () => SsrLoggerErrorHandler } | { useValue: SsrLoggerErrorHandler });

export function withSsrLoggerErrorHandler<const T extends TUseProvideType>(
  handler: T extends 'default' ? SsrLoggerErrorHandler : () => SsrLoggerErrorHandler,
  type: T = 'default' as T,
): SsrLoggerErrorHandlerFeature {
  const useKey: TProvideKey = getProvideKeyByType(type);
  const provider = {
    provide: SSR_LOGGER_ERROR_HANDLER,
    [useKey]: handler,
  };

  return provider as unknown as SsrLoggerErrorHandlerFeature;
}
