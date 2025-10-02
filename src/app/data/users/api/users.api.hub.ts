import {
  CacheRequest,
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
  useCache,
  useDelete,
  useGet,
  usePatch,
  usePost,
  usePut,
} from '@ngmd/utils/http';

import { IUser } from '../interface/user.interface';
import {
  TDeleteUserUrlOptions,
  TGetUsersUrlOptions,
  TGetUserUrlOptions,
  TPatchUserUrlOptions,
  TPostUserUrlOptions,
  TPutUserUrlOptions,
  TUserCandidate,
} from '../types';

export class UsersApiHub {
  public cacheUsers: CacheRequest<IUser[], TGetUsersUrlOptions> = useCache('@/users');
  public getUser: GetRequest<IUser, TGetUserUrlOptions> = useGet(_ => `@/users/${1}`);
  public getUsers: GetRequest<IUser> = useGet('@/users');
  public postUser: PostRequest<TUserCandidate, IUser, TPostUserUrlOptions> =
    usePost('@/users/{{id}}');
  public putUser: PutRequest<TUserCandidate, IUser, TPutUserUrlOptions> = usePut('@/users/{{id}}');
  public patchUser: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> =
    usePatch('@/users/{{id}}');
  public deleteUser: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{{id}}');
}
