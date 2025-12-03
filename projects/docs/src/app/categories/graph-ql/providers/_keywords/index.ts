import { NgDocGlobalKeyword } from '@ng-doc/core';

import { ProvideQglKeywords } from '../provide-gql/keywords';
import { ProvideQglHubKeywords } from '../provide-gql-hub/keywords';

export const GqlProvidersKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  ProvideQglKeywords,
  ProvideQglHubKeywords,
);
