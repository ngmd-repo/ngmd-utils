import { Bind } from '../public-api';

describe('Bind decorator', () => {
  class TestClass {
    @Bind()
    public method(): unknown {
      return this;
    }
  }

  it('should bind the method to the instance context', () => {
    const instance = new TestClass();
    const { method } = instance;

    expect(method()).toBe(instance);
  });

  it('should bind the method to the provided context', () => {
    const customContext = { name: 'Custom Context' };
    const instance = new TestClass();
    const { method } = instance;

    expect(method.bind(customContext)()).toBe(customContext);
  });

  it('should bind the method to the default context if no context is provided', () => {
    const customContext = { name: 'Custom Context' };
    const instance = new TestClass();
    const { method } = instance;

    expect(method.call(customContext)).toBe(customContext);
  });
});
