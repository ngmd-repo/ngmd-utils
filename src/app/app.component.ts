/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
