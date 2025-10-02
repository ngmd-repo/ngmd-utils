import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiHub, useApiHub } from '@ngmd/utils/http';

import { CacheApiHub } from '../../api/cache.api.hub';

@Component({
  selector: 'ng-cache-two',
  imports: [],
  templateUrl: './cache-two.component.html',
  styleUrl: './cache-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CacheTwoComponent {
  protected cacheHub: ApiHub<CacheApiHub> = useApiHub(CacheApiHub, {
    cache: ['cacheUsers'],
  });
}
