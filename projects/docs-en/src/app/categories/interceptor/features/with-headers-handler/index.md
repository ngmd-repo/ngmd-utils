---
keyword: WithHeadersHandlerPage
---

Imported from `@ngmd/utils/interceptor`

---

## Description

*Feature function* for registering a handler function that adds headers to each executed request

**Interface**

```ts
function withHeadersHandler(
  handler: InterceptorHeadersHandler | () => InterceptorHeadersHandler,
  type: 'default' | 'factory' = 'default',
): HeadersHandlerFeature
```

>**WARNING**
> `InterceptorHeadersHandler` has the highest priority for applying headers. This means that if you additionally use header injection through the *feature function* `withHeaders`, the value it returns will be ignored and the headers from the `InterceptorHeadersHandler` function will always be used. The **handler** parameter can be passed either as a final handler or as a factory function if the `type` parameter is set to `factory`.

**Usage**

1. Final handler: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withHeadersHandler, InterceptorHeaders } from '@ngmd/utils/interceptor';
import { environment } from '@env/environment';

function headersHandler(req: HttpRequest<unknown>): InterceptorHeaders {
  const headers: InterceptorHeaders = {
    headers: {
      'x-api-key': environment.API_KEY,
    },
  };

  return headers;
}

export const AppConfig: ApplicationConfig = {
  providers: [
    withHeadersHandler(headersHandler),
  ],
};
```

2. Factory function: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withHeadersHandler, InterceptorHeadersHandler, InterceptorHeaders } from '@ngmd/utils/interceptor';
import { useState, State } from '@ngmd/utils/state';
import { PaymentState } from './payments/state/payment.state'

function headerFactoryHandler(): InterceptorHeadersHandler {
  const paymentState: State<PaymentState> = useState(PaymentState);

  return (req: HttpRequest<unknown>): InterceptorHeaders => {
    return {
      headers: {
        'x-api-key': environment.API_KEY,
        paymentId: paymentState.paymentId()
      }
    };
  };
}

export const AppConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideUtilsInterceptor(
      withHeadersHandler(headerFactoryHandler, 'factory'),
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

Now during the execution of all application requests, the `InterceptorHeadersHandler` function will be executed, and values with keys from the returned `InterceptorHeaders` object will be added to the `HttpRequest` request object.

## Types

### InterceptorHeadersHandler

Handler function for adding headers to outgoing requests

**Interface**
```ts
type InterceptorHeadersHandler<T = string> = (
  req: HttpRequest<unknown>,
) => InterceptorHeaders<T>
```

**Parameters**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **req** | `HttpRequest<unknown>` | `true` | intercepted request object to which headers will be added |

