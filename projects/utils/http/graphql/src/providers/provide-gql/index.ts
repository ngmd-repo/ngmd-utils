import { Provider } from '@angular/core';
import { TRequiredArray } from '@ngmd/utils/types';

import { GqlFeatures } from './features';

export function provideGql(...features: TRequiredArray<GqlFeatures>): Provider[] {
  return features;
}
