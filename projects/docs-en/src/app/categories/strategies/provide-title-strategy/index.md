---
keyword: ProvideTitleStrategyPage
---

Imported from `@ngmd/utils/strategies`

---


## Description

This provider allows you to override the logic for setting the `title` for the document tab in the browser.

> **NOTE**
> This strategy uses the `TitleStrategy` token

## Interface 

```ts
function provideTitleStrategy(config: TitleStrategyConfig | () => TitleStrategyConfig): EnvironmentProviders;
```

> **NOTE**
> If necessary, the configuration object can be passed as a factory function.

## Types

### TitleStrategyConfig

Configuration object for the strategy

**Interface**

```ts
type TitleStrategyConfig = {
  handler: TitleStrategyHandler;
};
```

### TitleStrategyHandler

Handler function for the `title` field in the `Route` object

**Interface**

```ts
type TitleStrategyHandler = (title: string) => string;
```

## Usage

Define `Routes` with a `title` field for each path:

```ts name="app.routes.ts"
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, title: 'Main' },
  { path: 'test', component: TestComponent, title: 'Test' },
  { path: 'some', component: SomeComponent, title: 'Some' },
];
```

Register the strategy:

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

Now when navigating to pages, the `title` field will be retrieved and transformed using the `handler`.

![page-title](assets/images/strategies/provide-title-strategy/strategy-title-1.jpg)
![page-title](assets/images/strategies/provide-title-strategy/strategy-title-2.jpg)
![page-title](assets/images/strategies/provide-title-strategy/strategy-title-3.jpg)
