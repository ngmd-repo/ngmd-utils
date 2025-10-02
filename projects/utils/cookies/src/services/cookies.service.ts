import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ISimple } from '@ngmd/utils/interfaces';
import { PlatformService } from '@ngmd/utils/services';

import { CookiesDisabledManager } from '../classes/cookies-disabled-manager';
import { CookiesEnabledBrowserManager } from '../classes/cookies-enabled-browser-manager';
import { ICookieManager, ICookieOptions } from '../interfaces/cookies.interfaces';
import { COOKIES_SSR_MANAGER } from '../tokens/cookies.tokens';
import { TSameSite } from '../types/cookie.types';

@Injectable({
  providedIn: 'root',
})
export class CookiesService implements ICookieManager {
  private cookiesManager: ICookieManager = null;

  constructor(
    private platformService: PlatformService,

    @Optional() @Inject(COOKIES_SSR_MANAGER) private ssrManager: ICookieManager,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.init();
  }

  private init(): void {
    const isBrowserFlow: boolean =
      this.platformService.isBrowser() && this.document.defaultView.navigator.cookieEnabled;

    const isSsrFlow: boolean = this.platformService.isServer();

    switch (true) {
      case isBrowserFlow: {
        this.cookiesManager = new CookiesEnabledBrowserManager(this.document);
        break;
      }

      case isSsrFlow: {
        if (!this.ssrManager)
          throw new Error(
            'SSR Cookies Manager is not provided. Use provideUtilsCookies(withSsrCookies())',
          );

        this.cookiesManager = this.ssrManager;
        break;
      }

      default:
        this.cookiesManager = new CookiesDisabledManager();
    }
  }

  public has(name: string): boolean {
    return this.cookiesManager.has(name);
  }

  public get(name: string): string {
    return this.cookiesManager.get(name);
  }

  public getAll(): ISimple<string> {
    return this.cookiesManager.getAll();
  }

  public set(name: string, value: string, options: Partial<ICookieOptions> = {}): void {
    this.cookiesManager.set(name, value, options);
  }

  public delete(
    name: string,
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {
    this.cookiesManager.delete(name, sameSite, path, domain, secure);
  }

  public deleteAll(
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void {
    this.cookiesManager.deleteAll(sameSite, path, domain, secure);
  }
}
