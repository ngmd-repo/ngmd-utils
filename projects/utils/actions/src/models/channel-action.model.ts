export class ChannelAction<const Type extends string, const Payload = null> {
  constructor(
    public type: Type,
    public payload?: Payload,
  ) {}
}
