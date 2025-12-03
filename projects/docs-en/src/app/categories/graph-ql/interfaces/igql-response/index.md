---
keyword: IGqlResponsePage
---

Imported from `@ngmd/utils/http/graphql`

---

## IGqlResponse

Interface for GraphQL server response object

```ts
interface IGqlResponse<Response> {
  data?: Response;
  errors?: IGqlError[];
}
```
