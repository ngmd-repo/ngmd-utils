/**
 * @deprecated Use only StateChange model
 */
export interface IStateChange<T extends object, P extends keyof T> {
  property: P;
  previous: T[P];
  current: T[P];
}
