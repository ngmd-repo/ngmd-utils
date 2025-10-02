---
keyword: WithInitializeHandlerPage
---

Импортируется из `@ngmd/utils/initializer`

---

## Описание

*Feature-функция* c параметром `handler` типа `InitializeHandler`, который будет вызван с объектом окружения **environment.ts** в тот момент, когда он уже будет включать в себя поля из конфигурационного файла **data.json**, но до момента загрузки приложения, чтобы в режиме фабрики можно было инициализировать необходимые сервисы для работы приложения с поступившими данными

**Интерфейс**

```ts
function withInitializeHandler<T extends InitializeConfig>(
  handler: () => InitializeHandler<T>,
): InitializeHandlerFeature
```

**Использование**

Пример старта инициализации *websocket* подключения до загрузки приложения

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

Функция-обработчик, выполняемая перед загрузкой приложения в рамках `withInitializeHandler`

```ts
type InitializeHandler<T extends InitializeConfig = InitializeConfig> = (env: T) => void;
```