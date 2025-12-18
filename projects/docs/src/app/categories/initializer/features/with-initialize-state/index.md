---
keyword: WithInitializeStatePage
---

Импортируется из `@ngmd/utils/initializer`

---


## Описание

*Feature-функция*, определяющая стратегию загрузки конфигурационного файла в объект *InitializeState* 

**Интерфейс**

```ts
function withInitializeState(opts?: InitializeStateOptions | (() => InitializeStateOptions)): InitializeStateFeature
```

**Параметры**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **opts** | `InitializeStateOptions \| (() => InitializeStateOptions)` | `false` | Объект опций, расширяющих поведение провайдера |

**Использование**

Подробный гайд по внедрению описан [здесь](/initializer/introduction#от-angular-18-и-выше)

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

Класс, хранящий в себе конфигурационный файл и поля статуса загрузки:

**Интерфейс**

```ts
class InitializeState<T extends object> {
  public config: WritableSignal<T>;
  public loaded: Signal<boolean>;
  public whenLoaded$: Observable<boolean>;
}
```

**Описание**

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **config** | `T extends object` | `null` | Объект конфигурационного файла |
| **loaded** | `Signal<boolean>` | `false` | Статус загрузки конфигурационного файла |
| **whenLoaded$** | `Signal<boolean>` | `false` | При подписке, когда будет загружен конфигурационный файла, выдает значение `true`. |


## Types

### InitializeStateOptions

**Описание**

| Name | Type | Default | Description |
|----------|----------|----------|----------|
| **tags** | `TagsMap` | `null` | Объект с полями-тэгами, которые будут использованы для замены динамических значений в строковых свойствах конфигурации. [Пример](/initializer/features/with-initialize-state#initializestateoptionstags) |


## Use Cases

### InitializeStateOptions.tags

Исходный объект конфигурации c тэгом **domain**:


```json name="data.json"
{
  "API_HOST": "{%raw%}https://api.{{domain}}/v2/api{%endraw%}",
  "WS_HOST": "{%raw%}wss://api.{{domain}}{%endraw%}",
  "CDN_HOST": "{%raw%}https://static.{{domain}}{%endraw%}"
}
```

Предоставляем объект со значение для тэга **domain** в функции провайдере:

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

Объект конфигурации после замены тэга **domain**:

```ts
{
  "API_HOST": "https://api.qa4/v2/api",
  "WS_HOST": "wss://api.qa4",
  "CDN_HOST": "https://static.qa4"
}
```

> **NOTE**
> Доступ к объекту конфигурации можно получить в свойстве `config` сервиса `InitializeState`

