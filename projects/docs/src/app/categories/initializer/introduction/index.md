---
keyword: InitializerIntroductionPage
---

Импортируется из `@ngmd/utils/initializer`

---

Данный модуль позволяет автоматизировать процесс загрузки конфигурационного файла перед запуском приложения


## Providers

### provideUtilsInitializer

Провайдер-функция, загружающая конфигурационный файл в рамках `provideAppInitializer` до начала работы приложения.

**Интерфейс**

```ts
function provideUtilsInitializer(
  meta: InitializeMeta,
  strategyFeature: StrategyInitializerFeatures,
  ...features: UtilsInitializerFeatures[]
): EnvironmentProviders
```

**Параметры**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **meta** | `InitializeMeta` | `true` | Объект, с мета информаций для запроса за конфигурационным файлом |
| **strategyFeature** | `StrategyInitializerFeatures` | `true` | Стратегия загрузки конфигурации |
| **spread features** | `UtilsInitializerFeatures[]` | `false` | [*feature-функций*](/initializer#features), расширяющие поведение |

**Использование**

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
> При использовании данного провайдера необходимо внедрить `provideHttpClient`

## Strategies

Всего существует 2 стратегии загрузки конфигурационного файла:

  - `withInitializeState`
  - `withEnvironment`

### StrategyInitializerFeatures

Union-тип для стратегий загрузки:

```ts
export type StrategyInitializerFeatures = InitializeEnvironmentFeature | InitializeStateFeature;
```

> **NOTE**
> Предпочтительным способом загрузки является стратегия `withInitializeState`

> **WARNING**
> На данный момент существует возможность использовать одновременно 2 стратегии загрузки. Это необходимо для обратной совместимости. Вероятно, в будущем такая возможность будет удалена, поэтому старайтесь использовать только одну.

## Features

Основной список **feature-функций**:

  - `withInitializeState`
  - `withEnvironment`
  - `withInitializeHandler`

### UtilsInitializerFeatures

Union-тип *feature-функций* провайдера `provideUtilsInitializer`

```ts
type UtilsInitializerFeatures = StrategyInitializerFeatures | InitializeHandlerFeature;
```

Обратите внимание, что в списке так же указаны `StrategyInitializerFeatures`, если вы хотите использовать 2 стратегии одновременно

## Interfaces

### InitializeMeta

Объект, хранящий путь для загрузки конфигурационного файла

**Интерфейс**

```ts
interface InitializeMeta {
  CONFIG_ROOT: string;
}
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **CONFIG_ROOT** | `string` | `true` | путь до конфигурационного файла |

## Usage

### До Angular 18

Для описания работы загрузки конфигурационного файла в этом блоке мы будем использовать `withEnvironment` стратегию, т.к. большая часть проектов написана с ее применением. Но на данный момент предпочтительным способом загрузки является `withInitializeState` стратегия. Ее использование так же описано в разделе загрузки конфигурационного файла [От Angular 18 и выше](/initializer/introduction#от-angular-18-и-выше)

#### Configuration file

В проектах при развертывании приложения на `test` или `live` стенды часто необходимо использовать конфигурационные файлы с хранением определенных данных, которые должны отличаться в зависимости от стенда, на котором будет отображаться ваше приложение. Местом хранения этих данных у нас выбран файл `data.json`, расположенный по пути *src/assets/config/* от корня директории **angular** проекта. 

```json name="src/assets/config/data.json"
{
  "API_HOST": "https://example.host/api",
  "WS_HOST": "ws://example.host.websocket",
}
```

В момент развертывания приложения на разные стенды (**live**, **test**, **dev** и т.д.) содержимое файла **data.json**  может обновляться и иметь свой набор значений для каждого окружения.

#### Environment file

В проектах **angular** для работы с файлами окружения канонично создавалась директория *environments* по пути *src/environments*  от корня проекта. В рамках директории могут часто находиться 2 файла окружения для **dev** и **prod** режимов с названиями файлов *environment.ts* и *environment.prod.ts* соответственно. Файл *environment.prod.ts*  не является обязательным, но может использоваться для замены содержимого *environment.ts*  при сборке приложения в **production** режиме c помощью [`fileReplacements`](https://angular.dev/tools/cli/environments#using-environment-specific-variables-in-your-app).

В рамках функциональности `provideUtilsInitializer` предлагается в директории *src/environments* создать поддиректорию *interfaces* с файлом, описывающим интерфейс переменных окружения, которые будут содержаться в файле *environment.ts* в момент запуска приложения. Данный интерфейс должен расширять `InitializeMeta`, содержащий обязательное поле **CONFIG_ROOT** для пути к конфигурационному файлу **data.json**. Оно нам понадобится в работе `provideUtilsInitializer`.

В конечном итоге директория `environments` может выглядеть следующим образом:

**Интерфейс переменных окружения**

```ts name="src/environments/interfaces/environment.interface.ts"
import { InitializeMeta } from '@ngmd/utils/initializer';

export interface IEnvironment extends InitializeMeta {
  API_HOST?: string;
  WS_HOST?: string;
}
```

**Файл *environment.ts*** 
```ts name="src/environments/environment.ts"
import { IEnvironment } from './interfaces/environment.interface';

export const environment: IEnvironment = {
  CONFIG_ROOT: '/assets/config/data.json',
};
```
**Файл *environment.prod.ts*** 
```ts name="src/environments/environment.prod.ts"
import { IEnvironment } from './interfaces/environment.interface';

export const environment: IEnvironment = {
  CONFIG_ROOT: 'static/assets/config/data.json',
};
```

Обратите внимание, что поля `API_HOST` и `WS_HOST` добавлены, как опциональные и являются полями из файла `data.json`. Они будут добавлены в объект `environment` файла `environment.ts` в рамках работы провайдера, но при объявлении их можно не указывать. Сделано это для удобства, т.к. список полей может быть большим, а список обязательных необходимо будет объявить с значениями по-умолчанию. Если список полей небольшой или вы предпочитаете более строгую типизацию, мы можете изменить это поведение, сделав поля обязательными.

Далее, все что нам остается сделать, это внедрить зависимость `provideUtilsInitializer` в корневом конфиге нашего приложения со стратегией `withEnvironment`:

```ts name="src/app/app.config.ts" {6}
import { provideUtilsInitializer, withEnvironment } from '@ngmd/utils/initializer';
import { environment } from '../environments/environment';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInitializer(environment, withEnvironment(environment)),
  ]
}
```

В момент запуска приложения функциональность провайдера сделает запрос за файлом **data.json** по указанному пути в поле **CONFIG_ROOT** и произведет слияние (мутацию *environment*) двух объектов. После чего можно приступить к использованию переменных окружения на прямую из объекта *environment*, файла *environment.ts*.

> **NOTE**
> При желании хранение конфигурационного файла **data.json** можно организовать любым способом, отличным от описанного ранее. Главное, чтобы файл находился в **build** директории вашего проекта в момент развертывания приложения на *test* или *live* стенд и **environment** файлы содержали корректные пути в поле **CONFIG_ROOT**.

**Пример использования**

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

Изменения в файле *angular.json* предполагают включение в **build** приложения в режиме **production** директории *assets* и подмену файлов окружения 

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
          "ignore": [], // в реализации нашего CI может потребоваться исключение файла data.json. Тогда нужно просто добавить строчку - "**/config/data.json"
          "output": "/static/assets"
        },
      ],
    }
  }
}
```

