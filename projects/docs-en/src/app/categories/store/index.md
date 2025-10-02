---
keyword: StorePage
---

Imported from `@ngmd/utils/store`

[`Style guides`](/getting-started/style-guides#store)

---

## Description

Manager for centralized storage of various data with shared access within DI. Extends the state manager class with a **store** property containing the `StoreManager` manager-class, providing additional methods for common class management, and also **converts all class fields to `WritableSignal` type**, enabling reactive interaction. Recommended for storing data coming from **api**

**Interface**

```ts
type Store<T extends object> = {
  [K in keyof T]: WritableSignal<T[K]>;
  store: StoreManager<T>;
}
```

## Providers

### provideRootStore

Provider for registering the root store-class

```ts
function provideRootStore<T extends TConstructor>(StoreClass: T): Provider
```

> **NOTE**
> Used for registering stores with fields that are needed throughout the entire application 

### useRootStore

Function for injecting the root store-class
```ts
function useRootStore<T extends object>(cfg?: StoreConfig<T>): Store<T>
```

### provideStore

Provider for registering a modular store-class

```ts
function provideStore<T extends TConstructor>(StoreClass: T): Provider
```

### useStore

Function for injecting a modular store-class

```ts
function useStore<T extends object>(
  StoreClass: TConstructor<T>,
  cfg?: StoreConfig<T>,
): Store<T>
```

## StoreManager

Manager-class for managing the store-class. Created within the **store** field in the `Store` type

**Interface**

```ts
class StoreManager<T extends object>  {
  public get<K extends Array<keyof T>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] }
  public selectFirstDefinedValue(key: keyof T, mode: 'observer' | 'promise'): Observable<T[K]> | Promise<T[K]>
  public patch(partialObject: Partial<T>): void; 
  public toRx<K extends keyof T>(key: K): Observable<T[K]>;
  public reset(...keys: Array<keyof T>): void;
}
```

**Description**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `T[K] \| { [K in keyof T]: T[K] }` | Returns `untracked` values of fields by keys |
| **selectFirstDefinedValue** | `Observable<T[K]> \| Promise<T[K]>` | Returns a subscription to wait for the first **nonNullish** value |
| **patch** | `void` | Changes field values according to the passed object |
| **toRx** | `Observable<T[K]>` | Returns a subscription to the field as an `Observable` object |
| **reset** | `void` | Resets field values to default state |


## Methods

To describe how the methods work, we'll create a store-class, register it in the component, and gain access to it.

> **WARNING**
> When creating a store-class, all fields must have an *initialValue*. This is a mandatory requirement, since the class instance will be transformed into an object with fields of type `WritableSignal`. If no value is set, the key for this value is ignored and does not get into the class instance during creation. This feature is dictated by the **TypeScript** language.

```ts name="users.store.ts" group="store-example"
export class UsersStore {
  public users: IUser[] = null;
  public user: IUser = null;
}
```

```ts name="store.component.ts" group="store-example" {6,10}
import { UsersStore } from './store/users.store';
import { provideStore, Store, useStore } from '@ngmd/utils/store';

@Component({
  providers: [
    provideStore(UsersStore), // Registration
  ],
})
export class StoreComponent {
  protected store: Store<UsersStore> = useStore(UsersStore); // Access
}
```

```html name="store.component.html" group="store-example"
  <p>{%raw%}{{ store.users() | json }}{%endraw%}</p>
  <p>{%raw%}{{ store.user() | json }}{%endraw%}</p>
```

### get

Returns `untracked` values of fields by passed keys

**Interface**
```ts
  get<K extends Array<keyof T>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] }
```

Works according to the following rules:
  - If only one key is passed to the `keys` parameter, it returns the value for that key
  - If more than one key is passed to the `keys` parameter, it returns an object of key-value type

**Usage**

```ts
class StoreComponent {
  public example(): void {
    // * Single key
    const user: IUser = this.store.store.get('user');

    // Multiple keys
    const { user, users } = this.store.store.get('user', 'users');
  }
}
```

### selectFirstDefinedValue

Returns an observable value waiting for the first **nonNullish** value

**Interface**
```ts
  selectFirstDefinedValue(key: keyof T, mode: 'observer' | 'promise' = 'observer'): Observable<T[K]> | Promise<T[K]>
```

Works according to the following rules:
  - If the `mode` parameter is `observer`, it returns an observable object of type `Observable`. This is the default value
  - If the `mode` parameter is `promise`, it returns an observable object of type `Promise`

**Usage**

```ts
class StoreComponent {
  // * Observer example
  public observerExample(): void {
    const user$: Observable<IUser> = this.store.store.selectFirstDefinedValue('user');

    user$.subscribe((user: IUser) => console.log(user)); // user object

    
  }

  // * Promise example
  public async promiseExample(): void {
    const user: IUser = await this.store.store.selectFirstDefinedValue('user', 'promise');

    console.log(user); // user object
  }
}
```

### patch

Changes object values by key-value type

**Interface**
```ts
  patch(partialObject: Partial<T>): void
```

**Usage**

```ts
class StoreComponent {
  public example(): void {
    this.store.store.patch({
      users: [/*user objects*/],
      user: {/*user key-values*/},
    });
  }
}
```

### toRx

Returns a subscription to field value changes by key as an `Observable` object

**Interface**
```ts
  toRx<K extends keyof T>(key: K): Observable<T[K]>
```

**Usage**

```ts
class StoreComponent {
  public example(): void {
    const user$: Observable<IUser> = this.store.store.toRx('user')

    user$.subscribe(() => {/**/})
  }
}
```

### reset

Resets field values by passed keys to default values.

**Interface**

```ts
  reset(...keys: Array<keyof T>): void
```

Works according to the following rules:
  - If **NO** key is passed to the `keys` parameter, it resets values for all class fields
  - If one or more keys are passed to the `keys` parameter, it resets values only for the passed fields

**Usage**

```ts
class StoreComponent {
  public example(): void {
    // Reset for all fields
    this.store.store.reset()

    // Reset for one field
    this.store.store.reset('user')
  }
}
```

## Types

### StoreConfig

**Interface**

```ts
type StoreConfig<T extends object> = {
  onDestroy: {
    reset: Array<keyof T> | true
  };
};
```

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **onDestroy** | `{reset: keyof T[] \| true>}` | `false` | Calls the `reset` method on the manager-class with the passed keys. If the value `true` is passed, then the method will reset values for all fields of the store-class |

**onDestroy Usage**

```ts {4,9}
class StoreComponent {
  // * For all object fields
  protected store: Store<UsersStore> = useStore(UsersStore, {
    onDestroy: { reset: true },
  });

  // * For one field
  protected store: Store<UsersStore> = useStore(UsersStore, {
    onDestroy: { reset: ['user'] },
  });
}
```