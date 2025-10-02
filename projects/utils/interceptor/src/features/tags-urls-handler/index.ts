/* eslint-disable @typescript-eslint/naming-convention */
import { HttpRequest } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { getProvideKeyByType, TProvideKey, TUseProvideType } from '@ngmd/utils/src';
import { TUseCombineProvider } from '@ngmd/utils/types';

export type InterceptorTagsUrlsHandler = (url: string, req: HttpRequest<unknown>) => string | null;
export const INTERCEPTOR_TAGS_MAP_HANDLER = new InjectionToken<InterceptorTagsUrlsHandler>(
  'INTERCEPTOR_TAGS_MAP_HANDLER',
);
export type TagsUrlsHandlerFeature = TUseCombineProvider<InterceptorTagsUrlsHandler>;
export function withTagsUrlsHandler<const T extends TUseProvideType>(
  handler: T extends 'default' ? InterceptorTagsUrlsHandler : () => InterceptorTagsUrlsHandler,
  type: T = 'default' as T,
): TagsUrlsHandlerFeature {
  const useKey: TProvideKey = getProvideKeyByType(type);
  const provider = {
    provide: INTERCEPTOR_TAGS_MAP_HANDLER,
    [useKey]: handler,
  };

  return provider as unknown as TagsUrlsHandlerFeature;
}
