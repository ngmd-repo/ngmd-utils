import { TMutableObject } from '@ngmd/utils/types';

export type TIsCopyResult<T, C extends boolean> = C extends true
  ? T extends object
    ? TMutableObject<T>
    : T
  : Readonly<T>;
