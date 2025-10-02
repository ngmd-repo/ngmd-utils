import { InjectionToken } from '@angular/core';

import { HttpStore } from '../public-api';

export const ROOT_HTTP_STORE = new InjectionToken<HttpStore<unknown>>('ROOT_HTTP_STORE');
