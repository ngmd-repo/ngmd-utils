---
keyword: SKIP_REQUEST_MODIFICATION_Page
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

`HttpContextToken`, который используется для отключения обработки запросов *feature-функциями* типа `UtilsInterceptorFeatures`

## Использование

```ts
import { SKIP_REQUEST_MODIFICATION } from '@ngmd/utils/interceptor';
import { toHttpContext } from '@ngmd/utils/http';

@Component(/**/)
export class ExampleComponent {
  private getUsers$: GetRequest<IUser[]> = useGet({
    url: 'https://fakestoreapi.com/users',
    force: {
      requestOptions: {
        context: toHttpContext(SKIP_REQUEST_MODIFICATION, true),
      },
    },
  });
}
```

Теперь все обработчики функции провайдера `provideUtilsInterceptor` будут проигнорированы для данного запроса.
