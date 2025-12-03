/* eslint-disable @typescript-eslint/naming-convention */
import { GqlRequestMeta, GqlRequestOptions } from '../../classes/graphql-request.types';

export type QueryRequestMeta<Response, Variables extends object = null> = GqlRequestMeta<
  'query',
  Response
> & {
  cache?: GqlRequestOptions<Variables> | boolean;
  force?: GqlRequestOptions<Variables> | boolean;
  initialValue?: Response;
};
