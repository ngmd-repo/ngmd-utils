export function Bind(ctx?: unknown): MethodDecorator {
  return (
    target: object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const { value: originalMethod } = descriptor;

    return {
      get(): () => unknown {
        return originalMethod.bind(ctx ?? this);
      },
    };
  };
}
