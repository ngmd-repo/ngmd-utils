import { PartialUrlOptions, RequestUrl } from '../../classes';
import { checkAndThrowConnectConfigError } from '../../handlers';
import { CacheRequest } from './cache.request.model';
import { CacheRequestMeta } from './cache.request.types';

export function useCache<Response, Options extends PartialUrlOptions = null>(
  meta: CacheRequestMeta<Response, Options> | RequestUrl<Options>,
): CacheRequest<Response, Options> {
  checkAndThrowConnectConfigError(meta);

  return new CacheRequest(meta);
}
