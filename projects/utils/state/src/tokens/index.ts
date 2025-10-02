import { InjectionToken } from '@angular/core';

import { State } from '../types';

export const ROOT_STATE = new InjectionToken<State<any>>('ROOT_STATE');
