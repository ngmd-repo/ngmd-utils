/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { isPlatformServer } from '@angular/common';
import { ErrorHandler, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { SSR_LOGGER_ERROR_HANDLER, SsrLoggerErrorHandler } from '../features/logger-error-handler';

@Injectable()
export class SsrLogger extends ErrorHandler {
  private platformId: Object = inject(PLATFORM_ID);
  private errorHandler: SsrLoggerErrorHandler = inject(SSR_LOGGER_ERROR_HANDLER);

  public override handleError(error: unknown): void {
    if (isPlatformServer(this.platformId)) this.logServerError(error);

    super.handleError(error);
  }

  private logServerError(error: unknown): void {
    this.errorHandler(error);
  }
}
