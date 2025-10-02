import { CrudRequestMeta, PartialUrlOptions, RequestUrl } from '../../classes';
import { checkAndThrowConnectConfigError } from '../../handlers';
import { PostRequest } from './post.request.model';

export function usePost<Body, Response = null, Options extends PartialUrlOptions = null>(
  meta: CrudRequestMeta<Response, Options> | RequestUrl<Options>,
): PostRequest<Body, Response, Options> {
  checkAndThrowConnectConfigError(meta);

  return new PostRequest(meta);
}
