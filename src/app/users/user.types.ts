import { IUser } from './user.interface';

export type TUserCandidate = Partial<Pick<IUser, 'name' | 'status'>>;
