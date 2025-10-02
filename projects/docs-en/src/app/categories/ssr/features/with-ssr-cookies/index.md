---
keyword: WithSsrCookiesPage
---

Imported from `@ngmd/utils/ssr`

---

## Description

Ensures `CookiesService` service works in SSR mode.

**Interface**

```ts
function withSsrCookies(): CookiesSsrManagerFeature;
```

**Usage**

```ts name="app.config.ts" {7}
import { provideUtilsCookies } from '@ngmd/utils/cookies';
import { withSsrCookies } from '@ngmd/utils/ssr';

export const AppConfig: ApplicationConfig = {
  providers: [
    // ...
    provideUtilsCookies(withSsrCookies()),
  ],
};
```

> **WARNING**
> For `withSsrCookies` to work, you need to inject the `provideUtilsSsr` provider function


## Types

### CookiesSsrManagerFeature

Type returned by the `withSsrCookies` feature function.