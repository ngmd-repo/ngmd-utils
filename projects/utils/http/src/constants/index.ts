import { RequestMeta } from '../types';

export const REQUESTS_INJECTION_FIELDS: (keyof Pick<RequestMeta<any>, 'connect' | 'onDestroy'>)[] =
  [
    'connect',
    'onDestroy',
  ];
