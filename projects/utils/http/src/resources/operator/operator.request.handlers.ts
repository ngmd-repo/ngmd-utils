/* eslint-disable @typescript-eslint/no-use-before-define */
import { checkAndThrowConnectConfigError } from '../../handlers';
import { RequestMeta } from '../../types';
import { OPERATOR_REQUESTS_INJECTION_FIELDS } from './operator.request.constants';
import { OperatorRequest } from './operator.request.model';
import { OperatorRequestMeta } from './operator.request.types';

export function useOperator<Response = null>(
  meta?: OperatorRequestMeta<Response>,
): OperatorRequest<Response> {
  meta ??= {};
  checkAndValidateOperatorMeta(meta);

  return new OperatorRequest(meta);
}

function checkForceFlag<Response>(meta: OperatorRequestMeta<Response>): never | void {
  if (meta.force) {
    const isCorrectlyForceStrategy: boolean = 'operator' in meta;

    if (!isCorrectlyForceStrategy)
      throw new Error('The "operator" property is required if you use the "force" flag');
  }
}

function checkAndValidateOperatorMeta<Response>(meta: OperatorRequestMeta<Response>): never | void {
  checkAndThrowConnectConfigError(
    meta as RequestMeta<Response>,
    OPERATOR_REQUESTS_INJECTION_FIELDS,
  );
  checkForceFlag(meta);
}
