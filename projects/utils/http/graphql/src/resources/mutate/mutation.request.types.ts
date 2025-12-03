/* eslint-disable @typescript-eslint/naming-convention */
import { GqlRequestMeta } from '../../classes/graphql-request.types';

export type MutationRequestMeta<Response> = GqlRequestMeta<'mutation', Response>;
