/* eslint-disable @typescript-eslint/naming-convention */
import { Provider } from '@angular/core';

import { CookiesService } from '../services/cookies.service';
import { CookiesSsrManagerFeature } from '../tokens/cookies.tokens';

export type CookiesFeatures = CookiesSsrManagerFeature;

export function provideUtilsCookies(...features: CookiesFeatures[]): Provider[] {
  return [CookiesService, ...features] as unknown as Provider[];
}
