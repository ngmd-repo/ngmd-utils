---
keyword: IGqlResponsePage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## IGqlResponse

Интерфейс объекта response GraphQL сервера

```ts
interface IGqlResponse<Response> {
  data?: Response;
  errors?: IGqlError[];
}
```
