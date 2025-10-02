import { InjectionToken } from '@angular/core';

import { StaticDB } from '../services';

export const ROOT_DB = new InjectionToken<StaticDB<any>>('ROOT_DB');
