---
keyword: WithInitializeStatePage
---

Imported from `@ngmd/utils/initializer`

---

## Description

*Feature function* that defines the strategy for loading a configuration file into the *InitializeState* object.

**Interface**

```ts
function withInitializeState(): InitializeStateFeature
```

**Usage**

A detailed integration guide is described [here](/initializer/introduction#from-angular-18-and-above)

```ts name="src/app/app.config.ts"
import {
  provideUtilsInitializer,
  withInitializeState,
  InitializeState
} from '@ngmd/utils/initializer';
import { provideUtilsInterceptor, withTagsUrlsMap } from '@ngmd/utils/interceptor';
import { environment, IConfig } from '@env';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInitializer(environment, withInitializeState()),
    provideUtilsInterceptor(
      withTagsUrlsMap(() => {
        const initializeState: InitializeState<IConfig> = inject(InitializeState);
        const { API_HOST, WS_HOST }: IConfig = initializeState.config();

        return { '@': API_HOST, '@ws': WS_HOST };
      }),
    ),
  ],
};
```

## InitializeState

Class that stores the configuration file and loading status fields:

**Interface**

```ts
class InitializeState<T extends object> {
  public config: WritableSignal<T>;
  public loaded: Signal<boolean>;
  public whenLoaded$: Observable<boolean>;
}
```

**Description**

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **config** | `T extends object` | `null` | Configuration file object |
| **loaded** | `Signal<boolean>` | `false` | Configuration file loading status |
| **whenLoaded$** | `Signal<boolean>` | `false` | Emits `true` when the configuration file is loaded (when subscribed). |
