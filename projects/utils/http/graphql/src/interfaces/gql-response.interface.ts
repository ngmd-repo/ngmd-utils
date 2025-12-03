import { IGqlError } from './gql-error.interface';

export interface IGqlResponse<Response> {
  data?: Response;
  errors?: IGqlError[];
}
