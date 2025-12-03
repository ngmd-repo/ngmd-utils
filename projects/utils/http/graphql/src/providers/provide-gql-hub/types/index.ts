/* eslint-disable @typescript-eslint/naming-convention */
import { OnDestroyOptions } from '@ngmd/utils/http';
import { TExtractKeysByValue, TRequiredArray } from '@ngmd/utils/types';

import { MutationRequest, QueryRequest } from '../../../resources';
import { GqlHubManager } from '../services';

export type GqlRequest = MutationRequest<unknown, any> | QueryRequest<unknown, any>;
export type TGqlHub<T extends object> = {
  [K in keyof T]: GqlRequest;
};
export type GqlHub<T extends TGqlHub<T>> = T & {
  hub: GqlHubManager<T>;
};

export type GqlHubConfig<T extends TGqlHub<T>> = OnDestroyOptions<
  TRequiredArray<keyof T> | true
> & {
  cache?: TRequiredArray<keyof TExtractKeysByValue<T, QueryRequest<unknown, any>>>;
  force?: TRequiredArray<keyof TExtractKeysByValue<T, QueryRequest<unknown, any>>>;
};
