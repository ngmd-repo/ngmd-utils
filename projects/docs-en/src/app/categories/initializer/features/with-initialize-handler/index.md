---
keyword: WithInitializeHandlerPage
---

Imported from `@ngmd/utils/initializer`

---

## Description

*Feature function* with a `handler` parameter of type `InitializeHandler`, which will be called with the **environment.ts** object at the moment when it already includes fields from the **data.json** config file, but before the application loads. This allows you to initialize necessary services in factory mode for working with the received data.

**Interface**

```ts
function withInitializeHandler<T extends InitializeConfig>(
  handler: () => InitializeHandler<T>,
): InitializeHandlerFeature
```

**Usage**

Example of starting *websocket* connection initialization before the application loads

```ts name="src/app/app.config.ts"
import { inject } from '@angular/core';
import {
  provideUtilsInitializer,
  withInitializeState,
  withInitializeHandler,
  InitializeHandler
} from '@ngmd/utils/initializer';
import { environment } from '@env/environment';
import { IEnvironment } from '@env/interfaces/environment.interface';
import { WebSocketService } from 'path-to-websocket-service';

function initializerFactory(): InitializeHandler<IEnvironment> {
  const websocketService = inject(WebSocketService);

  return (env: IEnvironment) => {
    websocketService.init(env.WS_HOST)
  };
}

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInitializer(environment, withInitializeState(), withInitializeHandler(initializerFactory))
  ],
};
```

## Types

### InitializeHandler

Handler function executed before the application loads within `withInitializeHandler`

```ts
type InitializeHandler<T extends InitializeConfig = InitializeConfig> = (env: T) => void;
```