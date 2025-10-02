import { EndsWithPipe } from '@ngmd/utils/pipes';

describe('EndsWithPipe', () => {
  let pipe: EndsWithPipe;

  beforeEach(() => {
    pipe = new EndsWithPipe();
  });

  describe('positive cases', () => {
    it('should return true if the value is equal to the suffix', () => {
      const value = 'Hello';
      const suffix = 'Hello';
      const result = pipe.transform(value, suffix);
      expect(result).toBe(true);
    });

    it('should return true if the value ends with the suffix', () => {
      const value = 'Hello World';
      const suffix = 'World';
      const result = pipe.transform(value, suffix);
      expect(result).toBe(true);
    });
  });

  describe('negative cases', () => {
    it('the value does not end with the suffix', () => {
      const value = 'Hello World';
      const suffix = 'Hello';
      const result = pipe.transform(value, suffix);
      expect(result).toBe(false);
    });

    it('the value is an empty string', () => {
      const value = '';
      const suffix = 'World';
      const result = pipe.transform(value, suffix);
      expect(result).toBe(false);
    });

    describe("the value isn't string", () => {
      const types = [
        5,
        null,
        undefined,
        true,
        () => {},
        [],
        {},
      ];

      for (const type of types) {
        it(`typeof "${typeof type}"`, () => {
          const result = pipe.transform(type, 'suffix');
          expect(result).toBe(false);
        });
      }
    });
  });
});
