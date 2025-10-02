---
keyword: WithEnvironmentPage
---

Imported from `@ngmd/utils/initializer`

---

## Description

*Feature function* that defines the strategy for loading a configuration file into the *environments* object.

**Interface**

```ts
function withEnvironment<T extends object>(environment: T): InitializeEnvironmentFeature<T>
```

**Usage**

A detailed guide for integration is described [here](/initializer/introduction#before-angular-18)

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

