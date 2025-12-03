import { TExtractKeys } from '@ngmd/utils/types';

import { QueryRequestMeta } from './query.request.types';

export const GQL_QUERY_REQUEST_INJECTION_FIELDS: ReadonlyArray<
  TExtractKeys<QueryRequestMeta<any>, 'force'>
> = ['force'];
