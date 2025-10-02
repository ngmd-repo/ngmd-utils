/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Injector, runInInjectionContext } from '@angular/core';
import { assign, isJSType, isObject } from '@ngmd/utils/handlers';
import { TConstructor } from '@ngmd/utils/types';

import { RequestUrl } from '../classes';
import { REQUESTS_INJECTION_FIELDS } from '../constants';
import { EnRequestCreationContext } from '../enums';
import { ApiHubManager } from '../services';
import { REQUEST_CREATION_CONTEXT } from '../tokens';
import { ApiHub, RequestMeta, TApiHub } from '../types';

export function checkAndThrowConnectConfigError(
  meta: RequestMeta<any> | RequestUrl,
  fieldsList: string[] = REQUESTS_INJECTION_FIELDS,
): never | void {
  if (isObject(meta)) {
    const creationContext: EnRequestCreationContext = inject(REQUEST_CREATION_CONTEXT);
    const isApiHubContext: boolean = EnRequestCreationContext.API_HUB === creationContext;

    if (isApiHubContext) {
      const injectionField: string = fieldsList.find(field => field in meta);

      if (injectionField) {
        throw new Error(`"${injectionField}" must be used only in the injection context`);
      }
    }
  }
}

export function mergeInjectionFields(additionalFields: string[]): string[] {
  return REQUESTS_INJECTION_FIELDS.concat(additionalFields as any);
}

export function checkForReservedHubKeys<T extends object>(hub: T): never | void {
  const isExistReservedKeys: boolean = new Set(Object.keys(hub)).has('hub');

  if (isExistReservedKeys)
    throw new Error('ApiHub cannot contain the following reserved keys for requests: "hub"');
}

export function createRequestInjector(context: EnRequestCreationContext): Injector {
  const injector: Injector = inject(Injector);
  const hubInjector: Injector = Injector.create({
    providers: [
      {
        provide: REQUEST_CREATION_CONTEXT,
        useValue: context,
      },
    ],
    parent: injector,
  });

  return hubInjector;
}

export function createApiHubFactory<T extends TApiHub<T>>(Hub: TConstructor<T>): () => ApiHub<T> {
  return () => {
    const injector: Injector = createRequestInjector(EnRequestCreationContext.API_HUB);

    return runInInjectionContext(injector, () => {
      const instance: TApiHub<T> = new Hub();
      checkForReservedHubKeys(instance);
      const manager: ApiHubManager<TApiHub<T>> = new ApiHubManager(instance);

      return assign(instance, { hub: manager });
    });
  };
}

export function parseExecutionFields<T>(fields: T[] | boolean): T[] {
  return isJSType(fields, 'boolean') ? [] : fields;
}
