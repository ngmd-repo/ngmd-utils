import { GqlRequestString } from '../../classes';
import { checkAndThrowConnectConfigError } from '../../providers/provide-gql-hub/handlers';
import { MutationRequest } from './mutation.request.model';
import { MutationRequestMeta } from './mutation.request.types';

export function useMutation<Response, Variables extends object = null>(
  queryOrMeta: GqlRequestString<'mutation'> | MutationRequestMeta<Response>,
): MutationRequest<Response, Variables> {
  checkAndThrowConnectConfigError(queryOrMeta);

  return new MutationRequest(queryOrMeta);
}
