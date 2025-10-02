export function Enumerable(): MethodDecorator {
  return function (
    target: object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    return { ...descriptor, enumerable: true };
  };
}
