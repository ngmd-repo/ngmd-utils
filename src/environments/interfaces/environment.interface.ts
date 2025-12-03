import { InitializeMeta } from '@ngmd/utils/initializer';

export interface IEnvironment extends InitializeMeta {
  API_HOST?: string;
  API_GRAPHQL_HOST?: string;
}
