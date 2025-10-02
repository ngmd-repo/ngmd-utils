import { TShowState, TSortDirection } from '@ngmd/utils/types';

import { IUser } from '../data/users/interface/user.interface';

export class RootStore {
  public user: IUser = null;
  public showState: TShowState = 'show';
  public sort: TSortDirection = 'asc';
  public type: string = null;
}
