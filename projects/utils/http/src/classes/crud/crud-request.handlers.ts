import { assign, isJSType } from '@ngmd/utils/handlers';

import { CrudRequestMeta, RequestUrl } from './crud-request.types';

export function isCrudRequestMeta(
  candidate: CrudRequestMeta<any> | RequestUrl,
): candidate is CrudRequestMeta<any> {
  return !(isJSType(candidate, 'string') || isJSType(candidate, 'function'));
}

export function serializeCrudMeta<Response>(
  urlOrMeta: CrudRequestMeta<Response> | RequestUrl,
): CrudRequestMeta<Response> {
  switch (true) {
    case !isCrudRequestMeta(urlOrMeta): {
      return { url: urlOrMeta };
    }
    default: {
      return assign(urlOrMeta);
    }
  }
}
