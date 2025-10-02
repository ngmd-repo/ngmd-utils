import { OnInit } from '@angular/core';

import { Initialize } from '../public-api';

describe('Initialize decorator', () => {
  class TestClass implements OnInit {
    public counter: number = 0;

    @Initialize()
    public initializeMethod1(): void {
      this.counter++;
    }

    @Initialize()
    public initializeMethod2(): void {
      this.counter++;
    }

    ngOnInit(): void {}
  }

  it('should call decorated methods during ngOnInit', () => {
    const instance = new TestClass();
    instance.ngOnInit();

    expect(instance.counter).toBe(2);
  });
});
