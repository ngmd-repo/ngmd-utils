import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IUser } from '@data/users';
import { CacheRequest } from '@ngmd/utils/http';

import { RequestsItemsViewService } from '../../services/requests-items.view.service';

@Component({
  selector: 'ng-request-items-one',
  imports: [JsonPipe],
  templateUrl: './request-items-one.component.html',
  styleUrl: './request-items-one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestItemsOneComponent {
  private viewService: RequestsItemsViewService = inject(RequestsItemsViewService);
  public cacheUsers$: CacheRequest<IUser> = this.viewService.cacheUsers$.cache();
}
