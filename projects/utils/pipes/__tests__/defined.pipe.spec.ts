import { DefinedPipe } from '@ngmd/utils/pipes';

describe('DefinedPipe', () => {
  let pipe: DefinedPipe;

  beforeEach(() => {
    pipe = new DefinedPipe();
  });

  it(`should return 'true' when value is defined`, () => {
    const result = pipe.transform('asdasdasd');
    expect(result).toBeTruthy();
  });

  describe(`should return 'false' when value isn't defined`, () => {
    for (const value of [null, undefined]) {
      it(`for ${String(value)}`, () => {
        const result = pipe.transform(value);
        expect(result).toBeFalsy();
      });
    }
  });
});
