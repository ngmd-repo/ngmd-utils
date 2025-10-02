---
keyword: WithTagsUrlsHandlerPage
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

*Feature-функция* для регистрации функции-обработчика *url* адреса для каждого выполняемого запроса  

**Интерфейс**

```ts
function withTagsUrlsHandler(
  handler: InterceptorTagsUrlsHandler | () => InterceptorTagsUrlsHandler,
  type: 'default' | 'factory' = 'default',
): TagsUrlsHandlerFeature
```

>**NOTE**
> Параметр **handler** может быть передан, как конечный обработчик, так и в виде функции-фабрики, если параметр `type` указан в значении `factory`.

**Использование**

1. Конечный обработчик: 

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

2. Функция-фабрика: 

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

Создание запросов:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createProduct$: PostRequest<ProductCandidate, IProduct> = usePost("@products/create");
}
```

Теперь во время выполнения всех запросов в приложении к *url* адресам будет применяться функция `InterceptorTagsUrlsHandler`.

## Types

### InterceptorTagsUrlsHandler

Функция-обработчик *url* адреса запроса.
Может вернуть 2 значения:

  - `string` - это значение будет использовано для исходящего запроса в качестве *url* адреса
  - `null` - тогда будет сделана попытка найти совпадения по **tag:host**, были зарегистрированы `withDefaultConfig` или `withTagsUrlsMap`. Если совпадение не будет найдено, *url* адрес запроса останется без изменений.

**Интерфейс**
```ts
type InterceptorTagsUrlsHandler = (url: string, req: HttpRequest<unknown>) => string | null;
```

**Параметры**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **url** | `string` | `true` | *url* исходящего запроса |
| **req** | `HttpRequest<unknown>` | `true` | объект перехваченного запроса |


