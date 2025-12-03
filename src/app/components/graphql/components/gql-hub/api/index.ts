import { ID, MutationRequest, QueryRequest, useMutation, useQuery } from '@ngmd/utils/http/graphql';

import { IAlbum } from '../../../interfaces/album.interface';
import { DELETE_ALBUM, TDeleteAlbumResponse } from '../../api/delete-album.query';
import { GET_ALBUM } from '../../api/get-album.query';

export class AlbumsGqlHub {
  public getAlbum$: QueryRequest<IAlbum, ID<number>> = useQuery({
    query: GET_ALBUM,
    cache: {
      variables: { id: 7 },
    },
  });
  public deleteAlbum$: MutationRequest<TDeleteAlbumResponse, ID> = useMutation({
    query: DELETE_ALBUM,
  });

  public album$: QueryRequest<IAlbum, ID<number>> = useQuery(GET_ALBUM);
}
