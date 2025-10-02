import { ExcludePropertiesPipe } from '../src/exclude-properties.pipe';

describe('ExcludePropertiesPipe', () => {
  let pipe: ExcludePropertiesPipe;

  beforeEach(() => {
    pipe = new ExcludePropertiesPipe();
  });

  describe('check null`s', () => {
    const cases: unknown[] = [null, undefined];

    for (const value of cases) {
      it(`should return an empty object if the object is ${String(value)}`, () => {
        const result = pipe.transform(value as any, ['age', 'city']);
        expect(result).toStrictEqual({});
      });
    }
  });

  it('should exclude specified properties from the object', () => {
    const object = { name: 'John', age: 30, city: 'New York' };
    const result = pipe.transform(object, ['age', 'city']);
    expect(result).toStrictEqual({ name: 'John' });
  });

  it('should return an empty object if the props array is empty', () => {
    const object = { name: 'John', age: 30, city: 'New York' };
    const result = pipe.transform(object, []);
    expect(result).toStrictEqual({});
  });

  it('should return the same object if no properties are specified', () => {
    const object = { name: 'John', age: 30, city: 'New York' };
    const result = pipe.transform(object, ['email', 'phone'] as any);
    expect(result).toStrictEqual(object);
  });
});
