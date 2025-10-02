import { CrudRequestMeta, PartialUrlOptions, RequestUrl } from '../../classes';
import { checkAndThrowConnectConfigError } from '../../handlers';
import { DeleteRequest } from './delete.request.model';

export function useDelete<Options extends PartialUrlOptions = null, Response = null, Body = null>(
  meta: CrudRequestMeta<Response, Options> | RequestUrl<Options>,
): DeleteRequest<Options, Response, Body> {
  checkAndThrowConnectConfigError(meta);

  return new DeleteRequest(meta);
}
