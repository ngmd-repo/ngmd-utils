import { RequestUrlOptions } from '../../classes';
import { GetRequestMeta } from './get.request.types';

export const GET_REQUESTS_INJECTION_FIELDS: (keyof Pick<
  GetRequestMeta<any> & RequestUrlOptions,
  'force'
>)[] = [
  'force',
];
