---
keyword: LoggerPage
---

Импортируется из `@ngmd/utils/ssr`

---

## Описание

Предоставляет провайдер для логирования ошибок на стороне сервера в приложениях, использующих `@angular/ssr`.

## provideSsrLogger

Функция-провайдер для работы с логированием. Переопределяет дефолтное поведение по обработке ошибок в серверной среде. По-умолчанию выводит ошибку stdout в консоли.

**Интерфейс**

```ts 
function provideSsrLogger(...features: SsrLoggerFeatures[]): EnvironmentProviders;
```

**Использование**

```ts name="app.config.ts" {1,5}
import { provideSsrLogger } from '@ngmd/utils/ssr';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideSsrLogger(),
    // ...
  ]
}
```

## Features

### withSsrLoggerErrorHandler

Позволяет переопределить функцию для вывода ошибок, используя свой формат вывода.

**Интерфейс**

```ts
function withSsrLoggerErrorHandler<const T extends 'default' | 'factory'>(
  handler: T extends 'default' ? SsrLoggerErrorHandler : () => SsrLoggerErrorHandler,
  type: T = 'default' as T
): SsrLoggerErrorHandlerFeature;
```

**Использование**

В рамках обычной функции-обработчика:

```ts name="app.config.ts" {1,7}
import { provideSsrLogger, withSsrLoggerErrorHandler } from '@ngmd/utils/ssr';

const ERROR_HANDLER: SsrLoggerErrorHandler = (e: any) => console.log('My Custom error handler', e);

export const AppConfig: ApplicationConfig = {
  providers: [
    provideSsrLogger(withSsrLoggerErrorHandler()),
    // ...
  ]
}
```

В рамках функции-фабрики:

```ts name="app.config.ts" {1,10}
import { provideSsrLogger, withSsrLoggerErrorHandler } from '@ngmd/utils/ssr';

function FACTORY_ERROR_HANDLER(): SsrLoggerErrorHandler {
  /* here you can use Injection context */
  return (e: any) => console.log('My Custom factory error handler', e);
}

export const AppConfig: ApplicationConfig = {
  providers: [
    provideSsrLogger(withSsrLoggerErrorHandler(FACTORY_ERROR_HANDLER, 'factory')),
    // ...
  ]
}
```




## Types

### SsrLoggerFeatures

Union-тип для feature-функций, которые используются в рамках параметра `features` функции-провайдера `provideSsrLogger`

**Интерфейс**
```ts
type SsrLoggerFeatures = SsrLoggerErrorHandlerFeature;
```

**Описание**
| Тип | Функция |
|-------|-------|
| `SsrLoggerErrorHandlerFeature` | `withSsrLoggerErrorHandler` |

### SsrLoggerErrorHandler

Функция-обработчик для вывода информации об ошибке.

**Интерфейс**

```ts
type SsrLoggerErrorHandler = (error: unknown) => void;
```