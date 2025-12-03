---
keyword: TypesPage
---

Imported from `@ngmd/utils/http/graphql`

---

## Description

List of helper types for module operation

## ID

Type for **variables** object with `id` field. Allows avoiding creating an extra frequently used type.

**Interface**

```ts
export type ID<T extends number | string = string> = {
  id: T;
};
```

**Usage**

```ts {3,6}
import { ID, MutationRequest, useMutation } from '@ngmd/utils/http/graphql';

const deleteAlbum$: MutationRequest<DeleteAlbumResponse, ID> = useMutation({
  query: DELETE_ALBUM,
  force: {
    variables: { id: '1' }
  }
});
```
