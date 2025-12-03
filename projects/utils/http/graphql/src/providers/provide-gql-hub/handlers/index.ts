/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Injector, runInInjectionContext } from '@angular/core';
import { assign, isJSType } from '@ngmd/utils/handlers';
import { TConstructor } from '@ngmd/utils/types';

import { GqlRequestMeta, GqlRequestType } from '../../../classes/graphql-request.types';
import { GQL_REQUESTS_INJECTION_FIELDS } from '../constants';
import { EnGqlRequestContext } from '../enums';
import { GqlHubManager } from '../services';
import { GQL_REQUEST_CREATION_CONTEXT } from '../tokens';
import { GqlHub, TGqlHub } from '../types';

export function createGqlRequestInjector(context: EnGqlRequestContext): Injector {
  const parent: Injector = inject(Injector);

  return Injector.create({
    providers: [
      {
        provide: GQL_REQUEST_CREATION_CONTEXT,
        useValue: context,
      },
    ],
    parent,
  });
}

export function checkForReservedHubKeys<T extends object>(hub: T): never | void {
  const isExistReservedKeys: boolean = new Set(Object.keys(hub)).has('hub');

  if (isExistReservedKeys)
    throw new Error('QglHub cannot contain the following reserved keys for requests: "hub"');
}

export function createGqlHubFactory<T extends TGqlHub<T>>(
  Hub: TConstructor<T>,
): (Hub: TConstructor<T>) => GqlHub<T> {
  return () => {
    const injector: Injector = createGqlRequestInjector(EnGqlRequestContext.GQL_HUB);

    return runInInjectionContext(injector, () => {
      const hub: TGqlHub<T> = new Hub();
      checkForReservedHubKeys(hub);
      const manager: GqlHubManager<TGqlHub<T>> = new GqlHubManager(hub);

      return assign(hub, { hub: manager });
    });
  };
}

export function checkAndThrowConnectConfigError(
  meta: GqlRequestMeta<GqlRequestType, any> | string,
  fieldsList: string[] = GQL_REQUESTS_INJECTION_FIELDS as string[],
): never | void {
  if (!isJSType(meta, 'string')) {
    const creationContext: EnGqlRequestContext = inject(GQL_REQUEST_CREATION_CONTEXT);
    const isApiHubContext: boolean = EnGqlRequestContext.GQL_HUB === creationContext;

    if (isApiHubContext) {
      const injectionField: string = fieldsList.find(field => field in meta);

      if (injectionField) {
        throw new Error(`"${injectionField}" must be used only in the injection context`);
      }
    }
  }
}
