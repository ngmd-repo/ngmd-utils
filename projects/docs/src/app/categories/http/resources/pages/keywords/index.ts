import { NgDocGlobalKeyword } from '@ng-doc/core';

import { HttpCacheRequestKeywords } from '../use-cache/keywords';
import { HttpDeleteRequestKeywords } from '../use-delete/keywords';
import { HttpGetRequestKeywords } from '../use-get/keywords';
import { HttpOperatorRequestKeywords } from '../use-operator/keywords';
import { HttpPatchRequestKeywords } from '../use-patch/keywords';
import { HttpPostRequestKeywords } from '../use-post/keywords';
import { HttpPutRequestKeywords } from '../use-put/keywords';

export const HttpResourcesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  HttpPostRequestKeywords,
  HttpPatchRequestKeywords,
  HttpPutRequestKeywords,
  HttpDeleteRequestKeywords,
  HttpGetRequestKeywords,
  HttpCacheRequestKeywords,
  HttpOperatorRequestKeywords,
);
