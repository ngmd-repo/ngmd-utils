---
keyword: InitializerIntroductionPage
---

Imported from `@ngmd/utils/initializer`

---

This module automates the process of loading a configuration file before the application starts.

## Providers

### provideUtilsInitializer

Provider function that loads the configuration file via `provideAppInitializer` before the application starts.

**Interface**

```ts
function provideUtilsInitializer(
  meta: InitializeMeta,
  strategyFeature: StrategyInitializerFeatures,
  ...features: UtilsInitializerFeatures[]
): EnvironmentProviders
```

**Parameters**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **meta** | `InitializeMeta` | `true` | Object with meta information for the configuration file request |
| **strategyFeature** | `StrategyInitializerFeatures` | `true` | Configuration loading strategy |
| **spread features** | `UtilsInitializerFeatures[]` | `false` | [*feature functions*](/initializer#features) that extend behavior |

**Usage**

```ts name="src/app/app.config.ts" {7-8}
import { provideHttpClient } from '@angular/common/http';
import { provideUtilsInitializer } from '@ngmd/utils/initializer';
import { environment } from '@env/environment';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideUtilsInitializer(environment, withEnvironment(environment)),
  ],
};
```

> **WARNING**
> When using this provider, you must also provide `provideHttpClient`

## Strategies

There are 2 strategies for loading the configuration file:

  - `withInitializeState`
  - `withEnvironment`

### StrategyInitializerFeatures

Union type for loading strategies:

```ts
export type StrategyInitializerFeatures = InitializeEnvironmentFeature | InitializeStateFeature;
```

> **NOTE**
> The preferred loading strategy is `withInitializeState`

> **WARNING**
> Currently, you can use both loading strategies simultaneously for backward compatibility. This may be removed in the future, so try to use only one.

## Features

Main list of **feature functions**:

  - `withInitializeState`
  - `withEnvironment`
  - `withInitializeHandler`

### UtilsInitializerFeatures

Union type for *feature functions* of the `provideUtilsInitializer` provider

```ts
type UtilsInitializerFeatures = StrategyInitializerFeatures | InitializeHandlerFeature;
```

Note that `StrategyInitializerFeatures` are also listed if you want to use both strategies at once.

## Interfaces

### InitializeMeta

Object that stores the path for loading the configuration file

**Interface**

```ts
interface InitializeMeta {
  CONFIG_ROOT: string;
}
```

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **CONFIG_ROOT** | `string` | `true` | Path to the configuration file |

## Usage

### Before Angular 18

For describing the configuration file loading process in this block, we use the `withEnvironment` strategy, since most projects use it. However, the preferred loading strategy now is `withInitializeState`. Its usage is also described in the section [From Angular 18 and above](/initializer/introduction#from-angular-18-and-above).

#### Configuration file

In projects, when deploying to `test` or `live` environments, you often need configuration files with certain data that should differ depending on the environment. We store these in a `data.json` file located at *src/assets/config/* from the Angular project root.

```json name="src/assets/config/data.json"
{
  "API_HOST": "https://example.host/api",
  "WS_HOST": "ws://example.host.websocket"
}
```

When deploying to different environments (**live**, **test**, **dev**, etc.), the contents of **data.json** may be updated and have its own set of values for each environment.

#### Environment file

In Angular projects, it's canonical to create an *environments* directory at *src/environments* from the project root. This directory often contains 2 environment files for **dev** and **prod** modes: *environment.ts* and *environment.prod.ts*. The *environment.prod.ts* file is optional but can be used to replace *environment.ts* during production builds using [`fileReplacements`](https://angular.dev/tools/cli/environments#using-environment-specific-variables-in-your-app).

For `provideUtilsInitializer`, it's recommended to create a subdirectory *interfaces* in *src/environments* with a file describing the environment variables interface, which will be present in *environment.ts* at runtime. This interface should extend `InitializeMeta`, which contains the required **CONFIG_ROOT** field for the path to **data.json**. This is needed for `provideUtilsInitializer`.

The final `environments` directory may look like this:

**Environment variables interface**

```ts name="src/environments/interfaces/environment.interface.ts"
import { InitializeMeta } from '@ngmd/utils/initializer';

export interface IEnvironment extends InitializeMeta {
  API_HOST?: string;
  WS_HOST?: string;
}
```

**File *environment.ts*** 
```ts name="src/environments/environment.ts"
import { IEnvironment } from './interfaces/environment.interface';

export const environment: IEnvironment = {
  CONFIG_ROOT: '/assets/config/data.json',
};
```
**File *environment.prod.ts*** 
```ts name="src/environments/environment.prod.ts"
import { IEnvironment } from './interfaces/environment.interface';

export const environment: IEnvironment = {
  CONFIG_ROOT: 'static/assets/config/data.json',
};
```

Note that `API_HOST` and `WS_HOST` are optional and are fields from `data.json`. They will be added to the `environment` object in *environment.ts* by the provider, but you don't need to declare them initially. This is for convenience, as the list of fields may be large, and only required fields need default values. If the list is small or you prefer stricter typing, you can make the fields required.

Next, just inject the `provideUtilsInitializer` dependency in your application's root config with the `withEnvironment` strategy:

```ts name="src/app/app.config.ts" {6}
import { provideUtilsInitializer, withEnvironment } from '@ngmd/utils/initializer';
import { environment } from '../environments/environment';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInitializer(environment, withEnvironment(environment)),
  ]
}
```

When the application starts, the provider will request **data.json** at the path in **CONFIG_ROOT** and merge (mutate *environment*) the two objects. After that, you can use environment variables directly from the *environment* object in *environment.ts*.

> **NOTE**
> You can organize **data.json** storage any way you like. The main thing is that the file is present in your project's **build** directory when deploying to *test* or *live* environments, and **environment** files contain correct paths in **CONFIG_ROOT**.

**Example usage**

```ts
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { WebsocketService } from './services/websocket.service';

@Component({...})
export class ExampleComponent implements OnInit {
  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.initWithURL(environment.WS_HOST);
  }
}
```

#### angular.json

Changes in *angular.json* should include the *assets* directory in the **build** for **production** mode and replace environment files.

```json name="angular.json"
{
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
      "assets": [
        {
          "glob": "**/*",
          "input": "src/assets/",
          "ignore": [], // In our CI, you may need to exclude data.json. Just add: "**/config/data.json"
          "output": "/static/assets"
        },
      ],
    }
  }
}
```

### From Angular 18 and above

Injecting the provider in *Angular 18* and above assumes the default *public* directory for static files.

The modern approach for loading the configuration file uses the `withInitializeState` strategy.

#### Configuration file

Create **data.json** in the *public/config* directory:

```json name="public/config/data.json"
{
  "API_HOST": "https://example.host/api",
  "WS_HOST": "ws://example.host.websocket"
}
```

Next, create **config.interface.ts** in *src/environments/interfaces*, describing the config file interface:

```ts name="src/environments/interfaces/config.interface.ts"
export interface IConfig {
  API_HOST: string;
  WS_HOST: string;
}
```

Here, you do not need to make fields optional. Strictly describe the expected object type.

#### Environment file

Add the `CONFIG_ROOT` field to environment files.

Note: object typing is omitted, as the presence of the field will be automatically checked when passing the object to the provider. If missing, a compilation error will be shown. You can add typing as described above if needed.

**File *environment.ts*** 

Create **environment.ts** in *src/environments*:

```ts name="src/environments/environment.ts"
export const environment = {
  CONFIG_ROOT: '/config/data.json',
};
```

**File *environment.prod.ts*** 

Create **environment.prod.ts** in *src/environments*:

```ts name="src/environments/environment.prod.ts"
export const environment = {
  CONFIG_ROOT: '/static/config/data.json',
};
```

#### index.ts

Create **index.ts** to export all public entities from *src/environments*:

```ts name="src/environments/index.ts"
export * from './environment';
export * from './interfaces/config.interface';
```

#### tsconfig.json

Add *alias* paths for the environment directory:

```json name="tsconfig.json"
  {
    "paths": {
      "@env": ["src/environments/index.ts"],
    }
  }
