export interface ILocalStorage {
  role: 'Admin' | 'User';
  mode: 'Read' | 'Write';
  status: EnAppStatus;
  obj: {
    a: number;
    b: string;
  };
}

export enum EnAppStatus {
  BLOCK,
  ENABLED,
}
