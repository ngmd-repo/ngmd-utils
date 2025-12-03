---
keyword: ProvideGqlPage
---

Imported from `@ngmd/utils/http/graphql`

---

## provideGql

Provider for configuring global configuration in the GraphQL module work

**Interface**

```ts
provideGql(...features: GqlFeatures): Provider[]
```

## Features

### withGqlConfig

Feature function for registering global configuration

**Interface**

```ts
function withGqlConfig(config: GqlConfig | (() => GqlConfig)): GqlConfigFeature;
```

**Parameters**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **config** | `GqlConfig \| (() => GqlConfig)` | `null` | `true` | Object or factory function returning an object with global configuration |

**Usage**

```ts
import { provideGql, withGqlConfig } from '@ngmd/utils/http/graphql';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideGql(
      withGqlConfig({
        url: 'https://graphqlzero.almansi.me/api',
      }),
    ),
  ]
}
```

>**NOTE**
> This function is fully compatible with the [`@ngmd/utils/interceptor`](/interceptor/introduction) module

#### GqlConfig

Object with global configuration

**Interface**

```ts
type GqlConfig = {
  url: string;
};
```

**Description**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **url** | `string` | `null` | `true` | **url** that will be used when executing `QueryRequest`, `MutationRequest` requests |

>**NOTE**
> The global configuration **url** can be overridden when creating a specific request within the meta information object
### withGqlResponseHandler

Feature function for handling **response** of type `IGqlResponse` for all GraphQL requests.

**Interface**

```ts
function withGqlResponseHandler(handler: WithGqlResponseFn): WithGqlResponseHandlerFeature;
```

**Parameters**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **handler** | `WithGqlResponseFn` | `null` | `true` | Function for processing the **response** object of GraphQL request |

**Description**

By default, all **response** objects in GraphQL requests have an interface of type `IGqlResponse`. To ease development, the `@ngmd/utils/http/graphql` module processes each **response** object through its own function. The logic of this function is as follows:

**Default function**

```ts
import { HttpErrorResponse } from '@angular/common/http';
import { iif, Observable, of, throwError } from 'rxjs';
import { IGqlResponse } from '@ngmd/utils/http/graphql';

const defaultWithResponseFn = <T = any>(response: IGqlResponse<T>): Observable<T> => {
  return iif(
    () => 'errors' in response,
    throwError(() => new HttpErrorResponse({ error: response.errors })),
    of(response.data),
  );
};
```

**Description of default function behavior**

  - If the **response** object contains an *error* field, throw an exception with an `HttpErrorResponse` error object that includes the `response.errors` array. The error will be handled in the `error` callback function of the `ConnectionOptions` object

  - If the **response** object <b style="color: #ed4141">DOES NOT</b> contain an **error** field, the request is considered successfully executed. The **data** field value is extracted from the request, which will be handled in the `next` callback function of the `ConnectionOptions` object

**Example of processing a request that went through the default function**

```ts {6-7}
@Component({/**/})
class ExampleComponent {
  public album$: QueryRequest<IAlbum, ID<number>> = useQuery({
    query: GET_ALBUM,
    connect: {
      next: (album: IAlbum) => console.log('Response:', album), // response.data = IAlbum
      error: (e: HttpErrorResponse) => console.log('Error:', e.error) // response.errors = e.error = IGqlError[],
    },
  });
}
```

**Overriding the default function**

```ts
import { provideGql, withGqlResponseHandler, IGqlResponse } from '@ngmd/utils/http/graphql';
import { of } from 'rxjs';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideGql(
      withGqlResponseHandler((response: IGqlResponse<unknown>) => of(response)),
    ),
  ]
}
```

Now the *response* for all requests will be in the original form of type `IGqlResponse` coming from the server

#### WithGqlResponseFn

A handler function that overrides the default behavior when handling response

```ts
type WithGqlResponseFn = <T = any>(response: IGqlResponse<T>) => Observable<T>;
```