---
keyword: InterceptorIntroductionPage
---

Imported from `@ngmd/utils/interceptor`

---

## Description

This module allows you to modify the `HttpRequest` request object using an interceptor before sending it to the server. It helps automate typical actions such as: adding headers, replacing *host* addresses, etc.

## Providers

### provideUtilsInterceptor

The main provider function of this module that accepts a set of [*feature functions*](/interceptor#features) of type `` to extend the behavior of requests to **api**

**Interface**

```ts
function provideUtilsInterceptor(
  ...features: UtilsInterceptorFeatures[]
): EnvironmentProviders
```

**Parameters**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **spread features** | `UtilsInterceptorFeatures[]` | `false` | [*feature functions*](/interceptor#features) that extend behavior |

**Usage**

```ts name="src/app/app.config.ts" {6-7}
    import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
    import { provideUtilsInterceptor } from '@ngmd/utils/interceptor';

    export const AppConfig: ApplicationConfig = {
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideUtilsInterceptor(/*UtilsInterceptorFeatures[]*/),
      ],
    };
```

> **WARNING**
> When using this provider, you need to inject `provideHttpClient` with the `withInterceptorsFromDi` function parameter:


## Features

Main list of **feature functions**:

  - `withDefaultConfig`
  - `withTagsUrlsMap`
  - `withTagsUrlsHandler`
  - `withHeaders`
  - `withHeadersHandler`

## Types

### UtilsInterceptorFeatures

Union type of *feature functions* for the `provideUtilsInterceptor` provider

```ts
type UtilsInterceptorFeatures =
  | DefaultConfigFeature
  | HeadersFeature
  | HeadersHandlerFeature
  | TagsUrlsHandlerFeature
  | TagsUrlsMapFeature;
```
