import { GqlRequestString } from '@ngmd/utils/http/graphql';

export const DELETE_ALBUM: GqlRequestString<'mutation'> = `#graphql
  mutation DeleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
  }
`;

export type TDeleteAlbumResponse = {
  deleteAlbum: boolean;
};
