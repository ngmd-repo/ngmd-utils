import { ConditionPipe } from '@ngmd/utils/pipes';

describe('ConditionPipe', () => {
  let pipe: ConditionPipe;

  beforeEach(() => {
    pipe = new ConditionPipe();
  });

  it('should return ifValue when condition is truthy', () => {
    const condition = true;
    const ifValue = 'Hello';
    const elseValue = 'World';
    const result = pipe.transform(condition, ifValue, elseValue);
    expect(result).toBe(ifValue);
  });

  describe('negative cases', () => {
    const testCases = [
      false,
      undefined,
      null,
      '',
    ];

    for (const condition of testCases) {
      it(`should return elseValue when condition is "${String(condition)}"`, () => {
        const ifValue = 'Hello';
        const elseValue = 'World';
        const result = pipe.transform(condition, ifValue, elseValue);
        expect(result).toBe(elseValue);
      });
    }
  });
});
