import { DefaultValuePipe } from '@ngmd/utils/pipes';

describe('DefaultValuePipe', () => {
  let pipe: DefaultValuePipe;

  beforeEach(() => {
    pipe = new DefaultValuePipe();
  });

  it('should return value when value is not nullish or empty', () => {
    const value = 'Hello';
    const defaultValue = 'World';
    const result = pipe.transform(value, defaultValue);
    expect(result).toBe(value);
  });

  describe('should return defaultValue when', () => {
    for (const value of [null, undefined, '']) {
      it(`value is ${String(value)}`, () => {
        const defaultValue = 'World';
        const result = pipe.transform(value, defaultValue);
        expect(result).toBe(defaultValue);
      });
    }
  });
});
