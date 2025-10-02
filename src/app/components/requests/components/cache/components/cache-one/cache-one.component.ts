import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiHub, useApiHub } from '@ngmd/utils/http';

import { CacheApiHub } from '../../api/cache.api.hub';

@Component({
  selector: 'ng-cache-one',
  imports: [],
  templateUrl: './cache-one.component.html',
  styleUrl: './cache-one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CacheOneComponent {
  protected cacheHub: ApiHub<CacheApiHub> = useApiHub(CacheApiHub, {
    cache: ['cacheUsers'],
  });
}
