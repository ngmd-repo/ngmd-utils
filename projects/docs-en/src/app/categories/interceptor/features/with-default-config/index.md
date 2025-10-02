---
keyword: WithDefaultConfigPage
---

Imported from `@ngmd/utils/interceptor`

---

## Description

*Feature function* for using **tag:host** configuration of the host address

**Interface**

```ts
function withDefaultConfig(
  defaultConfig: InterceptorDefaultConfig | () => InterceptorDefaultConfig,
): DefaultConfigFeature
```

>**NOTE**
> The **defaultConfig** parameter can be passed either as a standalone object or as a factory function that should return it. Within the factory function, you can perform dependency injection using the `inject` function from `@angular/core`. Also, using a function helps avoid declaring getter functions for config fields if there is an interdependence with getting data from `provideUtilsInitializer`

**Usage**

1. Regular object: 

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

2. Factory function: 

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

Creating requests:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createUser$: PostRequest<UserCandidate, IUser> = usePost("@app/users/create");
}
```

Now during the execution of all application requests, the **@app** tag from the **API_TAG** property will be replaced with the value of the **API_HOST** property from **defaultConfig**.

## Types

### InterceptorDefaultConfig

Base configuration type used in the *feature function* `withDefaultConfig`

**Interface**
```ts
type InterceptorDefaultConfig = {
  API_TAG: string;
  API_HOST: string;
};
```

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **API_TAG** | `string` | `true` | tag that hides the host URL address |
| **API_HOST** | `string` | `true` | host that will replace **API_TAG** during request execution |