### От Angular 18 и выше

Внедрение провайдера при использовании *Angular 18* и выше предполагает созданную по-умолчанию директорию `public` для хранения статических файлов.

В рамках современного подхода для загрузки конфигурационного файла используется `withInitializeState` стратегия.

#### Configuration file

Создаем файл **data.json** в директории *public/config*:

```json name="public/config/data.json"
{
  "API_HOST": "https://example.host/api",
  "WS_HOST": "ws://example.host.websocket",
}
```

Далее создаем файл **config.interface.ts** в директории *src/environments/interfaces*, в котором описываем интерфейс загружаемого файла конфигурации 

```ts name="src/environments/interfaces/config.interface.ts"
export interface IConfig {
  API_HOST: string;
  WS_HOST: string;
}
```

Обратите внимание, что здесь делать поля необязательными уже не нужно. Строго описывайте тип ожидаемого объекта.

#### Environment file

Добавляем в файлы окружения поле `CONFIG_ROOT`. 

Обратите внимание, что типизация объектов опущена, т.к. наличие поля будет автоматически прочитано при передаче объекта в провайдер. При его отсутствии будет выведена ошибка компиляции. При необходимости вы можете добавить типизацию указанным выше способом. 

**Файл *environment.ts*** 

Создать файл **environment.ts** в директории *src/environments*:

```ts name="src/environments/environment.ts"
export const environment = {
  CONFIG_ROOT: '/config/data.json',
};
```

**Файл *environment.prod.ts*** 

Создать файл **environment.prod.ts** в директории *src/environments*:

```ts name="src/environments/environment.prod.ts"
export const environment = {
  CONFIG_ROOT: '/static/config/data.json',
};
```

#### index.ts

Создаем файл **index.ts** для экспорта всех публичных сущностей директории *src/environments*

```ts name="src/environments/index.ts"
export * from './environment';
export * from './interfaces/config.interface';
```

#### tsconfig.json

Добавить *alias* путей для директории окружения:

```json name="tsconfig.json"
  {
    "paths": {
      "@env": ["src/environments/index.ts"],
    }
  }
```

#### angular.json

Подменить файл окружения и включить директорию с файлом `data.json` в **build** приложения в `production` режиме:

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
            "ignore": [], // в реализации нашего CI может потребоваться исключение файла data.json. Тогда нужно просто добавить строчку - "**/config/data.json",
            "output": "/static"
          }
        ],
      }
    }
  }
```

#### app.config.ts

Внедрить провайдер со стратегией:

```ts name="app.config.ts" {6}
import { provideUtilsInitializer, withInitializeState, InitializeState } from '@ngmd/utils/initializer';
import { environment, IConfig } from '@env';
import { provideUtilsInterceptor, withDefaultConfig } from '@ngmd/utils/interceptor';

const providers: (EnvironmentProviders | Provider)[] = [
  provideUtilsInitializer(environment, withInitializeState()), // Внедрение
  // Тут же можно его использовать
  provideUtilsInterceptor(
    withDefaultConfig(() => {
      const initializeState: InitializeState<IConfig> = inject(InitializeState);
      const { API_HOST }: IConfig = initializeState.config();

      return { API_HOST, API_TAG: '@' };
    }),
  ),
];
```

После загрузки конфигурационного файла, он станет доступным в рамках всего приложения. Доступ к нему осуществляется при помощи `InitializeState` 

#### Build

**Build** директория вашего проекта в конечном итоге должна иметь следующую структуру:

![build-directory](assets/images/initializer/build-directory.png)