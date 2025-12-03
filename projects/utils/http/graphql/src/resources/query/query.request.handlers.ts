import { GqlRequestString } from '../../classes';
import { GQL_REQUESTS_INJECTION_FIELDS } from '../../providers/provide-gql-hub/constants';
import { checkAndThrowConnectConfigError } from '../../providers/provide-gql-hub/handlers';
import { GQL_QUERY_REQUEST_INJECTION_FIELDS } from './query.constants';
import { QueryRequest } from './query.request.model';
import { QueryRequestMeta } from './query.request.types';

export function useQuery<Response, Variables extends object = null>(
  queryOrMeta: GqlRequestString<'query'> | QueryRequestMeta<Response, Variables>,
): QueryRequest<Response, Variables> {
  checkAndThrowConnectConfigError(
    queryOrMeta,
    GQL_REQUESTS_INJECTION_FIELDS.concat(GQL_QUERY_REQUEST_INJECTION_FIELDS as any),
  );

  return new QueryRequest(queryOrMeta);
}
