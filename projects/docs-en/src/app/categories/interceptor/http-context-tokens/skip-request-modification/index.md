---
keyword: SKIP_REQUEST_MODIFICATION_Page
---

Imported from `@ngmd/utils/interceptor`

---

## Description

`HttpContextToken` used to disable request processing by *feature functions* of type `UtilsInterceptorFeatures`

## Usage

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

Now all handlers of the `provideUtilsInterceptor` provider function will be ignored for this request.
