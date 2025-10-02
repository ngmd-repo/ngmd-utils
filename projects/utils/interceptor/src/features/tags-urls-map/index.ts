import { InjectionToken } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';
import { getProvideKey, TProvideKey, TUseParam } from '@ngmd/utils/src';
import { TUseCombineProvider } from '@ngmd/utils/types';

/* eslint-disable @typescript-eslint/naming-convention */
export type InterceptorTagsMap = ISimple<string>;
export const INTERCEPTOR_TAGS_MAP = new InjectionToken<InterceptorTagsMap>('INTERCEPTOR_TAGS_MAP');
export type TagsUrlsMapFeature = TUseCombineProvider<InterceptorTagsMap>;
export function withTagsUrlsMap(tagsMap: TUseParam<InterceptorTagsMap>): TagsUrlsMapFeature {
  const useKey: TProvideKey = getProvideKey(tagsMap);
  const provider = {
    provide: INTERCEPTOR_TAGS_MAP,
    [useKey]: tagsMap,
  };

  return provider as unknown as TagsUrlsMapFeature;
}
