import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IUser } from '@data/users';
import { CacheRequest } from '@ngmd/utils/http';

import { RequestsItemsViewService } from '../../services/requests-items.view.service';

@Component({
  selector: 'ng-request-items-three',
  imports: [JsonPipe],
  templateUrl: './request-items-three.component.html',
  styleUrl: './request-items-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestItemsThreeComponent {
  private viewService: RequestsItemsViewService = inject(RequestsItemsViewService);
  public cacheUsers$: CacheRequest<IUser> = this.viewService.cacheUsers$.cache();
}
