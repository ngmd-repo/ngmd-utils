---
keyword: DBPage
---

Imported from `@ngmd/utils/db`

[`Style guides`](/getting-started/style-guides#db)

---

## Description

Manager for centralized storage and automatic typing of static data.

**Interface**

```ts
class StaticDB<T extends object> = {
  get(keys: keyof TPath, isCopy?: boolean): T[TPath];
}
```

## Providers

### provideRootDB

Provider for registering the root storage

```ts
function provideRootDB<DB extends object>(db: DB): Provider
```

> **NOTE**
> Used to register storages needed throughout the entire application

### useRootDB

Function for injecting the root storage

```ts
function useRootDB<DB extends object>(): StaticDB<DB>
```

### useDB

Function for injecting a module storage

```ts
function useDB<DB extends object>(db: DB): StaticDB<DB>
```

> **NOTE**
> Note that for using module storage, a provider function is not needed

## Methods

To describe how the methods work, let's create a storage object with static data and access it in a component via the `StaticDB` manager class.

```ts name="example.db.ts" group="example-db" {12}
export const ExampleDB = {
  card: {
    items: [1, 2, 3],
  },
  visibleMode: 'show',
  'nav-options': [ 
    { path: '/home', title: 'Home', userRole: 'Merchant' },
    { path: '/about', title: 'About', userRole: 'Merchant' },
    { path: '/admin-panel', title: 'Admin Panel', userRole: 'Admin' },
  ],
  pet: { name: 'Kuzya', type: 'Cat' }
} as const;
```

```ts name="db.component.ts" group="example-db" {6}
import { StaticDB, useDB } from '@ngmd/utils/db';
import { ExampleDB } from './db/example.db';

@Component({/**/})
export class DbComponent {
  public db: StaticDB<typeof ExampleDB> = useDB(ExampleDB);
}
```

>**NOTE**
> Note that when creating the storage object, a strict type binding is specified via `as const` at the end of the object declaration.

### get

Method for retrieving data from the storage object. All returned values are automatically typed.

**Interface**

```ts
  get(keys: keyof TPath, isCopy?: boolean): T[TPath];
```

**Parameters**

| Name | Required | Default | Description |
|----------|----------|----------|----------|
| **keys** | `true` | `null` | List of keys forming the path to the target value in the object |
| **isCopy** | `false` | `true` | Responsible for copying the target value. Relevant when modifying reference data (objects, arrays) after retrieving from storage. By default, always copies. |

**Usage**

```ts
@Component({/**/})
export class DbComponent {
  constructor() {
    const cardItems: number[] = this.db.get(['card', 'items']);
    const navOptions: NavOption[] = this.db.get(['nav-options']);
    const visibleMode: string = this.db.get(['visibleMode']);
  }
}
```

**Notes**

If you want to bind a specific value for a primitive type, you can use the `as` keyword:

- When creating a field in the storage object

```ts name="example.db.ts" group="as-object-example" {1,4}
export type TShowState = 'hide' | 'show';

export const ExampleDB = {
  visibleMode: 'show' as TShowState;
} as const;
```

```ts name="db.component.ts" group="as-object-example"
@Component({/**/})
export class DbComponent {
  constructor() {
    const modeWithType: TShowState = this.db.get(['visibleMode']); // It's defined as TShowState.
    const withoutType = this.db.get(['visibleMode']); // It's still defined as TShowState.
  }
}
```

- When retrieving a field in the component

```ts name="example.db.ts" group="as-component-example" {2}
export const ExampleDB = {
  visibleMode: 'show';
} as const;
```

```ts name="db.component.ts" group="as-component-example"
@Component({/**/})
export class DbComponent {
  constructor() {
    const modeWithType = this.db.get(['visibleMode']); // It's defined as 'show', because using "as const" in db file.
    const withoutType = this.db.get(['visibleMode']) as TShowState; // It's defined as TShowState.
  }
}
```

For reference types, you do not need to perform the manipulations described above:

```ts name="db.component.ts" group="object-example"
import { StaticDB, useDB } from '@ngmd/utils/db';
import { ExampleDB } from './db/example.db';

type TUserRole = 'Admin' | 'Merchant';
type NavOption = { path: string; title: string; userRole: TUserRole; };

type TAnimal = 'Cat' | 'Dog';
interface IAnimal { name: string, type: TAnimal };

@Component({/**/})
export class DbComponent {
  constructor() {
    const navOptions: NavOption[] = this.db.get(['nav-options']);
    const pet: IAnimal = this.db.get(['pet']);
    
    navOptions[0].userRole // It's defined as TUserRole
    pet.type // It's defined as TAnimal
  }
}
```

## Handlers

### getDataFromDB

Function that works similarly to the [`get`](/db#get) method of the `StaticDB` class. Can be used if creating a manager is not necessary.

**Interface**

```ts
function getDataFromDB<T extends object>(db: T, keys: keyof TPath, isCopy?: boolean): T[TPath];
```

**Parameters**

| Name | Required | Default | Description |
|----------|----------|----------|----------|
| **db** | `true` | `null` | Storage object |
| **keys** | `true` | `null` | List of keys forming the path to the target value in the storage |
| **isCopy** | `false` | `true` | Responsible for copying the target value. Relevant when modifying reference data (objects, arrays) after retrieving from storage. By default, always copies. |

**Usage**

```ts
import { getDataFromDB } from '@ngmd/utils/db';
import { ExampleDB } from './db/example.db';

@Component({/**/})
export class DbComponent {
  constructor() {
    const navOptions: NavOption[] = getDataFromDB(ExampleDB, ['nav-options']);
  }
}
```


