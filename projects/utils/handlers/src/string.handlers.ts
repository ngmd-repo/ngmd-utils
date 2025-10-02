/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { isJSType } from './condition.handlers';

export function titlecase<T extends string>(str: T): Capitalize<T> {
  const firstLetter: string = str[0].toUpperCase();
  const nextSymbols: string = str.slice(1);

  return (firstLetter + nextSymbols) as Capitalize<T>;
}

export function prefix(str: unknown, tag: string): string {
  return `${tag}${String(str)}`;
}

export function addPrefixIfNot(str: string, prefixStr: string): string {
  if (!str || !prefixStr) return str;

  const isContainPrefix: boolean = str.startsWith(prefixStr);

  return isContainPrefix ? str : prefix(str, prefixStr);
}

export function replace(
  str: string,
  from: string,
  to: number | string,
  flags: string = 'gi',
): string {
  const reg: RegExp = new RegExp(`${from}`, flags);

  return str.replace(reg, String(to));
}

export function suffix(str: unknown, tag: string): string {
  return `${String(str)}${tag}`;
}

export function trim(str: unknown): string {
  if (isJSType(str, 'string')) {
    return (str as string).replace(/\s+/g, ' ').trim();
  }

  return str as string;
}

export function removeSpaces(str: string): string {
  if (isJSType(str, 'string')) {
    return str.replace(/\s+/g, '').trim();
  }

  return str;
}

export function trimStringValues<T extends object>(obj: T, removeValSpaces: boolean = false): T {
  const trimMethod: (str: string) => string = removeValSpaces ? removeSpaces : trim;

  return Object.entries(obj).reduce<T>(
    (accum, [key, value]) => {
      const isString: boolean = isJSType(value, 'string');
      accum[key as keyof T] = isString ? trimMethod(value as string) : value;

      return accum;
    },
    {} as unknown as T,
  ) as T;
}

export function joinUrl(args: (number | string)[], separator: string = '/'): string {
  return args.join(separator);
}

export function wrapString(str: string, startWith: string, endWith: string = startWith): string {
  return `${startWith}${str}${endWith}`;
}

export function testIncludeWord(str: string, word: string): boolean {
  const regexp: RegExp = new RegExp(`\\b${word}\\b`);

  return regexp.test(str);
}

export function lowercase(str: string): string {
  return isJSType(str, 'string') ? str.toLocaleLowerCase() : str;
}

export function isEqualStrings(str1: string, str2: string): boolean {
  const isExistStrings: boolean = isJSType(str1, 'string') && isJSType(str2, 'string');

  if (isExistStrings) {
    return str1.toLowerCase() === str2.toLowerCase();
  }

  return false;
}

export function sliceStringToSegments(str: string, segmentsLength: number = 2): string[] {
  const segments: string[] = [];
  const splittedArray: string[] = str.split('');

  while (splittedArray.length > 0) {
    const segment: string = splittedArray.splice(0, segmentsLength).join('');

    segments.push(segment);
  }

  return segments;
}

export function removeSymbols(str: string, symbols: string): string {
  const symbolsRegex: RegExp = new RegExp('', 'gi');
  const parsedSymbols: string = symbols.replace(symbolsRegex, '\\').replace(/\\$/, '');
  const regex: RegExp = new RegExp(`[${parsedSymbols}]`, 'gi');

  return str.replace(regex, '');
}

export function removeSideSymbols(str: string, count: number): string {
  return str.slice(count).slice(0, str.length - (count + count));
}
