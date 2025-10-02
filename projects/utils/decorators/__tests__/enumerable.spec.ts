import { Enumerable } from '../public-api';

describe('Enumerable decorator', () => {
  class TestClass {
    @Enumerable()
    public method1(): void {}

    public method3(): void {}
  }

  it('should make decorated methods enumerable', () => {
    const instance = new TestClass();

    expect(instance.propertyIsEnumerable('method1')).toBeTruthy();
    expect(instance.propertyIsEnumerable('method3')).toBeFalsy();
  });
});
