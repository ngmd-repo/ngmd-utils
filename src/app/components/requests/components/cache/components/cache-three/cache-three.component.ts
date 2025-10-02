import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiHub, useApiHub } from '@ngmd/utils/http';

import { CacheApiHub } from '../../api/cache.api.hub';

@Component({
  selector: 'ng-cache-three',
  imports: [],
  templateUrl: './cache-three.component.html',
  styleUrl: './cache-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CacheThreeComponent {
  protected cacheHub: ApiHub<CacheApiHub> = useApiHub(CacheApiHub, {
    cache: ['cacheUsers'],
  });
}
