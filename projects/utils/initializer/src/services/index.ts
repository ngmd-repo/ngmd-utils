/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PlatformService } from '@ngmd/utils/services';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';

import { INITIALIZE_ENVIRONMENT } from '../features/initialize-environment';
import { INITIALIZE_HANDLER, InitializeHandler } from '../features/initialize-handler';
import { InitializeState } from '../features/initialize-state/initialize-state.service';
import { InitializeMeta } from '../interfaces/initialize-meta.interface';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  private initializeHandler: InitializeHandler<object> = inject(INITIALIZE_HANDLER, {
    optional: true,
  });
  private initializeState: InitializeState<object> = inject(InitializeState, {
    optional: true,
  });
  private initializeEnvironment: object = inject(INITIALIZE_ENVIRONMENT, {
    optional: true,
  });

  private httpClient: HttpClient = inject(HttpClient);
  private platform: PlatformService = inject(PlatformService);

  public initialize<T extends InitializeMeta>(meta: T): Observable<boolean> {
    const url: string = `${meta.CONFIG_ROOT}?t=${Date.now()}`;
    const request$: Observable<T> = this.platform.isServer()
      ? this.httpClient.get<T>(url)
      : ajax.getJSON<T>(url);

    return request$.pipe(
      tap((dataJSON: T) => {
        this.handleDataJSONObject(dataJSON);
      }),
      map(Boolean),
    );
  }

  private handleDataJSONObject(dataJSON: object): void {
    if (this.initializeEnvironment) this.withEnvironment(dataJSON);
    if (this.initializeState) this.withState(dataJSON);
    if (this.initializeHandler) this.initializeHandler(dataJSON);
  }

  private withState(dataJSON: object): void {
    this.initializeState.config.set(dataJSON);
    this.initializeState['isLoadedConfig'].set(true);
  }

  private withEnvironment(dataJSON: object): void {
    Object.assign(this.initializeEnvironment, dataJSON);
  }
}
