---
keyword: SKIP_HEADERS_MODIFICATION_Page
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

`HttpContextToken`, который используется для отключения обработки запросов *feature-функциями* типа `HeadersFeature`, `HeadersHandlerFeature`

## Использование

```ts
import { SKIP_HEADERS_MODIFICATION } from '@ngmd/utils/interceptor';
import { toHttpContext } from '@ngmd/utils/http';

@Component(/**/)
export class ExampleComponent {
  private getUsers$: GetRequest<IUser[]> = useGet({
    url: '@/users',
    force: {
      httpOptions: {
        context: toHttpContext(SKIP_HEADERS_MODIFICATION, true),
      },
    },
  });
}
```

Теперь все *feature-функции* по обработке *http* заголовков будут проигнорированы для данного запроса.