import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../common/handlers';

export const ProvideQglKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  makeModuleKeywords('/graph-ql/providers/provide-gql', [
    'provideGql',
    'GqlConfigFeature',
    'GqlConfig',
    'GqlFeatures',
    'withGqlConfig',
    'WithGqlResponseHandlerFeature',
    'WithGqlResponseFn',
    'withGqlResponseHandler',
  ]),
);
