import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IUser } from '@data/users';
import { CacheRequest } from '@ngmd/utils/http';

import { RequestsItemsViewService } from '../../services/requests-items.view.service';

@Component({
  selector: 'ng-request-items-two',
  imports: [JsonPipe],
  templateUrl: './request-items-two.component.html',
  styleUrl: './request-items-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestItemsTwoComponent {
  private viewService: RequestsItemsViewService = inject(RequestsItemsViewService);
  public cacheUsers$: CacheRequest<IUser> = this.viewService.cacheUsers$.cache();
}
