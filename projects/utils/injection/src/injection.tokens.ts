import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export type TWindowDocument = Window & typeof globalThis;

export const WINDOW: InjectionToken<Document['defaultView']> = new InjectionToken<
  Document['defaultView']
>('WINDOW', {
  providedIn: 'root',
  factory(): Document['defaultView'] {
    const document: Document = inject(DOCUMENT);

    return document.defaultView;
  },
});

export const PLATFORM_WINDOW: InjectionToken<TWindowDocument> = new InjectionToken<TWindowDocument>(
  'PLATFORM_TOKEN',
  {
    providedIn: 'platform',
    factory(): TWindowDocument {
      return window;
    },
  },
);
