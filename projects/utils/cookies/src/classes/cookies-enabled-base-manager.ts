import { ISimple } from '@ngmd/utils/interfaces';

import { ICookieManager, ICookieOptions } from '../interfaces/cookies.interfaces';
import { TSameSite } from '../types/cookie.types';

export abstract class CookiesEnabledBaseManager implements ICookieManager {
  public has(name: string): boolean {
    name = encodeURIComponent(name);

    const regExp: RegExp = this.getCookieRegExp(name);
    const cookies: string = this.getNativeCookies();

    return regExp.test(cookies);
  }

  public get(name: string): string {
    if (this.has(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = this.getCookieRegExp(name);
      const cookies: string = this.getNativeCookies();
      const result: RegExpExecArray = regExp.exec(cookies);

      return result[1] ? decodeURIComponent(result[1]) : '';
    } else {
      return '';
    }
  }

  public getAll(): ISimple<string> {
    const cookies: string = this.getNativeCookies();
    let decodedCookies: ISimple<string> = {};

    if (Boolean(cookies)) {
      decodedCookies = cookies
        .split(';')
        .reduce((accumulator: ISimple<string>, cookieItem: string): ISimple<string> => {
          const [cookieName, cookieValue]: string[] = cookieItem.split('=');
          const name: string = decodeURIComponent(cookieName.trim());
          const value: string = decodeURIComponent(cookieValue);

          accumulator[name] = value;

          return accumulator;
        }, {});
    }

    return decodedCookies;
  }

  public abstract set(name: string, value: string, options: Partial<ICookieOptions>): void;

  public abstract delete(
    name: string,
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;

  public abstract deleteAll(
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;

  protected abstract getNativeCookies(): string;

  protected getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]{}()|=;+?,.*^$])/gi, '\\$1');

    return new RegExp(`(?:^${escapedName}|;\\s*${escapedName})=(.*?)(?:;|$)`, 'g');
  }
}
