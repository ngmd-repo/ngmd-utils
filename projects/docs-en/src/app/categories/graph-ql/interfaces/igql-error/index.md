---
keyword: IGqlErrorPage
---

Imported from `@ngmd/utils/http/graphql`

---

## IGqlError

Interface for HTTP error object from GraphQL server. Used in the `IGqlResponse` type

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