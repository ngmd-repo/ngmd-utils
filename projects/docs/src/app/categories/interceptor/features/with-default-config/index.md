---
keyword: WithDefaultConfigPage
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

*Feature-функция* для использования **tag:host** конфигурации host адреса

**Интерфейс**

```ts
function withDefaultConfig(
  defaultConfig: InterceptorDefaultConfig | () => InterceptorDefaultConfig,
): DefaultConfigFeature
```

>**NOTE**
> Параметр **defaultConfig** может быть передан, как самостоятельный объект, так и в виде функции-фабрики, которая должна его возвращать. В рамках функции-фабрики можно производить инъекции зависимостей при помощи функции `inject` из `@angular/core`. Так же использование через функцию поможет избежать объявления геттер функций для полей конфига, если есть взаимосвязь с получением данных из `provideUtilsInitializer`

**Использование**

1. Обычный объект: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withDefaultConfig, InterceptorDefaultConfig } from '@ngmd/utils/interceptor';
import { environment } from '@env/environment';

const defaultConfig: InterceptorDefaultConfig = {
  API_HOST: environment.API_HOST,
  API_TAG: '@app',
};

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(
      withDefaultConfig(defaultConfig),
    )
  ],
};
```

2. Функция-фабрика: 

```ts name="app.config.ts"
function defaultConfigFactory(): InterceptorDefaultConfig {
  // * Here you can use `inject`
  return {
    API_HOST: environment.API_HOST,
    API_TAG: '@app',
  }
};

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(
      withDefaultConfig(defaultConfigFactory),
    )
  ],
};
```

Создание запросов:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createUser$: PostRequest<UserCandidate, IUser> = usePost("@app/users/create");
}
```

Теперь во время выполнения всех запросов приложения тег **@app** из свойства **API_TAG** будет заменяться на значение свойства **API_HOST** из **defaultConfig**.

## Types

### InterceptorDefaultConfig

Тип базовой конфигурации, используемые в *feature-функции* `withDefaultConfig`

**Интерфейс**
```ts
type InterceptorDefaultConfig = {
  API_TAG: string;
  API_HOST: string;
};
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **API_TAG** | `string` | `true` | тег, скрывающий хост URL адреса |
| **API_HOST** | `string` | `true` | хост, который будет заменять **API_TAG** во время выполнения запроса |