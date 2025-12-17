import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class AppComponent {}
