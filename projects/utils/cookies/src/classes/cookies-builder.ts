import { ICookieOptions } from '../interfaces/cookies.interfaces';

export class CookiesBuilder {
  private cookiesString: string = null;

  constructor(name: string, value: string) {
    this.cookiesString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;
  }

  public setExpires(value: ICookieOptions['expires']): CookiesBuilder {
    if (value) {
      if (typeof value === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + value * 1000 * 60 * 60 * 24);

        this.cookiesString += `expires=${dateExpires.toUTCString()};`;
      } else {
        this.cookiesString += `expires=${value.toUTCString()};`;
      }
    }

    return this;
  }

  public setPath(value: ICookieOptions['path']): CookiesBuilder {
    if (value) {
      this.cookiesString += `path=${value};`;
    }

    return this;
  }

  public setDomain(value: ICookieOptions['domain']): CookiesBuilder {
    if (value) {
      this.cookiesString += `domain=${value};`;
    }

    return this;
  }

  public setForceSecure(cookieName: string, options: Partial<ICookieOptions>): CookiesBuilder {
    const forceCondition: boolean = options.secure === false && options.sameSite === 'None'; // eslint-disable-line

    if (forceCondition) {
      options.secure = true;

      console.warn(
        `[cookie-service] Cookie ${cookieName} was forced with secure flag because sameSite=None.`,
      );
    }

    return this;
  }

  public setSecure(value: ICookieOptions['secure']): CookiesBuilder {
    if (value) {
      this.cookiesString += 'secure;';
    }

    return this;
  }

  public setSameSite(value: ICookieOptions['sameSite'] = 'Lax'): CookiesBuilder {
    this.cookiesString += `sameSite=${value};`;

    return this;
  }

  public setPartitioned(value: ICookieOptions['partitioned']): CookiesBuilder {
    if (value) {
      this.cookiesString += 'Partitioned;';
    }

    return this;
  }

  public build(): string {
    return this.cookiesString;
  }
}
