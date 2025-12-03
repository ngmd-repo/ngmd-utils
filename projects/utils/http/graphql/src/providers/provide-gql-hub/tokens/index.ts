import { InjectionToken } from '@angular/core';

import { EnGqlRequestContext } from '../enums';

export const GQL_REQUEST_CREATION_CONTEXT: InjectionToken<EnGqlRequestContext> =
  new InjectionToken<EnGqlRequestContext>('GQL_REQUEST_CREATION_CONTEXT', {
    factory(): EnGqlRequestContext {
      return EnGqlRequestContext.COMPONENT;
    },
  });
