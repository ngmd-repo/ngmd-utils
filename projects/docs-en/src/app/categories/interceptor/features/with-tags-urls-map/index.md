---
keyword: WithTagsUrlsMapPage
---

Imported from `@ngmd/utils/interceptor`

---

## Description

*Feature function* for using multiple **tag:host** configuration

**Interface**

```ts
function withTagsUrlsMap(tagsMap: 
  InterceptorTagsMap | () => InterceptorTagsMap
): TagsUrlsMapFeature 
```

>**NOTE**
> The **tagsMap** parameter can be passed either as a standalone object or as a factory function that should return it. Within the factory function, you can perform dependency injection using the `inject` function from `@angular/core`. Also, using a function helps avoid declaring getter functions for config fields if there is an interdependence with getting data from `provideUtilsInitializer`

**Usage**

1. Regular object: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withTagsUrlsMap, InterceptorTagsMap } from '@ngmd/utils/interceptor';
import { environment } from '@env/environment';

const tagsMap: InterceptorTagsMap = {
  '@app': environment.API_HOST,
  '@products': environment.API_PRODUCTS_HOST,
};

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(withTagsUrlsMap(tagsMap))
  ],
};
```

2. Factory function: 

```ts name="app.config.ts"
function tagsMapFactory(): InterceptorTagsMap {
  const productsConfigService = inject(ProductsConfigService);

  return {
    '@app': environment.API_HOST,
    '@products': productsConfigService.getHost(), // используем инжектирование
  }
} 

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(
      withTagsUrlsMap(tagsMapFactory),
    )
  ],
};
```

Creating requests:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createProduct$: PostRequest<ProductCandidate, IUser> = usePost("@products/create");
}
```

Now during the execution of all application requests, tags will be replaced with their corresponding values from the **tagsMap** object.

## Types

### InterceptorTagsMap

Key-value object where the key is a tag that hides the host URL address, and the value is the host itself that will replace the tag

**Interface**
```ts
type InterceptorTagsMap = {
  [tag: string]: string; // tag:host
};
```
