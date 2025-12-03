---
keyword: UseMutationPage
---

Imported from `@ngmd/utils/http/graphql`

---

## Description

This page describes the process of creating a GraphQL request of type **mutation**

## useMutation

Function for creating `MutationRequest`

**Interface**

```ts
function useMutation<Response, Variables extends object = null>(
  queryOrMeta: GqlRequestString<'mutation'> | MutationRequestMeta<Response>,
): MutationRequest<Response, Variables>;
```

## MutationRequest

GraphQL **mutation** request class

**Interface**

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

Meta information for creating a request. Inherits fields from the `GqlRequestMeta` type

```ts
type MutationRequestMeta<Response> = GqlRequestMeta<'mutation', Response>;
```
