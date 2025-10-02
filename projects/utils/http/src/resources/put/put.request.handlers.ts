import { CrudRequestMeta, PartialUrlOptions, RequestUrl } from '../../classes';
import { checkAndThrowConnectConfigError } from '../../handlers';
import { PutRequest } from './put.request.model';

export function usePut<Body, Response = null, Options extends PartialUrlOptions = null>(
  meta: CrudRequestMeta<Response, Options> | RequestUrl<Options>,
): PutRequest<Body, Response, Options> {
  checkAndThrowConnectConfigError(meta);

  return new PutRequest(meta);
}
