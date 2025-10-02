import { Observable, Subscription } from 'rxjs';

import { ApiRequest } from '../../classes/api-request.class';
import { OperatorRequestMeta, OperatorSendOptions } from './operator.request.types';

export class OperatorRequest<Response = null> extends ApiRequest<Response> {
  constructor(protected override meta: OperatorRequestMeta<Response>) {
    super(meta);
    this.sendRequestIfForce();
  }

  private sendRequestIfForce(): void {
    if (this.meta.force) this.sendForceRequest();
  }

  private sendForceRequest(): void {
    this.send();
  }

  public request(): Observable<Response> {
    if (!this.meta?.operator) throw new Error(`The field "operator" is empty in meta object`);

    return this.meta.operator;
  }

  public send(options?: OperatorSendOptions<Response>): Subscription {
    const request$: Observable<Response> = options?.operator || this.request();

    return this.sendRequest(request$, options);
  }
}
