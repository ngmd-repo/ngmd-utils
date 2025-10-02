---
keyword: WithSsrCookiesPage
---

Импортируется из `@ngmd/utils/ssr`

---

## Описание

Обеспечивает работу `CookiesService` сервиса в режиме SSR.

**Интерфейс**

```ts
function withSsrCookies(): CookiesSsrManagerFeature;
```

**Использование**

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
> Для работы `withSsrCookies` необходимо внедрить функцию-провайдер `provideUtilsSsr`


## Types

### CookiesSsrManagerFeature

Тип, возвращаемый feature-функцией `withSsrCookies`.