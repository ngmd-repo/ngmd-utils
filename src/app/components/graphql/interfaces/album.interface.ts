export interface IAlbum {
  id: number;
  title: string;
  user: {
    id: number;
    username: string;
  };
}
