/* eslint-disable @typescript-eslint/naming-convention */
import { DefaultConfigFeature } from './default-config';
import { TagsUrlsHandlerFeature } from './tags-urls-handler';
import { TagsUrlsMapFeature } from './tags-urls-map';
import { HeadersFeature } from './with-headers';
import { HeadersHandlerFeature } from './with-headers-handler';

export * from './default-config';
export * from './tags-urls-handler';
export * from './tags-urls-map';
export * from './with-headers';
export * from './with-headers-handler';

export type UtilsInterceptorFeatures =
  | DefaultConfigFeature
  | HeadersFeature
  | HeadersHandlerFeature
  | TagsUrlsHandlerFeature
  | TagsUrlsMapFeature;
