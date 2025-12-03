---
keyword: ProvideGqlPage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## provideGql

Провайдер для настройки глобальной конфигурации в работе модуля GraphQL

**Интерфейс**

```ts
provideGql(...features: GqlFeatures): Provider[]
```

## Features

### withGqlConfig

Feature функция для регистрации глобальной конфигурации

**Интерфейс**

```ts
function withGqlConfig(config: GqlConfig | (() => GqlConfig)): GqlConfigFeature;
```

**Параметры**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **config** | `GqlConfig \| (() => GqlConfig)` | `null` | `true` |  Объект или функция-фабрика, возвращающая объект с глобальной конфигурацией |

**Использование**

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
> Данная функция полностью совместима с работой модуля [`@ngmd/utils/interceptor`](/interceptor/introduction)

#### GqlConfig

Объект с глобальной конфигурацией 

**Интерфейс**

```ts
type GqlConfig = {
  url: string;
};
```

**Описание**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **url** | `string` | `null` | `true` |  **url**, который будет использоваться при выполнении запросов `QueryRequest`, `MutationRequest` |

>**NOTE**
> **url** глобальной конфигурации может быть переопределен при создании конкретного запроса в рамках объекта с мета информацией


### withGqlResponseHandler

Feature функция для обработки **response** типа `IGqlResponse` всех GraphQL запросов.

**Интерфейс**

```ts
function withGqlResponseHandler(handler: WithGqlResponseFn): WithGqlResponseHandlerFeature;
```

**Параметры**

| Name | Type | Default value | Required | Description |
|----------|----------|----------|----------|----------|
| **handler** | `WithGqlResponseFn` | `null` | `true` |  Функция для обработки объекта **response** GraphQL запроса |

**Описание**

По-умолчанию все объекты **response** у GraphQL запросов имеют интерфейс типа `IGqlResponse`. Для облегчения разработки модуль `@ngmd/utils/http/graphql` обрабатывает каждый объект **response** через собственную функцию. Логика этой функции выглядит следующим образом:

**Функция по-умолчанию**

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

**Описание работы функции по-умолчанию**

  - Если в объекте **response** содержится поле *error*, выбросить исключение с объектом ошибки `HttpErrorResponse`, включающей `response.errors` массив. Ошибка будет обработана в callback функции `error` объекта `ConnectionOptions`

  - Если в объекте **response** <b style="color: #ed4141">НЕ</b> не содержится поле **error**, запрос считается успешно выполненным. Из запроса достается значение поля **data**, которое будет обработано в callback функции `next` объекта `ConnectionOptions`

**Пример обработки запроса прошедшего через работу функции по-умолчанию**

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

**Переопределение функции по-умолчанию**

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

Теперь *response* для всех запросов будет в исходном виде типа `IGqlResponse`, поступающем от сервера

#### WithGqlResponseFn

Функция-обработчик, переопределяющая дефолтное поведение обработки response

```ts
type WithGqlResponseFn = <T = any>(response: IGqlResponse<T>) => Observable<T>;
```