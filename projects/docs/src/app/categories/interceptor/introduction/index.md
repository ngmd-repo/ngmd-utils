---
keyword: InterceptorIntroductionPage
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

Данный модуль позволяет модифицировать объект запроса `HttpRequest` при помощи интерцептора, перед моментом отправки на сервер. Помогает автоматизировать такие типичные действия, как: добавление заголовков, подмену *host* адресов и т.д.

## Providers

### provideUtilsInterceptor

Основная провайдер-функция данного модуля, которая принимает набор [*feature-функций*](/interceptor#features) типа `` для расширения поведения запросов к **api**

**Интерфейс**

```ts
function provideUtilsInterceptor(
  ...features: UtilsInterceptorFeatures[]
): EnvironmentProviders
```

**Параметры**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **spread features** | `UtilsInterceptorFeatures[]` | `false` | [*feature-функций*](/interceptor#features), расширяющие поведение |

**Использование**

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
> При использовании данного провайдера необходимо внедрить `provideHttpClient` c функцией-параметром `withInterceptorsFromDi`:


## Features

Основной список **feature-функций**:

  - `withDefaultConfig`
  - `withTagsUrlsMap`
  - `withTagsUrlsHandler`
  - `withHeaders`
  - `withHeadersHandler`

## Types

### UtilsInterceptorFeatures

Union-тип *feature-функций* для провайдера `provideUtilsInterceptor`

```ts
type UtilsInterceptorFeatures =
  | DefaultConfigFeature
  | HeadersFeature
  | HeadersHandlerFeature
  | TagsUrlsHandlerFeature
  | TagsUrlsMapFeature;
```
