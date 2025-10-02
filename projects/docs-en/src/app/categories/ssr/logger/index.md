---
keyword: LoggerPage
---

Imported from `@ngmd/utils/ssr`

---

## Description

Provides a provider for logging errors on the server side in applications using `@angular/ssr`.

## provideSsrLogger

Provider function for working with logging. Overrides the default behavior for error handling in the server environment. By default, outputs error to stdout in the console.

**Interface**

```ts 
function provideSsrLogger(...features: SsrLoggerFeatures[]): EnvironmentProviders;
```

**Usage**

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

Allows you to override the function for outputting errors using your own output format.

**Interface**

```ts
function withSsrLoggerErrorHandler<const T extends 'default' | 'factory'>(
  handler: T extends 'default' ? SsrLoggerErrorHandler : () => SsrLoggerErrorHandler,
  type: T = 'default' as T
): SsrLoggerErrorHandlerFeature;
```

**Usage**

Within a regular handler function:

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

Within a factory function:

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

Union type for feature functions that are used within the `features` parameter of the `provideSsrLogger` provider function

**Interface**
```ts
type SsrLoggerFeatures = SsrLoggerErrorHandlerFeature;
```

**Description**
| Type | Function |
|-------|-------|
| `SsrLoggerErrorHandlerFeature` | `withSsrLoggerErrorHandler` |

### SsrLoggerErrorHandler

Handler function for outputting error information.

**Interface**

```ts
type SsrLoggerErrorHandler = (error: unknown) => void;
```