/**
 * @deprecated Use only ServiceAction model
 */
export interface IServiceAction<Type extends string = string, Payload = unknown> {
  type: Type;
  payload?: Payload;
}
