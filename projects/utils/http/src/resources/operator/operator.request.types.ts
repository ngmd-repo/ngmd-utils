/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';

import { RequestConnection, RequestMeta } from '../../types';

export type OperatorRequestMeta<Response = null> = RequestMeta<Response> & {
  force?: boolean;
  operator?: Observable<Response>;
};

export type OperatorSendOptions<Response = null> = RequestConnection<Response> & {
  operator?: Observable<Response>;
};
