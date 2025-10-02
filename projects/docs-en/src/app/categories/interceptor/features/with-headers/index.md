---
keyword: WithHeadersPage
---

Imported from `@ngmd/utils/interceptor`

---

## Description

*Feature function* for adding headers to all outgoing application requests

**Interface**

```ts
function withHeaders(
  headers: InterceptorHeaders | () => InterceptorHeaders
): HeadersFeature
```

>**NOTE**
> The **headers** parameter can be passed either as a standalone object or as a factory function that should return it. Within the factory function, you can perform dependency injection using the `inject` function from `@angular/core`. Also, using a function helps avoid declaring getter functions for config fields if there is an interdependence with getting data from `provideUtilsInitializer`

**Usage**

1. Regular object: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withHeaders, InterceptorHeaders } from '@ngmd/utils/interceptor';
import { environment } from '@env/environment';

const headers: InterceptorHeaders = {
  headers: {
    'x-api-key': environment.API_KEY,
  },
};

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(withHeaders(headers))
  ],
};
```

2. Factory function: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withTagsUrlsMap } from '@ngmd/utils/interceptor';
import { environment } from '@env/environment';
import { TranslateService } from '@ngmd/translate';

function headersFactory(): InterceptorHeaders {
  const translateService = inject(TranslateService);

  return { 
    get headers(): InterceptorHeaders {
      return {
        'x-api-key': environment.API_KEY,
        language: translateService.getActiveLang()
      }
    } 
  };
}

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(withHeaders(headersFactory))
  ],
};
```

Creating requests:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createProduct$: PostRequest<ProductCandidate, IProduct> = usePost("@products/create");
}
```

Now during the execution of all application requests, values with keys from the **InterceptorHeaders** object will be added to the **HttpRequest** request object

## Types

### InterceptorHeaders

```ts
type InterceptorHeaders<T = string> = { 
  headers: {
    [key: string]: T
  } 
}
```
