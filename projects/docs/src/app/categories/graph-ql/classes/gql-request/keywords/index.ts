import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const GraphQLRequestKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  makeModuleKeywords('/graph-ql/classes/gql-request', [
    'GraphQLRequest',
    'GqlRequestType',
    'GqlRequestString',
    'GqlRequestMeta',
    'GqlRequestOptions',
    'GqlSendOptions',
  ]),
);
