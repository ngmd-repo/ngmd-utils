---
keyword: TypesPage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## Описание

Список вспомогательных типов для работы модуля

## ID

Тип для объекта **variables** с полем `id`. Позволяет не создавать лишний часто используемый тип.

**Интерфейс**

```ts
export type ID<T extends number | string = string> = {
  id: T;
};
```

**Использование**

```ts {3,6}
import { ID, MutationRequest, useMutation } from '@ngmd/utils/http/graphql';

const deleteAlbum$: MutationRequest<DeleteAlbumResponse, ID> = useMutation({
  query: DELETE_ALBUM,
  force: {
    variables: { id: '1' }
  }
});
```
