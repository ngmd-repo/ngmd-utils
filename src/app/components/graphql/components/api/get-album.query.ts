import { GqlRequestString } from '@ngmd/utils/http/graphql';

export type TGetAlbumsVars = {
  id: number;
};
export const GET_ALBUM: GqlRequestString<'query'> = `#graphql
  query GetAlbum($id:ID!) {
    album(id: $id) {
      id,
      title,
      user {
        id,
        username
      }
    }
  }
`;
