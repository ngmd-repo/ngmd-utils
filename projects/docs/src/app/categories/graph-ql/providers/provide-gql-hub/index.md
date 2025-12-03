---
keyword: ProvideGqlHubPage
---

Импортируется из `@ngmd/utils/http/graphql`

---

## Описание

Менеджер для объединения и централизованного хранения запросов с общим доступом в рамках DI. Расширяет hub-класс менеджер-свойством **hub** с менеджер-классом `GqlHubManager`, предоставляя дополнительные методы общего управления классом.

**Интерфейс**

```ts
type GqlHub<T extends TGqlHub<T>> = T & {
  hub: GqlHubManager<T>;
};
```

## Providers

### provideGqlHub

Провайдер для регистрации модульного hub-класса

```ts
function provideGqlHub<T extends TGqlHub<T>>(Hub: TConstructor<T>): Provider;
```

### useGqlHub

Функция для инжектирования модульного hub-класса

```ts
function useGqlHub<T extends TGqlHub<T>>(
  Hub: TConstructor<T>,
  config?: GqlHubConfig<T>,
): GqlHub<T>;
```


## GqlHubManager

Менеджер-класс для управления hub-классом. Создается в рамках поля **hub** в типе `GqlHub`

Работает аналогично `ApiHub`

**Интерфейс**

```ts
class GqlHubManager<T extends TGqlHub<T>> {
  public get(
    ...keys: QueryRequestsKeys
  ): keys.length === 1 ? Hub[HubRequestKey].value() : { [Key in HubRequestKeys]: T[Key].value() };
  public abort(...keys: Array<keyof T>): void;
  public clear(...keys: Array<keyof T>): void;
  public reset(...keys: Array<keyof T>): void;
  public destroy(...keys: Array<keyof T>): void;
}
```

> **NOTE**
> Работа всех методов класса идентична работе `ApiHub`

> **WARNING**
> Если параметр **keys** не передан, то вызов будет применен ко всем объектам запросов

## Types

### TGqlHub

Тип, которому должен соответствовать hub-класс

**Интерфейс**

```ts
type GqlHub<T extends TGqlHub<T>> = T & {
  hub: GqlHubManager<T>;
};
```

### GqlHubConfig

Объект конфигурации, используемый в функции-инжекторе `useGqlHub`

**Интерфейс**

```ts
type GqlHubConfig<Hub extends TGqlHub<Hub>> = {
  cache?: Array<keyof QueryRequest>,
  force?: Array<keyof QueryRequest>,
  onDestroy?: {
    abort?: Array<keyof Hub> | true;
    reset?: Array<keyof Hub> | true;
  }
}
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **cache** | `keyof QueryRequest[]` | `false` | При инициализации компонента вызывает метод **cache** у запросов класса `QueryRequest` |
| **force** | `keyof QueryRequest[]` | `false` | Работает аналогично опции **force** типа `QueryRequestMeta` у запросов класса `QueryRequest` |
| **onDestroy** | `DestroyConfig<keyof Hub[] \| true>` | `false` | Вызывает методы `abort`, `reset` у запросов по переданным ключам в рамках хука жизненного цикла `OnDestroy`. Если передано значение `true`, тогда метод будет вызван у всех объектов запросов |

## Usage

Процесс использования `GqlHub` можно разделить на следующие шаги:

1. Создание строковых GraphQL запросов
2. Создание класса с запросами
3. Регистрация класса в поле `providers`
4. Инжектирование класса в компонент

Далее реализация:

**Создание строковых GraphQL запросов**

```ts name="api/graphql/index.ts"
import { GqlRequestString } from '@ngmd/utils/http/graphql';

// * GetAlbum
export type TGetAlbumsVars = {
  id: number;
};

export const GET_ALBUM: GqlRequestString<'query'> = `#graphql
  query GetAlbum($id:ID!) {
    album(id: $id) {
      id,
      title,
      user {
        id,
        username
      }
    }
  }
`;

// * Delete Album
export const DELETE_ALBUM: GqlRequestString<'mutation'> = `#graphql
  mutation DeleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
  }
`;

export type TDeleteAlbumResponse = {
  deleteAlbum: boolean;
};
```

**Создание класса с запросами**

```ts name="api/albums.gql.hub.ts"
import { ID, MutationRequest, QueryRequest, useMutation, useQuery } from '@ngmd/utils/http/graphql';

import { IAlbum } from './interfaces/album.interface';
import { DELETE_ALBUM, TDeleteAlbumResponse, GET_ALBUM } from './graphql';

export class AlbumsGqlHub {
  public getAlbum: QueryRequest<IAlbum, ID> = useQuery(GET_ALBUM);
  public deleteAlbum: MutationRequest<TDeleteAlbumResponse, ID> = useMutation(DELETE_ALBUM);
}
```

**Регистрация** 

```ts name="example.component.ts" {8}
import { provideGqlHub } from '@ngmd/utils/http/graphql';
import { AlbumsGqlHub } from './api/albums.gql.hub.ts';

@Component({
  // ...
  imports: [ChildExampleComponent],
  providers: [
    provideGqlHub(AlbumsGqlHub), 
  ],
})
export class ExampleComponent {}
```

**Инжектирование и использование**

```ts name="example.component.ts" group="example-component"
import { OnInit } from '@angular/core';
import { routeParams } from '@ngmd/utils/http';
import { useGqlHub } from '@ngmd/utils/http/graphql';
import { AlbumsGqlHub } from './api/albums.gql.hub.ts';

@Component({
  template: `
    <app-child-example />
  `,
  imports: [ChildExampleComponent]
})
export class ExampleComponent implements OnInit {
  public id: InputSignal<string> = input.required();
  protected hub$: GqlHub<AlbumsGqlHub> = useGqlHub(AlbumsGqlHub);

  ngOnInit(): void {
    this.hub$.getAlbum.send({
      variables: { id: this.id() }
    })
  }
}
```

```ts name="child-example.component.ts" group="example-component"
import { useGqlHub } from '@ngmd/utils/http/graphql';
import { AlbumsGqlHub } from './api/albums.gql.hub.ts';
import { TDeleteAlbumResponse } from './api/graphql';

@Component({/**/})
export class ChildExampleComponent {
  protected hub$: GqlHub<AlbumsGqlHub> = useGqlHub(AlbumsGqlHub);
  
  public deleteAlbum(id: string): void {
    this.hub$.deleteAlbum.send({
      variables: { id },
      connect: {
        next: (response: TDeleteAlbumResponse) => console.log('Album deleted: ', response.deleteAlbum)
      }
    });
  }
}
```