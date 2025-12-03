---
keyword: UseMutationPage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## Описание

На данной странице описан процесс создания GraphQL запроса типа **mutation**

## useMutation

Функция создания `MutationRequest` 

**Интерфейс**

```ts
function useMutation<Response, Variables extends object = null>(
  queryOrMeta: GqlRequestString<'mutation'> | MutationRequestMeta<Response>,
): MutationRequest<Response, Variables>;
```

## MutationRequest

Класс GraphQL запроса **mutation** 

**Интерфейс**

```ts
class MutationRequest<Response, Variables extends object = null> extends GraphQLRequest<
  'mutation',
  Response,
  Variables
> {
  constructor(queryOrMeta: GqlRequestString<'mutation'> | MutationRequestMeta<Response>) {}
}
```

## Types

### MutationRequestMeta

Мета информация для создания запроса. Наследует поля типа `GqlRequestMeta`

```ts
type MutationRequestMeta<Response> = GqlRequestMeta<'mutation', Response>;
```
