---
keyword: StatePage
---

Imported from `@ngmd/utils/state`

[`Style guides`](/getting-started/style-guides#state)

---

## Description

Manager for centralized storage of various component and service states with shared access within DI. Extends the state class with a manager property **state** with the `StateManager` manager class, providing additional methods for general class management, and also **converts all class fields to `WritableSignal` type**, enabling reactive interaction.

**Interface**

```ts
type State<T extends object> = {
  [K in keyof T]: WritableSignal<T[K]>;
  state: StateManager<T>;
}
```

## Providers

### provideRootState

Provider for registering root state class

```ts
function provideRootState<T extends object>(StateClass: TConstructor<T>): Provider
```

> **NOTE**
> Used for registering states with fields that are needed throughout the entire application

### useRootState

Function for injecting root state class

```ts
function useRootState<T extends object>(cfg?: StateConfig<T>): State<T>
```

### provideState

Provider for registering modular state class

```ts
function provideState<T extends object>(StateClass: TConstructor<T>): Provider
```

### useState

Function for injecting modular state class

```ts
function useState<T extends object>(
  StateClass: TConstructor<T>,
  cfg?: StateConfig<T>,
): State<T>
```

## StateManager

Manager class for controlling state class. Created within the **state** field in the `State` type

**Interface**

```ts
class StateManager<T extends object>  {
  public get<K extends Array<keyof T>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] }
  public patch(partialObject: Partial<T>): void; 
  public toRx<K extends keyof T>(key: K): Observable<T[K]>;
  public reset(...keys: Array<keyof T>): void;
}
```

**Description**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `T[K] \| { [K in keyof T]: T[K] }` | Returns `untracked` field values by keys |
| **patch** | `void` | Changes field values by the passed object |
| **toRx** | `Observable<T[K]>` | Returns subscription to field as `Observable` object |
| **reset** | `void` | Resets field values to default state |


## Methods

To describe how methods work, let's create a state class, register it in a component, and get access to it.

> **WARNING**
> When creating a state class, all fields must have an *initialValue*. This is a mandatory requirement because the class instance will be transformed into an object with fields of type `WritableSignal`. If no value is set, the key for that value is ignored and doesn't get into the class instance during creation. This feature is dictated by the **TypeScript** language.

```ts name="users.state.ts" group="state-example"
export class UsersState {
  public editModalVisibleState: TShowState = 'hide';
  public isUserActive: boolean = false;
}
```

```ts name="state.component.ts" group="state-example" {6,10}
import { UsersState } from './state/users.state';
import { provideState, State, useState } from '@ngmd/utils/state';

@Component({
  providers: [
    provideState(UsersState), // Registration
  ],
})
export class StateComponent {
  protected state: State<UsersState> = useState(UsersState); // Access
}
```

```html name="state.component.html" group="state-example"
  <p>{%raw%}{{ state.editModalVisibleState() }}{%endraw%}</p>
  <p>{%raw%}{{ state.isUserActive() }}{%endraw%}</p>
```

### get

Returns `untracked` field values by passed keys

**Interface**
```ts
  get<K extends Array<keyof T>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] }
```

Works according to the following rules:
  - If only one key is passed to the `keys` parameter, returns the value for that key
  - If more than one key is passed to the `keys` parameter, returns a key-value object

**Usage**

```ts
class StateComponent {
  public example(): void {
    // * Single key
    const isActive: boolean = this.state.state.get('isUserActive');

    // Multiple keys
    const { editModalVisibleState, isUserActive } = this.state.state.get(
      'editModalVisibleState',
      'isUserActive',
    );
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
class StateComponent {
  public example(): void {
    this.state.state.patch({
      editModalVisibleState: 'show',
      isUserActive: true,
    });
  }
}
```

### toRx

Returns subscription to field value changes by key as an `Observable` object

**Interface**
```ts
  toRx<K extends keyof T>(key: K): Observable<T[K]>
```

**Usage**

```ts
class StateComponent {
  public example(): void {
    const isUserActive$: Observable<boolean> = this.state.state.toRx('isUserActive');

    isUserActive$.subscribe(() => {/**/})
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
  - If **NO** key is passed to the `keys` parameter, resets values for all class fields
  - If one or more keys are passed to the `keys` parameter, resets values only for the passed fields

**Usage**

```ts
class StateComponent {
  public example(): void {
    // Reset for all fields
    this.state.state.reset()

    // Reset for one field
    this.state.state.reset('editModalVisibleState')
  }
}
```

## Types

### StateConfig

**Interface**

```ts
type StateConfig<T extends object> = {
  onDestroy: {
    reset: Array<keyof T> | true
  };
};
```

**Description**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **onDestroy** | `{reset: keyof T[] \| true>}` | `false` | Calls the `reset` method on the manager class with the passed keys. If `true` is passed, the method will reset values for all state class fields |

**onDestroy Usage**

```ts {4,9}
class StateComponent {
  // * For all object fields
  protected state: State<UsersState> = useState(UsersState, {
    onDestroy: { reset: true },
  });

  // * For one field
  protected state: State<UsersState> = useState(UsersState, {
    onDestroy: { reset: ['editModalVisibleState'] },
  });
}
```