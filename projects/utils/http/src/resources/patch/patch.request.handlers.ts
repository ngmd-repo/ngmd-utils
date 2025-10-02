import { CrudRequestMeta, PartialUrlOptions, RequestUrl } from '../../classes';
import { checkAndThrowConnectConfigError } from '../../handlers';
import { PatchRequest } from './patch.request.model';

export function usePatch<Body, Response = null, Options extends PartialUrlOptions = null>(
  meta: CrudRequestMeta<Response, Options> | RequestUrl<Options>,
): PatchRequest<Body, Response, Options> {
  checkAndThrowConnectConfigError(meta);

  return new PatchRequest(meta);
}
