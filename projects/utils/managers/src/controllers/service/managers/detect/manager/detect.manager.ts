/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Observable, Subject } from 'rxjs';

import { OnInitManager } from '../../../../../interfaces';
import { TDetectionEvent } from '../types/detect.types';

export type TExcludeDetectFields = Extract<keyof DetectManager<any>, '__detector$' | 'init'>;
export class DetectManager<Action extends string> implements OnInitManager {
  public __detector$: Subject<TDetectionEvent<Action>> = new Subject();

  public init(serviceInstance: any): void {
    serviceInstance.__detector$ = new Subject();
  }

  public detectChanges(type: TDetectionEvent<Action> = 'default'): void {
    this.__detector$.next(type);
  }

  public listenDetectChanges(): Observable<TDetectionEvent<Action>> {
    return this.__detector$.asObservable();
  }
}
