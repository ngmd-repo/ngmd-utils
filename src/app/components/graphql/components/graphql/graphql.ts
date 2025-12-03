import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import {
  ID,
  MutationRequest,
  QueryRequest,
  QueryRequestMeta,
  useMutation,
  useQuery,
} from '@ngmd/utils/http/graphql';

import { IAlbum } from '../../interfaces/album.interface';
import { DELETE_ALBUM, TDeleteAlbumResponse } from '../api/delete-album.query';
import { GET_ALBUM } from '../api/get-album.query';
import { GqlHubComponent } from '../gql-hub/gql-hub';

@Component({
  selector: 'ng-graphql',
  imports: [GqlHubComponent],
  templateUrl: './graphql.html',
  styleUrl: './graphql.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Graphql {
  public isShow: WritableSignal<boolean> = signal(false);
  private meta: QueryRequestMeta<IAlbum, ID<number>> = {
    query: GET_ALBUM,
    url: '@another-graphql',
    force: {
      variables: {
        id: 1,
      },
    },
    connect: {
      next: (response: IAlbum) => console.log('Response:', response),
      error: (e: HttpErrorResponse) => console.log('Error:', e.error),
    },
  };
  public album$: QueryRequest<IAlbum, ID<number>> = useQuery(this.meta);
  protected deleteAlbum$: MutationRequest<TDeleteAlbumResponse, ID<number>> = useMutation({
    query: DELETE_ALBUM,
    connect: {
      next: (response: TDeleteAlbumResponse) => console.log('Delete Album:', response),
    },
  });

  public toggle(): void {
    this.isShow.update(v => !v);
  }

  public changeCacheOptions(): void {
    this.album$.setCacheOptions({
      variables: {
        id: 8,
      },
    });
  }

  protected deleteAlbum(id: number): void {
    this.deleteAlbum$.send({
      variables: { id },
    });
  }
}
