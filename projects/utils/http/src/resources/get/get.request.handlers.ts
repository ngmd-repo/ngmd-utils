import { PartialUrlOptions, RequestUrl } from '../../classes';
import { checkAndThrowConnectConfigError, mergeInjectionFields } from '../../handlers';
import { GET_REQUESTS_INJECTION_FIELDS } from './get.request.constants';
import { GetRequest } from './get.request.model';
import { GetRequestMeta } from './get.request.types';

export function useGet<Response, Options extends PartialUrlOptions = null>(
  meta: GetRequestMeta<Response, Options> | RequestUrl<Options>,
): GetRequest<Response, Options> {
  checkAndThrowConnectConfigError(meta, mergeInjectionFields(GET_REQUESTS_INJECTION_FIELDS));

  return new GetRequest(meta);
}
