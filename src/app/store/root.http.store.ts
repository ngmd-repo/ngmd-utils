import { IUser } from '@data/users';
import { RequestMeta } from '@ngmd/utils/stores';

export class RootHttpStore {
  public getUser: RequestMeta<IUser[]> = new RequestMeta('@/users');
}
