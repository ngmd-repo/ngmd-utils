import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const ProvideQglHubKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  makeModuleKeywords('/graph-ql/providers/provide-gql-hub', [
    'provideGqlHub',
    'GqlHubManager',
    'GqlRequest',
    'TGqlHub',
    'GqlHub',
    'GqlHubConfig',
  ]),
);
