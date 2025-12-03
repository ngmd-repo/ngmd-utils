import { NgDocGlobalKeyword } from '@ng-doc/core';

import { GraphQLRequestKeywords } from '../gql-request/keywords';

export const GraphQLClassesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  GraphQLRequestKeywords,
);
