/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
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
  public visible: WritableSignal<boolean> = signal(true);
  protected file: File = null;

  public toggleVisibility(): void {
    this.visible.update(v => !v);
  }
  public isShow: WritableSignal<boolean> = signal(true);
  public toggleShow(): void {
    this.isShow.update(v => !v);
  }

  ngOnInit(): void {}
}
