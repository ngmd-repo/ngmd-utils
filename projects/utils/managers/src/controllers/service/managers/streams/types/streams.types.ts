import { TRxSubject } from '@ngmd/utils/types';

export type TDestroyStream<
  T extends object,
  K extends keyof T & `${string}$` = keyof T & `${string}$`,
> =
  | {
      [Key in K]: {
        streamName: Key;
        streamValue: T[Key] extends TRxSubject<infer V> ? V | null : never;
      };
    }[K]
  | K;
