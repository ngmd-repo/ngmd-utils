import { NgDocGlobalKeyword } from '@ng-doc/core';

import { HttpApiHubKeywords } from '../api-hub/keywords';
import { HttpClassesKeywords } from '../classes/pages/keywords';
import { HttpHelpersKeywords } from '../helpers/keywords';
import { HttpResourcesKeywords } from '../resources/pages/keywords';
import { HttpTypesKeywords } from '../types/keywords';

export const HttpKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  HttpClassesKeywords,
  HttpResourcesKeywords,
  HttpApiHubKeywords,
  HttpTypesKeywords,
  HttpHelpersKeywords,
);
