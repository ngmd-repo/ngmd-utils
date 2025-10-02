---
keyword: CookiesPage
---

Imported from `@ngmd/utils/cookies`

---

## Description

This module provides the ability to work with document `cookies` via a dedicated service. The implementation also supports working with `cookies` in `ssr` applications, helping to avoid errors in different runtime environments.

## Providers

### provideUtilsCookies

Provider function for working with **cookies**

**Interface**

```ts
function provideUtilsCookies(...features: CookiesFeatures[]): Provider[]
```

**Parameters**

| Name | Type | Default value | Description |
|----------|----------|----------| ----------|
| **features** | `CookiesFeatures` | `null` | A set of **feature** functions that extend the functionality of `CookiesService` |

## CookiesService

Service for working with **cookies**. It provides a convenient interface for handling cookies both in the browser and on SSR. It abstracts the differences between client and SSR environments, allowing you to work with cookies in a unified way regardless of the execution context (in SSR only `has`, `get`, and `getAll` are available, other actions are stubbed). If cookies are disabled in the browser, the service switches to stub mode, where all operations result in logging to the console.

**Interface**

```ts
class CookiesService {
  public has(name: string): boolean;
  public get(name: string): string;
  public getAll(): ISimple<string>;
  public set(name: string, value: string, options: Partial<ICookieOptions> = {}): void;
  public delete(
    name: string,
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;
  public deleteAll(
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;
}
```

To describe how the `CookiesService` methods work, register the provider in the root of the application:

```ts name="app.config.ts" {5}
import { provideUtilsCookies } from '@ngmd/utils/cookies';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsCookies(),
    // ...
  ],
};
```

Inject the service into a component:

```ts name="cookies.components.ts"
@Component({/**/})
export class CookiesComponent {
  private cookiesService: CookiesService = inject(CookiesService);
}
```

**Methods**

### has

Checks if a cookie exists.

**Interface**

```ts
has(name: string): boolean;
```

**Usage**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    const hasCookie: boolean = this.cookiesService.has('testCookie');

    console.log('Has testCookie:', hasCookie);
  }
}
```

### get

Get a cookie.

**Interface**

```ts
get(name: string): string;
```

**Usage**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    const cookieValue: string = this.cookiesService.get('testCookie');

    console.log('Test Cookie:', cookieValue);
  }
}
```

### getAll

Get all cookies.

**Interface**

```ts
getAll(): ISimple<string>;
```

**Usage**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    const cookies: ISimple<string> = this.cookiesService.getAll();

    console.log('All cookies:', cookies);
  }
}
```

### set

Set a cookie.

**Interface**

```ts
set(name: string, value: string, options: Partial<ICookieOptions> = {}): void;
```

**Usage**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    this.cookiesService.set('testCookie', 'testValue', { expires: 7 });
  }
}
```

### delete

Delete a cookie.

**Interface**

```ts
delete(
  name: string,
  sameSite: TSameSite = 'Lax',
  path?: ICookieOptions['path'],
  domain?: ICookieOptions['domain'],
  secure?: ICookieOptions['secure'],
): void;
```

**Usage**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    this.cookiesService.delete('testCookie');
  }
}
```

### deleteAll

Delete all cookies.

**Interface**

```ts
deleteAll(
  sameSite: TSameSite = 'Lax',
  path?: ICookieOptions['path'],
  domain?: ICookieOptions['domain'],
  secure?: ICookieOptions['secure'],
): void;
```

**Usage**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    this.cookiesService.deleteAll();
  }
}
```

## Types

### ICookieOptions

Interface for working with `CookiesService` methods.

Field purposes are described in [this article](https://learn.javascript.ru/cookie)

**Interface**

```ts
interface ICookieOptions {
  expires: Date | number;
  path: string;
  domain: string;
  secure: boolean;
  sameSite: TSameSite;
  partitioned: boolean;
}
```

### TSameSite

Type describing possible values for the `samesite` cookie key.

**Interface**

```ts
type TSameSite = 'Lax' | 'None' | 'Strict';
```

### CookiesFeatures

Union type for feature functions used in the `features` parameter of the `provideUtilsCookies` provider function.

**Interface**

```ts
type CookiesFeatures = CookiesSsrManagerFeature;
```

