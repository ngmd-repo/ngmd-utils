import { InjectionToken } from '@angular/core';

export const DOWNLOAD_URL_TRANSFORMER: InjectionToken<(url: string) => string> = new InjectionToken<
  (url: string) => string
>('DOWNLOAD_URL_TRANSFORMER', {
  providedIn: 'root',
  factory: () => (url: string) => url,
});
