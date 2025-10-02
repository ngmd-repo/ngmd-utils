import { InjectionToken } from '@angular/core';

import { Store } from '../types';

export const ROOT_STORE = new InjectionToken<Store<any>>('ROOT_STORE');
