---
keyword: IntroductionPage
---

Импортируется из `@ngmd/utils/http/graphql`

[`Style guides`](/getting-started/style-guides#graphql)

---

## Описание

Данный модуль предоставляет возможность автоматизированного взаимодействия с *GraphQL backend* при помощи набора **gql** запросов. Внутренняя реализация использует `HttpClient` пакета `@angular/common/http`.

## Основные аспекты

Далее будут представлены основные аспекты взаимодействия с **api**, которые дает модуль `@ngmd/utils/http/graphql`

### Запросы

На данный момент существует **2** типов запросов:

  - <code info>`*UseQueryPage`</code>
  - <code info>`*UseMutationPage`</code>

Все запросы расширяют базовый класс <code info>`*ApiRequestPage`</code> из модуля [`@ngmd/utils/http`](/http/introduction), который в свою очередь предоставляет общий набор методов и полей. 

Все запросы имеют набор сущностей для инициализации и взаимодействия. В этот набор входят: 

  - Объект **meta** информации для создания и управления запросом **(1)**
  - Тип запроса **(2)**
  - Функция создания запроса **(3)**

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

Каждый тип запроса имеет собственный набор *generic* параметров, расположенных по приоритету. Основные из них:

  - `Variables` - объект с *variables* для запроса **(1)**
  - `Response` - возвращаемое значение запроса **(2)**

**Пример**

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

### Композиция запросов

Для объединения запросов в рамках логического контекста существует <code info>`*ProvideGqlHubPage`</code>.
Это позволяет хранить набор запросов в рамках одной сущности. Использование <code info>`*ProvideGqlHubPage`</code> осуществляется через **Angular DI**, что дает возможность получать доступ к состоянию и управлению каждым запросом из любого места в дереве зависимостей.

### Подключение глобального url

Если Ваше приложение взаимодействует только с одним GraphQL сервером, мы можете избавить себя от необходимости передавать url адрес в каждый запрос. Библиотека полностью совместим с функциональностью модуля [`@ngmd/utils/interceptor`](/interceptor/introduction).

**Подключение**

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

Теперь все исходящие запросы будут иметь тег `@graphql` и заменяться на значение `GRAPHQL_API_HOST`.

Так же Вы всегда можете переопределить url при создании запроса, т.к. он имеет наибольший приоритет:

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

Далее, для углубленного изучения возможностей данного модуля, рекомендуется следующая последовательность:

  - Изучить работу базового класса запросов `*ApiRequestPage` 
  - Изучить работу GraphQL класса запросов `*GqlRequestPage` 
  - Ознакомиться со списком запросов, которые являются прямыми наследниками `*GqlRequestPage`:  <code info>`*UseMutationPage`</code>, <code info>`*UseQueryPage`</code>
  - Изучить работу <code info>`*ProvideGqlHubPage`</code>