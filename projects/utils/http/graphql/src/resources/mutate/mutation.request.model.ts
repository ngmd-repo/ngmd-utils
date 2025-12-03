/* eslint-disable @typescript-eslint/no-useless-constructor */

import { GqlRequestString } from '../../classes';
import { GraphQLRequest } from '../../classes/graphql-request.class';
import { MutationRequestMeta } from './mutation.request.types';

export class MutationRequest<Response, Variables extends object = null> extends GraphQLRequest<
  'mutation',
  Response,
  Variables
> {
  protected override meta: MutationRequestMeta<Response>;

  constructor(queryOrMeta: GqlRequestString<'mutation'> | MutationRequestMeta<Response>) {
    super(queryOrMeta);
  }
}
