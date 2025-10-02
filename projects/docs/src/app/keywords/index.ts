import { NgDocGlobalKeyword } from '@ng-doc/core';

import { DocsKeywords } from '../categories/keywords';

const GlobalKeywords: Record<string, NgDocGlobalKeyword> = {
  animation: {
    url: 'https://angular.dev/guide/animations',
    title: '@angular/animations',
  },
  'injection-context': {
    url: 'https://angular.dev/guide/di/dependency-injection-context',
    title: 'Injection context',
  },
};

export const AppKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  GlobalKeywords,
  DocsKeywords,
);
