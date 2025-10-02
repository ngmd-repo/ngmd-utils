export class StateChange<T extends object, K extends keyof T = keyof T> {
  constructor(public property: K, public previous: T[K], public current: T[K]) {}
}

export type TStateChanges<
  State extends object,
  StateKeys extends Array<keyof State>,
> = StateKeys extends [infer A, ...infer B extends Array<keyof State>]
  ? StateChange<Pick<State, A & keyof State>> | TStateChanges<State, B>
  : never;
