---
keyword: SKIP_HEADERS_MODIFICATION_Page
---

Imported from `@ngmd/utils/interceptor`

---

## Description

`HttpContextToken` used to disable request processing by *feature functions* of type `HeadersFeature`, `HeadersHandlerFeature`

## Usage

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

Now all *feature functions* for processing *http* headers will be ignored for this request.