/* eslint-disable @typescript-eslint/naming-convention */
import { GqlConfigFeature } from './with-gql-config';
import { WithGqlResponseHandlerFeature } from './with-response-handler';

export { GqlConfig, GqlConfigFeature, withGqlConfig } from './with-gql-config';
export {
  WithGqlResponseFn,
  withGqlResponseHandler,
  WithGqlResponseHandlerFeature,
} from './with-response-handler';

export type GqlFeatures = GqlConfigFeature | WithGqlResponseHandlerFeature;
