import { NgDocGlobalKeyword } from '@ng-doc/core';

import { HttpApiRequestKeywords } from '../api-request/keywords';
import { HttpCrudRequestKeywords } from '../crud-request/keywords';
import { HttpFetchRequestKeywords } from '../fetch-request/keywords';

export const HttpClassesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  HttpApiRequestKeywords,
  HttpCrudRequestKeywords,
  HttpFetchRequestKeywords,
);
