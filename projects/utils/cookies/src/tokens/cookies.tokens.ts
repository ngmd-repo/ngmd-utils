/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';
import { TUseFactoryProvider } from '@ngmd/utils/types';

import { ICookieManager } from '../interfaces/cookies.interfaces';

export const COOKIES_SSR_MANAGER = new InjectionToken<ICookieManager>('COOKIES_SSR_MANAGER');
export type CookiesSsrManagerFeature = TUseFactoryProvider<ICookieManager>;
