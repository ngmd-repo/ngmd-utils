import { InjectionToken } from '@angular/core';

import { SignalStore } from '../services';

/**
 * @deprecated use useRootStore
 */
export const ROOT_SIGNAL_STORE = new InjectionToken<SignalStore<object>>('ROOT_SIGNAL_STORE');
