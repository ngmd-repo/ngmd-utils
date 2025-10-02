---
keyword: BrowserStoragePage
---

Imported from `@ngmd/utils/browser-storage`

---

## Description

This module provides typed and safe work with web storage objects: `localStorage` and `sessionStorage`.

## provideBrowserStorage

Provider for registering web storage tools.

**Interface**

```ts
function provideBrowserStorage(
  config?: BrowserStorageConfig | (() => BrowserStorageConfig),
): Provider[];
```

**Parameters**

| Name | Type | Default value | Description |
|----------|----------|----------| ----------|
| **config** | `BrowserStorageConfig \| (() => BrowserStorageConfig)` | `{ storage: 'localStorage', strategy: 'json' }` | Defines the configuration for the `BrowserStorage` service methods at the application level. Default values can be overridden directly when calling methods. |

> **NOTE**
> If needed, the configuration object can be provided as a factory function.

## useBrowserStorage

Function for injecting the web storage service.

**Interface**

```ts
function useBrowserStorage<T extends object>(): BrowserStorage<T>;
```

## BrowserStorage

Service for working with web storage.

**Interface**

```ts
export class BrowserStorage<Storage extends object> {
  public get<K extends keyof Storage>(keys: K | Array<K>, options?: BrowserStorageConfig): Storage[K] | { [Key in keyof Storage]: Storage[Key] };
  public set<K extends keyof Storage>(key: K, value: Storage[K], options?: BrowserStorageConfig): void;
  public patch(obj: Partial<Storage>, options?: BrowserStorageConfig): void;
  public remove<K extends keyof Storage>(
    key: K | Array<keyof Storage>,
    storage?: BrowserStorageType
  ): void;
  public clear(storage?: BrowserStorageType): void;
  public keys(storage?: BrowserStorageType): Array<keyof Storage>;
  public isEnabledBrowserStorage(storage?: BrowserStorageType): boolean;
}
```

**Description**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `Storage[K] \| { [Key in keyof Storage]: Storage[Key] }` | Returns values by keys. |
| **set** | `void` | Sets the value by key. |
| **patch** | `void` | Sets values by the provided object. |
| **remove** | `void` | Removes values by the provided keys. |
| **clear** | `void` | Clears the storage. |
| **keys** | `Array<keyof Storage>` | Returns all storage keys. |
| **isEnabledBrowserStorage** | `boolean` | Returns whether web storage is available in the browser. |

> **WARNING**
> Configuration parameters `BrowserStorageConfig` used in methods override the default behavior set at the application level in the **config** parameter of the `provideBrowserStorage` provider. By default, the `strategy` field is set to `json`, meaning all write/read methods (`get`, `set`, `patch`) in the service will use `JSON.stringify`/`JSON.parse` respectively. This allows you to preserve the original data type when working with storage. It is not recommended to override this strategy.

> **ALERT**
> If the user has blocked web storage usage via browser settings, the `BrowserStorage` service will create a stub object for reading/writing data. This prevents breaking the main logic of your applications in such cases. However, keep in mind that if the page is reloaded, closed, and reopened, the stub object will be recreated each time. If storing data in web storage is critical for your logic, you can use the check method or function (`isEnabledBrowserStorage`) to determine storage availability before reading/writing.

**Methods**

To describe how the service methods work, let's create a storage interface:

```ts name="./src/app/browser-storage/index.ts"
export interface ILocalStorage {
  role: TRole;
  mode: TMode;
  status: EnAppStatus;
}

export type TRole = 'Admin' | 'User';
export type TMode = 'Read' | 'Write';
export enum EnAppStatus {
  BLOCK,
  ENABLED,
}
```

Register the provider for working with storage:

```ts name="./src/app/app.config.ts" {5}
import { provideBrowserStorage } from '@ngmd/utils/browser-storage';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideBrowserStorage(),
    // ...
  ],
};
```

Inject the storage service into a component:

```ts name="browser-storage.component.ts" {6}
import { BrowserStorage, useBrowserStorage } from '@ngmd/utils/browser-storage';
import { ILocalStorage } from './browser-storage';

@Component({/*...*/})
export class BrowserStorageComponent {
  private browserStorage: BrowserStorage<ILocalStorage> = useBrowserStorage();
}
```

### get

