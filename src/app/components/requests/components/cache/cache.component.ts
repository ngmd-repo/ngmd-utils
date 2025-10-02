import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { provideApiHub } from '@ngmd/utils/http';

import { CacheApiHub } from './api/cache.api.hub';
import { CacheOneComponent } from './components/cache-one/cache-one.component';
import { CacheThreeComponent } from './components/cache-three/cache-three.component';
import { CacheTwoComponent } from './components/cache-two/cache-two.component';

@Component({
  selector: 'ng-cache',
  imports: [CacheOneComponent, CacheTwoComponent, CacheThreeComponent],
  providers: [provideApiHub(CacheApiHub)],
  templateUrl: './cache.component.html',
  styleUrl: './cache.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CacheComponent {
  public isShow: WritableSignal<boolean> = signal(true);
  public toggleShow(): void {
    this.isShow.update(v => !v);
  }
}
