import { InjectionToken } from '@angular/core';
import { TUseCombineProvider } from '@ngmd/utils/types';

export type TProvideKey = 'useFactory' | 'useValue';
export type TUseProvideType = 'default' | 'factory';
export type TUseParam<T> = T | ((...params: never) => T);

export function isFactory<T>(param: TUseParam<T>): param is () => T {
  return typeof param === 'function';
}

export function getProvideKey<T>(param: TUseParam<T>): TProvideKey {
  return isFactory(param) ? 'useFactory' : 'useValue';
}

export function getProvideKeyByType(type: TUseProvideType): TProvideKey {
  return type === 'factory' ? 'useFactory' : 'useValue';
}

export function makeCombineProvider<T>(
  param: TUseParam<T>,
  token: InjectionToken<T>,
): TUseCombineProvider<T> {
  const useKey: TProvideKey = getProvideKey(param);
  const provider = {
    provide: token,
    [useKey]: param,
  };

  return provider as TUseCombineProvider<T>;
}
