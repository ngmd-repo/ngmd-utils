import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConnectionRef } from '@ngmd/utils/http';
import { GqlHub, useGqlHub } from '@ngmd/utils/http/graphql';

import { AlbumsGqlHub } from '../gql-hub/api';

@Component({
  selector: 'ng-gql-child',
  imports: [JsonPipe],
  templateUrl: './gql-child.html',
  styleUrl: './gql-child.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GqlChild {
  protected hub$: GqlHub<AlbumsGqlHub> = useGqlHub(AlbumsGqlHub, {
    cache: ['getAlbum$'],
    onDestroy: {
      reset: ['getAlbum$'],
    },
  });

  protected connectionRef: ConnectionRef = this.hub$.deleteAlbum$.connect({
    next: () => console.log('Delete from GqlChild'),
  });
}
