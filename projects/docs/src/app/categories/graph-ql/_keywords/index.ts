import { NgDocGlobalKeyword } from '@ng-doc/core';

import { GraphQLClassesKeywords } from '../classes/keywords';
import { GqlInterfacesKeywords } from '../interfaces/keywords';
import { GqlProvidersKeywords } from '../providers/_keywords';
import { GqlResourcesKeywords } from '../resources/keywords';
import { GqlTypesKeywords } from '../types/keywords';

export const GraphQLKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  GraphQLClassesKeywords,
  GqlResourcesKeywords,
  GqlProvidersKeywords,
  GqlInterfacesKeywords,
  GqlTypesKeywords,
);
