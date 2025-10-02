import { IUser } from '@data/users';
import { CacheRequest, useCache } from '@ngmd/utils/http';

export class CacheApiHub {
  public cacheUsers: CacheRequest<IUser[]> = useCache({
    url: '@/users',
    initialValue: [],
  });
}
