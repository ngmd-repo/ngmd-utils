import { AffixPipe } from '@ngmd/utils/pipes';

describe('AffixPipe', () => {
  let pipe: AffixPipe;

  beforeEach(() => {
    pipe = new AffixPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the value with suffix by default', () => {
    const value = 'Hello';
    const tag = 'World';
    const transformedValue = pipe.transform(value, tag);

    expect(transformedValue).toBe(`${value}${tag}`);
  });

  it('should transform the value with prefix when placement is "begin"', () => {
    const value = 'Hello';
    const tag = 'World';
    const transformedValue = pipe.transform(value, tag, 'begin');

    expect(transformedValue).toBe(`${tag}${value}`);
  });

  it('should transform the value with suffix when placement is "end"', () => {
    const value = 'Hello';
    const tag = 'World';
    const transformedValue = pipe.transform(value, tag, 'end');

    expect(transformedValue).toBe(`${value}${tag}`);
  });
});
