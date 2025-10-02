import { TSortDirection } from '@ngmd/utils/types';

export class ViewState {
  public sort: TSortDirection = 'asc';
  public mode: 'some' | 'type' = 'some';
  public number: number = 1;
}
