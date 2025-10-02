---
keyword: WithEnvironmentPage
---

Импортируется из `@ngmd/utils/initializer`

---

## Описание

*Feature-функция*, определяющая стратегию загрузки конфигурационного файла в объект *environments* 

**Интерфейс**

```ts
function withEnvironment<T extends object>(environment: T): InitializeEnvironmentFeature<T>
```

**Использование**


Подробный гайд по внедрению описан [здесь](/initializer/introduction#%D0%B4%D0%BE-angular-18)

```ts name="src/app/app.config.ts"
import {
  provideUtilsInitializer,
  withEnvironment,
} from '@ngmd/utils/initializer';
import { provideUtilsInterceptor, withTagsUrlsMap } from '@ngmd/utils/interceptor';
import { environment } from '@env';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInitializer(environment, withEnvironment(environment)),
    provideUtilsInterceptor(
      withTagsUrlsMap(() => {
        return { '@': environment.API_HOST, '@ws': environment.WS_HOST }
      }),
    ),
  ],
};
```

