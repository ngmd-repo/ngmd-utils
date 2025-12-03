/* eslint-disable @typescript-eslint/naming-convention */
import { HttpErrorResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { iif, Observable, of, throwError } from 'rxjs';

import { IGqlResponse } from '../../../../interfaces/gql-response.interface';

const defaultWithResponseFn = (response: IGqlResponse<any>): Observable<any> => {
  return iif(
    () => 'errors' in response,
    throwError(() => new HttpErrorResponse({ error: response.errors })),
    of(response?.data),
  );
};

export type WithGqlResponseFn = typeof defaultWithResponseFn;
export const WITH_GQL_RESPONSE_HANDLER = new InjectionToken<WithGqlResponseFn>(
  'WITH_GQL_RESPONSE_HANDLER',
  {
    factory(): WithGqlResponseFn {
      return defaultWithResponseFn;
    },
  },
);
export type WithGqlResponseHandlerFeature = {
  provide: InjectionToken<WithGqlResponseFn>;
  useValue: WithGqlResponseFn;
};
export function withGqlResponseHandler(handler: WithGqlResponseFn): WithGqlResponseHandlerFeature {
  return {
    provide: WITH_GQL_RESPONSE_HANDLER,
    useValue: handler,
  };
}
