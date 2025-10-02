---
keyword: ActionsPage
---

Imported from `@ngmd/utils/actions`

[`Style guides`](/getting-started/style-guides#actions)

---

## Description

Event manager that enables communication between application entities via subscriptions and event list registration through *DI*.

## Providers

### provideRootActionsChannel

Provider for registering the root event list

```ts
function provideRootActionsChannel(): Provider
```

> **NOTE**
> Used to register events needed throughout the entire application

### useRootActionsChannel

Function for injecting the root event list

```ts
function useRootActionsChannel<T extends ChannelAction>(): ActionsChannel<T>
```

### provideActionsChannel

Provider for registering a module event list

```ts
function provideActionsChannel<T extends ChannelAction>(
  CHANNEL_TOKEN: InjectionToken<T>,
): Provider
```

### useActionsChannel

Function for injecting a module event list

```ts
function useActionsChannel<T extends ChannelAction>(
  CHANNEL_TOKEN: InjectionToken<T>,
): ActionsChannel<T> 
```

## Functions

### ActionsChannelToken

Function for creating an access token for module event lists

```ts
function ActionsChannelToken<
  Actions extends ChannelAction,
>(TOKEN_NAME: Uppercase<string>): InjectionToken<Actions>
```

## Models

### ChannelAction

Class for creating an event. Used in the [`action`](/actions/action) method.

```ts
class ChannelAction<const Type extends string, const Payload = null> {
  constructor(
    public type: Type,
    public payload?: Payload,
  ) {}
}
```

## ActionsChannel

Manager class for handling the event list

**Interface**

```ts
class ActionsChannel<Actions extends ChannelAction> = {
  public listen<T extends Actions['type']>(
    ...types: T[]
  ): Observable<{type: T['type'], payload: T['payload']}>;

  public action<T extends Actions>(type: T['type'], payload?: T['payload']): void
  public actions(...actions: Actions[]): void
}
```

**Description**

| Name | ReturnType | Description |
|----------|----------|----------|
| **listen** | `Observable<ChannelAction>` | Returns a subscription for receiving events |
| **action** | `void` | Sends a single event to subscribers |
| **actions** | `void` | Sends a queue of events to subscribers |


## Methods

To describe how the methods work, let's create a module event list, register it in a component, and access it.

To create an event list, follow these steps:

1. Create a **union type** for your module's event list using the `ChannelAction` class.
2. Create an access token for your module's events using the `ActionsChannelToken` function.

```ts name="./actions/index.ts" group="actions-example" {3-7}
import { ActionsChannelToken, ChannelAction } from '@ngmd/utils/actions';

export type TModalActions =
  | ChannelAction<'hide-modal'>
  | ChannelAction<'show-modal'>
  | ChannelAction<'toggle-modal', 'hide' | 'show'>; // Event list type (1)
export const MODAL_ACTIONS = ActionsChannelToken<TModalActions>('MODAL_ACTIONS'); // Access token (2)
```

Register and inject the event list by its access token:

```ts name="store.component.ts" {10,14}
import {
  ActionsChannel,
  ChannelAction,
  provideActionsChannel,
  useActionsChannel,
} from '@ngmd/utils/actions';

@Component({
  providers: [
    provideActionsChannel(MODAL_ACTIONS), // Registration
  ]
})
export class ActionsComponent {
  private actions$: ActionsChannel<TModalActions> = useActionsChannel(MODAL_ACTIONS); // Injection
}
```

### listen

Returns a subscription as a typed `Observable` object for receiving events

**Interface**
```ts
  listen<T extends Actions['type']>(
    ...types: T[]
  ): Observable<{type: T['type'], payload: T['payload']}>;
```

Works according to the following rules:
  - If no keys are passed to the `types` parameter, all incoming events are processed
  - If one or more keys are passed to the `types` parameter, only events matching those keys are processed

**Usage**

```ts
class ExampleComponent {
  public listenAllActions(): void {
    this.actions$.listen().subscribe(action => {
      switch (action.type) {
        case 'hide-modal': {
          console.log(action.type); /*hide-modal*/
          break;
        }
        case 'show-modal': {
          console.log(action.type, action.payload /*boolean*/);
          break;
        }
        case 'toggle-modal': {
          console.log(action.type, action.payload /*'hide' | 'show'*/);
          break;
        }
      }
    });
  }
  // or
  public listenOnlyToggleAction(): void {
    this.actions$.listen('toggle-modal').subscribe(action => {
      console.log(
       action.type, /*toggle-modal*/
       action.payload /*'hide' | 'show'*/
      );
    });
  }
}
```

### action

Sends a single event to subscribers

**Interface**
```ts
  action<T extends ChannelAction>(type: T['type'], payload?: T['payload']): void
```

**Usage**

```ts
class ExampleComponent {
  protected toggle(): void {
    this.actions$.action('toggle-modal', 'show');
  }
}
```

### actions

Sends a queue of events to subscribers

**Interface**
```ts
  actions<T extends ChannelAction[]>(...actions: ChannelAction[]): void
```

**Usage**

```ts
class ExampleComponent {
  protected multipleActions(): void {
    this.actions$.actions(
      new ChannelAction('toggle-modal', 'show'),
      new ChannelAction('hide-modal'),
    );
  }
}
```


## Types

### ActionByType

Extracts events from the list by type

**Interface**

```ts
type ActionByType<
  Actions extends ChannelAction<string, unknown>,
  T extends Actions['type'],
> = Extract<Actions, { type: T }>;
```

**Usage**

```ts
type TModalActions =
  | ChannelAction<'hide-modal'>
  | ChannelAction<'show-modal'>
  | ChannelAction<'toggle-modal', 'hide' | 'show'>;

export type ShowHideActions = ActionByType<TModalActions, 'show-modal' | 'hide-modal'>;

/*
ShowHideActions = ChannelAction<'hide-modal'> | ChannelAction<'show-modal'>
*/
```

### ActionPayload

Extracts the **payload** from the event list by type

**Interface**

```ts
type ActionPayload<
  Actions extends ChannelAction<string, unknown>,
  T extends Actions['type'],
> = Extract<Actions, { type: T }>['payload'];
```

**Usage**

```ts
type TModalActions =
  | ChannelAction<'hide-modal'>
  | ChannelAction<'show-modal'>
  | ChannelAction<'toggle-modal', 'hide' | 'show'>;

export type TogglePayload = ActionPayload<TModalActions, 'toggle-modal'>;

/*
TogglePayload = 'hide' | 'show'
*/
```