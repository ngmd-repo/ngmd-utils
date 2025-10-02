import { assign } from '@ngmd/utils/handlers';

import { isCrudRequestMeta, PartialUrlOptions, RequestUrl } from '../../classes/crud';
import { FetchRequest, FetchSendOptions } from '../../classes/fetch';
import { CacheMetaOptions, CacheRequestMeta, SetUrlOptions } from './cache.request.types';

export class CacheRequest<Response, Options extends PartialUrlOptions = null> extends FetchRequest<
  Response,
  Options
> {
  protected override meta: CacheRequestMeta<Response, Options>;
  private cacheOptions: CacheMetaOptions<Options>;

  constructor(urlOrMeta: CacheRequestMeta<Response, Options> | RequestUrl) {
    super(urlOrMeta);
    this.extractCacheMetaOptions(this.meta);
  }

  private extractCacheMetaOptions(meta: CacheRequestMeta<Response, Options> | string): void {
    if (isCrudRequestMeta(meta) && meta.cache) {
      this.cacheOptions = meta.cache;
    }
  }

  private sendCacheRequest(): void {
    if (!(this.loading() || this.loaded())) {
      const options: FetchSendOptions<Response, Options> = assign(this.cacheOptions);

      this.send(options);
    }
  }

  public setUrlOptions(params: SetUrlOptions<Response, Options>): void {
    this.cacheOptions = {
      urlOptions: params?.urlOptions,
    } as unknown as CacheMetaOptions<Options>;

    if (params?.withRequest) {
      const options: FetchSendOptions<Response, Options> = assign(
        this.cacheOptions,
        params.withRequest,
      );

      this.send(options);
    }
  }

  public cache(): this {
    this.sendCacheRequest();

    return this;
  }

  public override reset(): void {
    super.reset();
    this.cacheOptions = null;
  }
}
