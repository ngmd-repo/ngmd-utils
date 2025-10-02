---
keyword: ActionsPage
---

Импортируется из `@ngmd/utils/actions`

[`Style guides`](/getting-started/style-guides#actions)

---

## Описание

Менеджер событий, обеспечивающий связь между сущностями приложения посредством подписок и регистрацией списков событий через *DI*

## Providers

### provideRootActionsChannel

Провайдер для регистрации корневого списка событий

```ts
function provideRootActionsChannel(): Provider
```

> **NOTE**
> Используется для регистрации событий, которые нужны в рамках всего приложения 

### useRootActionsChannel

Функция для инжектирования корневого списка событий

```ts
function useRootActionsChannel<T extends ChannelAction>(): ActionsChannel<T>
```

### provideActionsChannel

Провайдер для регистрации модульного списка событий

```ts
function provideActionsChannel<T extends ChannelAction>(
  CHANNEL_TOKEN: InjectionToken<T>,
): Provider
```

### useActionsChannel

Функция для инжектирования модульного списка событий

```ts
function useActionsChannel<T extends ChannelAction>(
  CHANNEL_TOKEN: InjectionToken<T>,
): ActionsChannel<T> 
```

## Functions

### ActionsChannelToken

Функция создания токена доступа для модульных списков событий

```ts
function ActionsChannelToken<
  Actions extends ChannelAction,
>(TOKEN_NAME: Uppercase<string>): InjectionToken<Actions>
```

## Models

### ChannelAction

Класс для создания события. Используется в рамках метода [`action`](/actions/action)

```ts
class ChannelAction<const Type extends string, const Payload = null> {
  constructor(
    public type: Type,
    public payload?: Payload,
  ) {}
}
```

## ActionsChannel

Менеджер-класс для управления списком событий

**Интерфейс**

```ts
class ActionsChannel<Actions extends ChannelAction> = {
  public listen<T extends Actions['type']>(
    ...types: T[]
  ): Observable<{type: T['type'], payload: T['payload']}>;

  public action<T extends Actions>(type: T['type'], payload?: T['payload']): void
  public actions(...actions: Actions[]): void
}
```

**Описание**

| Name | ReturnType | Description |
|----------|----------|----------|
| **listen** | `Observable<ChannelAction>` | Возвращает подписку на получение событий |
| **action** | `void` | Отправляет одно событие подписчикам |
| **actions** | `void` | Отправляет очередь событий подписчикам |


## Методы

Для описания работы методов создадим модульный список событий, зарегистрируем его в компоненте и получим к нему доступ. 

Для создания списка событий требуются следующие действия:

1. Создать **union-тип** списка событий вашего модуля при помощи класса `ChannelAction`
2. Создать токен доступа к событиям вашего модуля при помощи функции `ActionsChannelToken`

```ts name="./actions/index.ts" group="actions-example" {3-7}
import { ActionsChannelToken, ChannelAction } from '@ngmd/utils/actions';

export type TModalActions =
  | ChannelAction<'hide-modal'>
  | ChannelAction<'show-modal'>
  | ChannelAction<'toggle-modal', 'hide' | 'show'>; // Тип списка событий (1)
export const MODAL_ACTIONS = ActionsChannelToken<TModalActions>('MODAL_ACTIONS'); // Токен доступа (2)
```

Регистрация и инжектирование списка событий происходят по токену доступа: 

```ts name="store.component.ts" {10,14}
import {
  ActionsChannel,
  ChannelAction,
  provideActionsChannel,
  useActionsChannel,
} from '@ngmd/utils/actions';

@Component({
  providers: [
    provideActionsChannel(MODAL_ACTIONS), // Регистрация
  ]
})
export class ActionsComponent {
  private actions$: ActionsChannel<TModalActions> = useActionsChannel(MODAL_ACTIONS); // Инжектирование
}
```

### listen

Возвращает подписку в виде типизированного `Observable` объекта на получение событий

**Интерфейс**
```ts
  listen<T extends Actions['type']>(
    ...types: T[]
  ): Observable<{type: T['type'], payload: T['payload']}>;
```

Работает в соответствии со следующими правилами:
  - Если в параметр `types` не передан ни один ключ, то обрабатываются все входящие события
  - Если в параметр `types` передан один и более ключей, то обрабатываются только события, соответствующие ключам

**Использование**

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

Отправляет одно событие подписчикам

**Интерфейс**
```ts
  action<T extends ChannelAction>(type: T['type'], payload?: T['payload']): void
```

**Использование**

```ts
class ExampleComponent {
  protected toggle(): void {
    this.actions$.action('toggle-modal', 'show');
  }
}
```

### actions

Отправляет очередь событий подписчикам 

**Интерфейс**
```ts
  actions<T extends ChannelAction[]>(...actions: ChannelAction[]): void
```

**Использование**

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

Извлекает события из списка по типу

**Интерфейс**

```ts
type ActionByType<
  Actions extends ChannelAction<string, unknown>,
  T extends Actions['type'],
> = Extract<Actions, { type: T }>;
```

**Использование**

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

Извлекает **payload** из списка событий по типу

**Интерфейс**

```ts
type ActionPayload<
  Actions extends ChannelAction<string, unknown>,
  T extends Actions['type'],
> = Extract<Actions, { type: T }>['payload'];
```

**Использование**

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