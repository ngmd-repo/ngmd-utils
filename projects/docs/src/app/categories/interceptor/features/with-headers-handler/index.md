---
keyword: WithHeadersHandlerPage
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

*Feature-функция* для регистрации функции-обработчика, добавляющей заголовки каждому выполняемому запросу  

**Интерфейс**

```ts
function withHeadersHandler(
  handler: InterceptorHeadersHandler | () => InterceptorHeadersHandler,
  type: 'default' | 'factory' = 'default',
): HeadersHandlerFeature
```

>**WARNING**
> `InterceptorHeadersHandler` имеет высший приоритет по применению заголовков. Это означает, если вы дополнительно используете внедрение заголовков через *feature-функцию* `withHeaders`, возвращаемое ей значение будет проигнорировано и использоваться будут всегда заголовки функции `InterceptorHeadersHandler`. Параметр **handler** может быть передан, как конечный обработчик, так и в виде функции-фабрики, если параметр `type` указан в значении `factory`.

**Использование**

1. Конечный обработчик: 

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

2. Функция-фабрика: 

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

Создание запросов:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createProduct$: PostRequest<ProductCandidate, IProduct> = usePost("@products/create");
}
```

Теперь во время выполнения всех запросов приложения будет выполняться функция `InterceptorHeadersHandler`, и к объекту запроса `HttpRequest` будут добавляться значения с ключами из возвращаемого объекта `InterceptorHeaders`.

## Types

### InterceptorHeadersHandler

Функция-обработчик для добавления заголовков исходящему запросу

**Интерфейс**
```ts
type InterceptorHeadersHandler<T = string> = (
  req: HttpRequest<unknown>,
) => InterceptorHeaders<T>
```

**Параметры**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **req** | `HttpRequest<unknown>` | `true` | объект перехваченного запроса, которому будут добавлены заголовки |

