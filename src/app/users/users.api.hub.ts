import { DeleteRequest, PatchRequest, UrlOptions, useDelete, usePatch } from '@ngmd/utils/http';

import { IUser } from './user.interface';
import { TUserCandidate } from './user.types';

export class UsersApiHub {
  public patchUser$: PatchRequest<TUserCandidate, IUser, TPatchUserUrlOptions> =
    usePatch('@/users/{{id}}');
  public deleteUser$: DeleteRequest<TDeleteUserUrlOptions> = useDelete('@/users/{{id}}');
}

export type TUserParams = { id: string };
export type TPatchUserUrlOptions = UrlOptions<TUserParams>;
export type TDeleteUserUrlOptions = UrlOptions<TUserParams>;
