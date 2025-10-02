import { ISimple } from '@ngmd/utils/interfaces';

import { ICookieManager, ICookieOptions } from '../interfaces/cookies.interfaces';
import { TSameSite } from '../types/cookie.types';
import { CookiesBuilder } from './cookies-builder';
import { CookiesEnabledBaseManager } from './cookies-enabled-base-manager';

export class CookiesEnabledBrowserManager
  extends CookiesEnabledBaseManager
  implements ICookieManager
{
  constructor(private document: Document) {
    super();
  }

  public set(name: string, value: string, options: Partial<ICookieOptions> = {}): void {
    this.document.cookie = new CookiesBuilder(name, value)
      .setExpires(options.expires)
      .setPath(options.path)
      .setDomain(options.domain)
      .setForceSecure(name, options)
      .setSecure(options.secure)
      .setSameSite(options.sameSite)
      .setPartitioned(options.partitioned)
      .build();
  }

  public delete(
    name: string,
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {
    const expires: Date = new Date(0);

    this.set(name, '', { expires, sameSite, path, domain, secure });
  }

  public deleteAll(
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {
    const cookies: ISimple<string> = this.getAll();

    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.delete(cookieName, sameSite, path, domain, secure);
      }
    }
  }

  protected getNativeCookies(): string {
    return this.document.cookie;
  }
}