Returns values from web storage by the provided keys.

**Interface**

```ts
get(keys: keyof Storage | Array<keyof Storage>, options?: BrowserStorageConfig): Storage[Key] | { [Key in keyof Storage]: Storage[Key] };
```

Works as follows:
  - If a single key is provided, returns the value for that key.
  - If multiple keys are provided, returns an object of key-value pairs.

**Usage**

```ts
import { TMode } from './browser-storage';

@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    // * Single key
    const mode: TMode = this.browserStorage.get('mode');

    // Multiple keys
    const { mode, role } = this.browserStorage.get(['mode', 'role']);
  }
}
```

### set

Sets the value of a field in web storage by the provided key.

**Interface**

```ts
set(key: keyof Storage, value: Storage[Key], options?: BrowserStorageConfig): void;
```

**Usage**

```ts
import { TMode } from './browser-storage';

@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    this.browserStorage.set('mode', 'Write');
  }
}
```

### patch

Sets values in web storage by key-value pairs.

**Interface**

```ts
patch(obj: Partial<Storage>, options?: BrowserStorageConfig): void;
```

**Usage**

```ts
import { EnAppStatus, TRole } from './browser-storage';

@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    this.browserStorage.patch({
      status: EnAppStatus.ENABLED,
      role: 'Admin'
    });
  }
}
```

### remove

Removes values from web storage by key-value pairs.

**Interface**

```ts
remove(key: keyof Storage | Array<keyof Storage>, storage?: BrowserStorageType): void;
```

**Usage**

```ts
import { EnAppStatus, TRole } from './browser-storage';

@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    // * Single key
    this.browserStorage.remove('mode');

    // Multiple keys
    this.browserStorage.remove(['mode', 'role']);
  }
}
```

### clear

Removes all values from web storage.

**Interface**

```ts
clear(storage?: BrowserStorageType): void;
```

**Usage**

```ts
@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    this.browserStorage.clear(); // Storage is fully cleared
  }
}
```

### keys

Returns all keys from web storage as an array.

**Interface**

```ts
keys(storageType: BrowserStorageType): keyof Storage[];
```

**Usage**

```ts
import { ILocalStorage } from './browser-storage';

@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    const storageKeys: Array<keyof ILocalStorage> = this.browserStorage.keys();

    console.log(storageKeys); // ['mode', 'role', 'status']
  }
}
```

### isEnabledBrowserStorage

Returns the availability status of storage in the browser.

**Interface**

```ts
isEnabledBrowserStorage(storage: BrowserStorageType = this.config.storage): boolean;
```

**Usage**

```ts
@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    const isEnabledBrowserStorage: boolean = this.browserStorage.isEnabledBrowserStorage();

    console.log(isEnabledBrowserStorage); // true | false
    
  }
}
```

## Types

List of types used for working with storage tools.

### BrowserStorageType

Type of storage to work with.

**Interface**

```ts
type BrowserStorageType = 'localStorage' | 'sessionStorage';
```

**Description**

| Value | Description |
|----------|----------|
| `localStorage` | Work with `localStorage` |
| `sessionStorage` | Work with `sessionStorage` |

### BrowserStorageStrategy

Strategy for working with write/read methods in web storage.

**Interface**

```ts
type BrowserStorageStrategy = 'default' | 'json';
```

**Description**

| Value | Description |
|----------|----------|
| `default` | No modifications are made when writing/reading values. |
| `json` | 1. When writing to storage, the value is converted using `JSON.stringify(value)` <br/> 2. When reading from storage, the returned value is converted using `JSON.parse(value)` |


### BrowserStorageConfig

Configuration for working with storage.

**Interface**

```ts
type BrowserStorageConfig = {
  storage?: BrowserStorageType;
  strategy?: BrowserStorageStrategy;
};
```

**Description**

| Name | Type | Description |
|----------|----------|----------|
| **storage** | `BrowserStorageType` | Type of storage to work with |
| **strategy** | `BrowserStorageStrategy` | Strategy for working with write/read methods in web storage |

## Handlers

### isEnabledBrowserStorage

Global function that returns a boolean value indicating the availability of web storage in the browser.

**Interface**

```ts
function isEnabledBrowserStorage(storage: BrowserStorageType = 'localStorage'): boolean;
```


