import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * @deprecated use only detect manager from managers module
 */
@Injectable()
export class UtilsChangeDetectionService {
  private detector$: Subject<void> = new Subject();

  public detectChanges(): void {
    this.detector$.next(null);
  }

  public listenChangeDetection(): Observable<void> {
    return this.detector$.asObservable();
  }
}
