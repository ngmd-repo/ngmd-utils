import { NgDocGlobalKeyword } from '@ng-doc/core';

import { InterceptorWithDefaultConfigKeywords } from '../with-default-config/_keywords';
import { InterceptorWithHeadersKeywords } from '../with-headers/_keywords';
import { InterceptorWithHeadersHandlerKeywords } from '../with-headers-handler/_keywords';
import { InterceptorWithTagsUrlsHandlerKeywords } from '../with-tags-urls-handler/_keywords';
import { InterceptorWithTagsUrlsMapKeywords } from '../with-tags-urls-map/_keywords';

export const InterceptorFeaturesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  InterceptorWithDefaultConfigKeywords,
  InterceptorWithTagsUrlsMapKeywords,
  InterceptorWithTagsUrlsHandlerKeywords,
  InterceptorWithHeadersKeywords,
  InterceptorWithHeadersHandlerKeywords,
);
