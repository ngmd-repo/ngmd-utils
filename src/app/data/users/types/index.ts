import { UrlOptions } from '@ngmd/utils/http';

import { IUser } from '../interface/user.interface';

export type TUserCandidate = Pick<IUser, 'email' | 'id' | 'password' | 'username'>;
export type TUsersQuery = { skip: number; limit: number };
export type TUsersUrlOptions = UrlOptions<null, TUsersQuery>;
export type TUserParams = { id: number | string };
export type TUserQuery = { isAdmin: boolean };
export type TGetUserUrlOptions = UrlOptions<TUserParams, TUserQuery>;
export type TGetUsersUrlOptions = UrlOptions<null, TUsersQuery>;
export type TUserUrlOptions = UrlOptions<TUserParams>;
export type TUserAdminUrlOptions = UrlOptions<TUserParams, TUserQuery>;
export type TPostUserUrlOptions = UrlOptions<TUserParams, TUserQuery>;
export type TPatchUserUrlOptions = UrlOptions<TUserParams>;
export type TPutUserUrlOptions = UrlOptions<TUserParams>;
export type TDeleteUserUrlOptions = UrlOptions<TUserParams>;
export type TOperatorForkResponse = {
  user: IUser;
  users: IUser[];
};
