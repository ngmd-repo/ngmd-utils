import { TExtractKeys } from '@ngmd/utils/types';

import { GqlRequestMeta } from '../../../classes/graphql-request.types';

export const GQL_REQUESTS_INJECTION_FIELDS: ReadonlyArray<
  TExtractKeys<GqlRequestMeta<any, any>, 'connect' | 'onDestroy'>
> = ['connect', 'onDestroy'] as const;
