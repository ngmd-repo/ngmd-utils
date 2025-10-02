/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';

export const INITIALIZE_ENVIRONMENT = new InjectionToken<object>('INITIALIZE_ENVIRONMENT');
export type InitializeEnvironmentFeature<T extends object = object> = {
  provide: typeof INITIALIZE_ENVIRONMENT;
  useValue: T;
};
export function withEnvironment<T extends object>(environment: T): InitializeEnvironmentFeature<T> {
  return {
    provide: INITIALIZE_ENVIRONMENT,
    useValue: environment,
  };
}
