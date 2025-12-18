---
keyword: WithInitializeStatePage
---

Imported from `@ngmd/utils/initializer`

---


## Description

*Feature function* that defines the strategy for loading a configuration file into the *InitializeState* object 

**Interface**

```ts
function withInitializeState(opts?: InitializeStateOptions | (() => InitializeStateOptions)): InitializeStateFeature
```

**Parameters**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **opts** | `InitializeStateOptions \| (() => InitializeStateOptions)` | `false` | Options object that extends provider behavior |

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
| **whenLoaded$** | `Observable<boolean>` | `false` | Emits `true` value when subscribed after the configuration file is loaded |


## Types

### InitializeStateOptions

**Description**

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **tags** | `TagsMap` | `null` | Object with tag fields that will be used to replace dynamic values in string properties of the configuration |


## Use Cases

### InitializeStateOptions.tags

Original configuration object with **domain** tag:


```json name="data.json"
{
  "API_HOST": "{%raw%}https://api.{{domain}}/v2/api{%endraw%}",
  "WS_HOST": "{%raw%}wss://api.{{domain}}{%endraw%}",
  "CDN_HOST": "{%raw%}https://static.{{domain}}{%endraw%}"
}
```

Provide an object with the value for the **domain** tag in the provider function:

```ts name="app.config.ts" {11-14}
import {
  provideUtilsInitializer,
  withInitializeState,
} from '@ngmd/utils/initializer';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInitializer(
      environment,
      withInitializeState({
        tags: {
          // https://example.com?domain=qa4
          domain: new URL(location.href).searchParams.get('domain'),
        },
      }),
    ),
  ]
}
```

Configuration object after **domain** tag replacement:

```ts
{
  "API_HOST": "https://api.qa4/v2/api",
  "WS_HOST": "wss://api.qa4",
  "CDN_HOST": "https://static.qa4"
}
```

> **NOTE**
> Access to the configuration object can be obtained through the `config` property of the `InitializeState` service
