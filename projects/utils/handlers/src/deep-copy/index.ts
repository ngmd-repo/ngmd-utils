import { isObject } from '../condition.handlers';

export function deepCopy<T extends object>(object: T): T {
  if (!isObject(object)) {
    throw new Error(`Value: ${String(object)} can only be an object`);
  }

  const cloning = {} as T;

  Object.keys(object).map(prop => {
    const value: T[keyof T] = object[prop as keyof T];

    if (Array.isArray(value)) {
      (cloning as unknown)[prop as keyof T] = (value as unknown as Array<object>)
        .concat()
        .map(item => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          return isObject(item) ? deepCopy(item) : Array.isArray(item) ? deepCopyArray(item) : item;
        });
    } else if (isObject(value)) {
      cloning[prop as keyof T] = deepCopy(value as unknown as object) as unknown as T[keyof T];
    } else cloning[prop as keyof T] = value;
  });

  return cloning;
}

export function deepCopyArray<T extends unknown[]>(arr: T): T {
  if (!Array.isArray(arr)) {
    throw new Error(`Value: ${arr} can only be an array`);
  }

  return arr.map(item => {
    return isObject(item)
      ? deepCopy(item as object)
      : Array.isArray(item)
        ? deepCopyArray(item)
        : item;
  }) as T;
}

export function deepCopyWithGuard<T = any>(value: T): T {
  switch (true) {
    case Array.isArray(value): {
      return deepCopyArray(value);
    }
    case isObject(value): {
      return deepCopy(value);
    }
    default: {
      return value;
    }
  }
}
