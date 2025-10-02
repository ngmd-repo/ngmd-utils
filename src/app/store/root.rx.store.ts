import { TShowState } from '@ngmd/utils/types';

export class RootRxStore {
  public type: string = 'root-store';
  public config: TRootRxStoreConfig = null;
  public show: TShowState = 'hide';
}

export type TRootRxStoreConfig = {
  title: string;
  description: string;
};
