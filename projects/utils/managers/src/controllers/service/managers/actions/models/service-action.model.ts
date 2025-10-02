export class ServiceAction<Type extends string = string, const Payload = unknown> {
  constructor(public type: Type, public payload: Payload = null) {}
}