```

#### angular.json

Replace the environment file and include the directory with `data.json` in the **build** for `production` mode:

```json name="angular.json"
  {
    "configurations": {
      "production": {
          "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.prod.ts"
          }
        ],
        "assets": [
          {
            "glob": "**/*",
            "input": "public/",
            "ignore": [], // In our CI, you may need to exclude data.json. Just add: "**/config/data.json",
            "output": "/static"
          }
        ],
      }
    }
  }
```

#### app.config.ts

Inject the provider with the strategy:

```ts name="app.config.ts" {6}
import { provideUtilsInitializer, withInitializeState, InitializeState } from '@ngmd/utils/initializer';
import { environment, IConfig } from '@env';
import { provideUtilsInterceptor, withDefaultConfig } from '@ngmd/utils/interceptor';

const providers: (EnvironmentProviders | Provider)[] = [
  provideUtilsInitializer(environment, withInitializeState()), // Injection
  // You can use it here as well
  provideUtilsInterceptor(
    withDefaultConfig(() => {
      const initializeState: InitializeState<IConfig> = inject(InitializeState);
      const { API_HOST }: IConfig = initializeState.config();

      return { API_HOST, API_TAG: '@' };
    }),
  ),
];
```

After the configuration file is loaded, it becomes available throughout the application. Access it via `InitializeState`.

#### Build

Your project's **build** directory should have the following structure:

![build-directory](assets/images/initializer/build-directory.png)