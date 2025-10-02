import { OperatorRequestMeta } from './operator.request.types';

export const OPERATOR_REQUESTS_INJECTION_FIELDS: (keyof Pick<OperatorRequestMeta<any>, 'force'>)[] =
  [
    'force',
  ];
