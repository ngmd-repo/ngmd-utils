---
keyword: WithHeadersPage
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

*Feature-функция* для добавления заголовков всем исходящим запросам приложения 

**Интерфейс**

```ts
function withHeaders(
  headers: InterceptorHeaders | () => InterceptorHeaders
): HeadersFeature
```

>**NOTE**
> Параметр **headers** может быть передан, как самостоятельный объект, так и в виде функции-фабрики, которая должна его возвращать. В рамках функции-фабрики можно производить инъекции зависимостей при помощи функции `inject` из `@angular/core`. Так же использование через функцию поможет избежать объявления геттер функций для полей конфига, если есть взаимосвязь с получением данных из `provideUtilsInitializer`

**Использование**

1. Обычный объект: 

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

2. Функция-фабрика: 

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

Создание запросов:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createProduct$: PostRequest<ProductCandidate, IProduct> = usePost("@products/create");
}
```

Теперь во время выполнения всех запросов приложения к объекту запроса **HttpRequest** будут добавляться значения с ключами из объекта **InterceptorHeaders**

## Types

### InterceptorHeaders

```ts
type InterceptorHeaders<T = string> = { 
  headers: {
    [key: string]: T
  } 
}
```
