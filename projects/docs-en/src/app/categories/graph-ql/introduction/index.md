---
keyword: IntroductionPage
---

Imported from `@ngmd/utils/http/graphql`

[`Style guides`](/getting-started/style-guides#graphql)

---

## Description

This module provides automated interaction capabilities with *GraphQL backend* using a set of **gql** requests. The internal implementation uses `HttpClient` from the `@angular/common/http` package.

## Main aspects

The following are the main aspects of **api** interaction provided by the `@ngmd/utils/http/graphql` module

### Requests

There are currently **2** types of requests:

  - <code info>`*UseQueryPage`</code>
  - <code info>`*UseMutationPage`</code>

All requests extend the base class <code info>`*ApiRequestPage`</code> from the [`@ngmd/utils/http`](/http/introduction) module, which in turn provides a common set of methods and fields.

All requests have a set of entities for initialization and interaction. This set includes:

  - **meta** information object for creating and managing the request **(1)**
  - Request type **(2)**
  - Request creation function **(3)**
  
  ```typescript name="resource.ts"
  const meta: QueryRequestMeta<IAlbum, ID<number>> = {
    query: GET_ALBUM,
    connect: {
      next: (response: IAlbum) => console.log(response),
      error: (e: HttpErrorResponse) => console.log('Error:', e),
    },
  }; // * (1)
  const album$: QueryRequest<IAlbum, ID<number>> = useQuery(this.meta); // (2, 3)
```

Each request type has its own set of *generic* parameters arranged by priority. The main ones are:

  - `Variables` - object with *variables* for the request **(1)**
  - `Response` - return value of the request **(2)**

**Example**

```typescript
  // Variables (1)
  type GetAlbumsVariables = { userId: string };
  // Response (2)
  interface IAlbum { /*...*/ }
  // Request
  const GET_ALBUMS = `#graphql
    query GetAlbums($userId: ID!) {
      albums(userId: $userId) {
        id,
        title,
        description
      }
    }
  `;
  const albums$: QueryRequest<IAlbum[], GetAlbumsVariables> = useQuery({ 
    query: GET_ALBUMS
  });

  albums$.send({
    variables: { userId: '123' }
    connect: {
      next(albums: IAlbum[]) { 
        console.log('Response albums:', albums) 
      }
    }
  })
```

### Request composition

For combining requests within a logical context, there is <code info>`*ProvideGqlHubPage`</code>.
This allows storing a set of requests within a single entity. Using <code info>`*ProvideGqlHubPage`</code> is done through **Angular DI**, which provides access to the state and management of each request from anywhere in the dependency tree.

### Setting up global URL

If your application interacts with only one GraphQL server, you can save yourself from having to pass a URL address in every request. The library is fully compatible with the functionality of the [`@ngmd/utils/interceptor`](/interceptor/introduction) module.

**Setup**

```ts name="app.config.ts"
import { provideUtilsInterceptor, withTagsUrlsMap } from '@ngmd/utils/interceptor';
import { provideGql, withGqlConfig } from '@ngmd/utils/http/graphql';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideGql(
      withGqlConfig({ url: '@graphql' }),
    ),
    provideUtilsInterceptor(
      withTagsUrlsMap(() => {
        const initializeState: InitializeState<IConfig> = inject(InitializeState);
        const { REST_API_HOST, GRAPHQL_API_HOST }: IConfig = initializeState.config();

        return {
          '@': REST_API_HOST,
          '@graphql': GRAPHQL_API_HOST,
        };
      }),
    ),
  ]
}
```

Now all outgoing requests will have the `@graphql` tag and be replaced with the `GRAPHQL_API_HOST` value.

You can also always override the URL when creating a request, as it has the highest priority:

```ts
@Component({/**/})
class ExampleComponent {
  protected getUser$: QueryRequest<IUser, ID<number>> = useQuery({
    query: GET_USER,
    url: "@another-tag"
  });
  protected getAlbum$: QueryRequest<IAlbum, ID<number>> = useQuery({
    query: GET_ALBUM,
    url: "https://graphqlzero.almansi.me/api"
  });
}
```

### In-depth

For an in-depth study of the capabilities of this module, the following sequence is recommended:

  - Study the work of the base request class `*ApiRequestPage`
  - Study the work of the GraphQL request class `*GqlRequestPage`
  - Familiarize yourself with the list of requests that are direct inheritors of `*GqlRequestPage`: <code info>`*UseMutationPage`</code>, <code info>`*UseQueryPage`</code>
  - Study the work of <code info>`*ProvideGqlHubPage`</code>