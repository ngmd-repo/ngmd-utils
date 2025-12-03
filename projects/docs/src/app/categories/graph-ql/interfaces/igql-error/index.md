---
keyword: IGqlErrorPage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## IGqlError

Интерфейс объекта http ошибки от GraphQL сервера. Используется в типе `IGqlResponse`

```ts
interface IGqlError {
  message: string;
  locations: GqlLocation[];
  path: string[];
  extensions: GqlExtension[];
}
```

## Types

### GqlExtension

```ts
type GqlExtension = {
  code: string;
  stacktrace: string[];
};
```

### GqlLocation

```ts
type GqlLocation = {
  line: number;
  column: number;
};
```