import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConnectionRef } from '@ngmd/utils/http';
import { GqlHub, provideGqlHub, useGqlHub } from '@ngmd/utils/http/graphql';

import { ToggleService } from '../../../../services/toggle.service';
import { GqlChild } from '../gql-child/gql-child';
import { AlbumsGqlHub } from './api';

@Component({
  selector: 'ng-gql-hub',
  imports: [JsonPipe, GqlChild],
  templateUrl: './gql-hub.html',
  styleUrl: './gql-hub.scss',
  providers: [
    ToggleService,
    provideGqlHub(AlbumsGqlHub),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GqlHubComponent {
  protected toggle: ToggleService = inject(ToggleService);
  protected hub$: GqlHub<AlbumsGqlHub> = useGqlHub(AlbumsGqlHub, {
    cache: ['getAlbum$'],
    onDestroy: {
      abort: ['getAlbum$'],
    },
  });

  private connectionRef: ConnectionRef = this.hub$.deleteAlbum$.connect({
    next: () => console.log('Delete from GqlParent'),
  });

  constructor() {
    this.hub$.album$.send({
      variables: { id: 3 },
      connect: {
        next(response) {
          console.log('String response', response);
        },
      },
    });
  }

  protected deleteAlbum(): void {
    this.hub$.deleteAlbum$.send({
      variables: {
        id: '5',
      },
    });
  }
}
