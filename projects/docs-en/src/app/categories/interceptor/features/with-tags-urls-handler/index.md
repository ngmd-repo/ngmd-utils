---
keyword: WithTagsUrlsHandlerPage
---

Imported from `@ngmd/utils/interceptor`

---

## Description

*Feature function* for registering a *url* address handler function for each executed request

**Interface**

```ts
function withTagsUrlsHandler(
  handler: InterceptorTagsUrlsHandler | () => InterceptorTagsUrlsHandler,
  type: 'default' | 'factory' = 'default',
): TagsUrlsHandlerFeature
```

>**NOTE**
> The **handler** parameter can be passed either as a final handler or as a factory function if the `type` parameter is set to `factory`.

**Usage**

1. Final handler: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withTagsUrlsHandler } from '@ngmd/utils/interceptor';
import { environment } from '@env/environment';

function tagsUrlsHandler(url: string, req: HttpRequest<unknown>): string {
  const isProductsUrl: string = url.startsWith('@products/');

  return isProductsUrl ? url.replace('@products', environment.API_PRODUCTS_HOST) : null;
}

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(withTagsUrlsHandler(tagsUrlsHandler))
  ],
};
```

2. Factory function: 

```ts name="app.config.ts"
function tagsUrlsHandlerFactory(): InterceptorTagsUrlsHandler {
  const productsConfigService = inject(ProductsConfigService);

  return function (url: string, req: HttpRequest<unknown>): string | null {
    const isProductsUrl: string = url.startsWith('@products/');

    return isProductsUrl ? url.replace('@products', productsConfigService.getHost()) : null;
  }
} 

export const AppConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideUtilsInterceptor(
      withTagsUrlsHandler(tagsUrlsHandlerFactory),
    )
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

Now during the execution of all requests in the application, the `InterceptorTagsUrlsHandler` function will be applied to *url* addresses.

## Types

### InterceptorTagsUrlsHandler

Request *url* address handler function.
Can return 2 values:

  - `string` - this value will be used for the outgoing request as the *url* address
  - `null` - then an attempt will be made to find matches by **tag:host** if `withDefaultConfig` or `withTagsUrlsMap` were registered. If no match is found, the request *url* address will remain unchanged.

**Interface**
```ts
type InterceptorTagsUrlsHandler = (url: string, req: HttpRequest<unknown>) => string | null;
```

**Parameters**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **url** | `string` | `true` | *url* of the outgoing request |
| **req** | `HttpRequest<unknown>` | `true` | intercepted request object |


