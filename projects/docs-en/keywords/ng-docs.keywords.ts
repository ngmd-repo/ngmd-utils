import { NgDocKeywordsLoader } from '@ng-doc/core';

import { AppKeywords } from '../src/app';

export function projectKeywordsLoader(): NgDocKeywordsLoader {
  return async () => {
    return Promise.resolve(AppKeywords);
  };
}
