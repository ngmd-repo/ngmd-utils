---
keyword: ProvideGqlHubPage
---

Imported from `@ngmd/utils/http/graphql`

---

## Description

Manager for combining and centralized storage of requests with shared access within DI. Extends the hub class with a manager property **hub** containing the `GqlHubManager` manager class, providing additional common management methods for the class.

**Interface**

```ts
type GqlHub<T extends TGqlHub<T>> = T & {
  hub: GqlHubManager<T>;
};
```

## Providers

### provideGqlHub

Provider for registering a modular hub class

```ts
function provideGqlHub<T extends TGqlHub<T>>(Hub: TConstructor<T>): Provider;
```

### useGqlHub

Function for injecting a modular hub class

```ts
function useGqlHub<T extends TGqlHub<T>>(
  Hub: TConstructor<T>,
  config?: GqlHubConfig<T>,
): GqlHub<T>;
```


## GqlHubManager

Manager class for managing the hub class. Created within the **hub** field in the `GqlHub` type

Works similarly to `ApiHub`

**Interface**

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
> The operation of all class methods is identical to `ApiHub`

> **WARNING**
> If the **keys** parameter is not passed, the call will be applied to all request objects

## Types

### TGqlHub

Type that the hub class must conform to

**Interface**

```ts
type GqlHub<T extends TGqlHub<T>> = T & {
  hub: GqlHubManager<T>;
};
```

### GqlHubConfig

Configuration object used in the `useGqlHub` injector function

**Interface**

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

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **cache** | `keyof QueryRequest[]` | `false` | On component initialization, calls the **cache** method on `QueryRequest` class requests |
| **force** | `keyof QueryRequest[]` | `false` | Works similarly to the **force** option of `QueryRequestMeta` type on `QueryRequest` class requests |
| **onDestroy** | `DestroyConfig<keyof Hub[] \| true>` | `false` | Calls `abort`, `reset` methods on requests by passed keys within the `OnDestroy` lifecycle hook. If `true` is passed, the method will be called on all request objects |

## Usage

The process of using `ApiHub` can be divided into the following steps:

1. Creating string GraphQL queries
2. Creating a class with requests
3. Registering the class in the `providers` field
4. Injecting the class into a component

The implementation follows:

**Creating string GraphQL queries**

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

**Creating a class with requests**

```ts name="api/albums.gql.hub.ts"
import { ID, MutationRequest, QueryRequest, useMutation, useQuery } from '@ngmd/utils/http/graphql';

import { IAlbum } from './interfaces/album.interface';
import { DELETE_ALBUM, TDeleteAlbumResponse, GET_ALBUM } from './graphql';

export class AlbumsGqlHub {
  public getAlbum: QueryRequest<IAlbum, ID> = useQuery(GET_ALBUM);
  public deleteAlbum: MutationRequest<TDeleteAlbumResponse, ID> = useMutation(DELETE_ALBUM);
}
```

**Registration** 

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

**Injection and usage**

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