import { isDevMode } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';

import { ICookieManager, ICookieOptions } from '../interfaces/cookies.interfaces';
import { TSameSite } from '../types/cookie.types';

export class CookiesDisabledManager implements ICookieManager {
  public has(name: string): boolean {
    this.log();

    return false;
  }

  public get(name: string): string {
    this.log();

    return '';
  }

  public getAll(): ISimple<string> {
    this.log();

    return {};
  }

  public set(name: string, value: string, options: Partial<ICookieOptions>): void {
    this.log();
  }

  public delete(
    name: string,
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {
    this.log();
  }

  public deleteAll(
    sameSite: TSameSite,
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {
    this.log();
  }

  private log(): void {
    if (isDevMode()) {
      console.warn('The cookies are disabled');
    }
  }
}
