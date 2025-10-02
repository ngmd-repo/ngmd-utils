import { inject } from '@angular/core';
import { COOKIES_SSR_MANAGER, CookiesSsrManagerFeature, ICookieManager } from '@ngmd/utils/cookies';
import { Request } from 'express';

import { REQUEST } from '../../tokens';
import { CookiesEnabledSsrManager } from '../managers/cookies-enabled-ssr-manager';

export function withSsrCookies(): CookiesSsrManagerFeature {
  return {
    provide: COOKIES_SSR_MANAGER,
    useFactory(): ICookieManager {
      const request: Request = inject(REQUEST, { optional: true });

      return new CookiesEnabledSsrManager(request);
    },
  };
}
