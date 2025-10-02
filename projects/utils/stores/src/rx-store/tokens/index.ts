import { InjectionToken } from '@angular/core';

import { RxStore } from '../services';

//  * Exports
/**
 * @deprecated use useRootStore
 */
export const ROOT_RX_STORE = new InjectionToken<RxStore<any & object>>('ROOT_RX_STORE');
