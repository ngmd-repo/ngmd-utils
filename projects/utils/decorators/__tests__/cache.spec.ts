import { OnDestroy, Type } from '@angular/core';

import { Cache } from '../public-api';

describe('Cache decorator', () => {
  let testClass: Type<any>;

  beforeEach(() => {
    class TestClass {
      public counter: number = 0;

      @Cache()
      public cachedMethod(arg: number): number {
        this.counter++;

        return arg + 1;
      }
    }

    testClass = TestClass;
  });

  it('should cache the method result', () => {
    const instance = new testClass();
    const result1 = instance.cachedMethod(5);
    const result2 = instance.cachedMethod(5);

    expect(result1).toBe(6);
    expect(result2).toBe(result1);
    expect(instance.counter).toBe(1);
  });

  it('should cache results with different arguments separately', () => {
    const instance = new testClass();
    const result1 = instance.cachedMethod(5);
    const result2 = instance.cachedMethod(10);

    expect(result1).toBe(6);
    expect(result2).toBe(11);
    expect(instance.counter).toBe(2);
  });

  it('should clear the cache before destroying the instance', () => {
    class DestroyableTestClass implements OnDestroy {
      public counter: number = 0;

      @Cache(true)
      public cachedMethod(arg: number): number {
        this.counter++;

        return arg + 1;
      }

      ngOnDestroy(): void {}
    }

    const instance = new DestroyableTestClass();
    const result1 = instance.cachedMethod(5);
    instance.ngOnDestroy();
    const result2 = instance.cachedMethod(5);

    expect(result1).toBe(6);
    expect(result2).toBe(6);
    expect(instance.counter).toBe(2);
  });
});
