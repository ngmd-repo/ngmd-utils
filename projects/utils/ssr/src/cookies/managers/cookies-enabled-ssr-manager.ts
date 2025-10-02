import {
  CookiesEnabledBaseManager,
  ICookieManager,
  ICookieOptions,
  TSameSite,
} from '@ngmd/utils/cookies';
import { Request } from 'express';

export class CookiesEnabledSsrManager extends CookiesEnabledBaseManager implements ICookieManager {
  constructor(private request: Request) {
    super();
  }

  public set(name: string, value: string, options: Partial<ICookieOptions>): void {}

  public delete(
    name: string,
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {}

  public deleteAll(
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {}

  protected getNativeCookies(): string {
    return this.request?.headers.cookie;
  }
}
