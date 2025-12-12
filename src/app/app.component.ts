/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GetRequest, useGet } from '@ngmd/utils/http';
import { UntilDestroy } from '@ngneat/until-destroy';

import { AppImports } from './imports';

@UntilDestroy()
@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: AppImports,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private testReq$: GetRequest<Blob> = useGet('@/req');

  constructor() {
    this.testReq$.send({
      httpOptions: {
        responseType: 'blob',
        observe: 'response',
      },
      connect: {
        next(response: Blob): void {
          console.log(response.arrayBuffer());
        },
      },
    });
  }
}
