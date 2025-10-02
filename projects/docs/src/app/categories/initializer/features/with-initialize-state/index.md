---
keyword: WithInitializeStatePage
---

Импортируется из `@ngmd/utils/initializer`

---


## Описание

*Feature-функция*, определяющая стратегию загрузки конфигурационного файла в объект *InitializeState* 

**Интерфейс**

```ts
function withInitializeState(): InitializeStateFeature
```

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
