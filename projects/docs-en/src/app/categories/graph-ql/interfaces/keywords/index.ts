import { NgDocGlobalKeyword } from '@ng-doc/core';

import { GqlErrorInterfaceKeywords } from '../igql-error/keywords';
import { GqlResponseInterfaceKeywords } from '../igql-response/keywords';

export const GqlInterfacesKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  GqlResponseInterfaceKeywords,
  GqlErrorInterfaceKeywords,
);
