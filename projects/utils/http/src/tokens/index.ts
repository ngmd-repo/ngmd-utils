import { InjectionToken } from '@angular/core';

import { EnRequestCreationContext } from '../enums';
import { ApiHub } from '../types';

export const ROOT_API_HUB = new InjectionToken<ApiHub<any>>('ROOT_API_HUB');
export const REQUEST_CREATION_CONTEXT = new InjectionToken<EnRequestCreationContext>(
  'REQUEST_CREATION_CONTEXT',
  {
    factory(): EnRequestCreationContext {
      return EnRequestCreationContext.COMPONENT;
    },
  },
);
