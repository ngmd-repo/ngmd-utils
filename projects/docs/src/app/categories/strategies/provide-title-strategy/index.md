---
keyword: ProvideTitleStrategyPage
---

Импортируется из `@ngmd/utils/strategies`

---


## Описание

Данный провайдер позволяет переопределить логику установки `title` для вкладки документа в браузере.

> **NOTE**
> Данная стратегия использует токен `TitleStrategy`

## Интерфейс 

```ts
function provideTitleStrategy(config: TitleStrategyConfig | () => TitleStrategyConfig): EnvironmentProviders;
```

> **NOTE**
> При необходимости объект конфигурации может передаваться, как функция-фабрика.

## Types

### TitleStrategyConfig

Объект конфигурации для стратегии

**Интерфейс**

```ts
type TitleStrategyConfig = {
  handler: TitleStrategyHandler;
};
```

### TitleStrategyHandler

Функция-обработчик поля `title` в объекте `Route`

**Интерфейс**

```ts
type TitleStrategyHandler = (title: string) => string;
```

## Usage

Определить `Routes` с полем `title` для каждого пути:

```ts name="app.routes.ts"
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, title: 'Main' },
  { path: 'test', component: TestComponent, title: 'Test' },
  { path: 'some', component: SomeComponent, title: 'Some' },
];
```

Зарегистрировать стратегию:

```typescript name="app.config.ts" {6-9}
import { provideRouter } from '@angular/router';
import { provideTitleStrategy } from '@ngmd/utils/strategies';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideRouter(AppRoutes),
    provideTitleStrategy({
      handler: (title: string) => `Utils: ${title}`
    }),
  ],
};
```

Теперь при навигации на страницы будет доставаться поле `title` и преобразовываться с помощью `handler`.

![page-title](assets/images/strategies/provide-title-strategy/strategy-title-1.jpg)
![page-title](assets/images/strategies/provide-title-strategy/strategy-title-2.jpg)
![page-title](assets/images/strategies/provide-title-strategy/strategy-title-3.jpg)
