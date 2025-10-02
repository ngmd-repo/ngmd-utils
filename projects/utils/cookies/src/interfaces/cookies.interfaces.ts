import { ISimple } from '@ngmd/utils/interfaces';

import { TSameSite } from '../types/cookie.types';

export interface ICookieOptions {
  expires: Date | number;
  path: string;
  domain: string;
  secure: boolean;
  sameSite: TSameSite;
  partitioned: boolean;
}

export interface ICookieManager {
  has(name: string): boolean;
  get(name: string): string;
  getAll(): ISimple<string>;
  set(name: string, value: string, options: Partial<ICookieOptions>): void;
  delete(
    name: string,
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;
  deleteAll(
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;
}
