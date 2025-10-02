---
keyword: StatePage
---

Импортируется из `@ngmd/utils/state`

[`Style guides`](/getting-started/style-guides#state)

---

## Описание

Менеджер для централизованного хранения различных состояний компонентов и сервисов с общим доступом в рамках DI. Расширяет класс состояния менеджер-свойством **state** с менеджер-классом `StateManager`, предоставляя дополнительные методы общего управления классом, а так же **переводит все поля класса в тип `WritableSignal`**, обеспечивая возможность реактивного взаимодействия.

**Интерфейс**

```ts
type State<T extends object> = {
  [K in keyof T]: WritableSignal<T[K]>;
  state: StateManager<T>;
}
```

## Providers

### provideRootState

Провайдер для регистрации корневого state-класса

```ts
function provideRootState<T extends object>(StateClass: TConstructor<T>): Provider
```

> **NOTE**
> Используется для регистрации состояний с полями, которые нужны в рамках всего приложения 

### useRootState

Функция для инжектирования корневого state-класса

```ts
function useRootState<T extends object>(cfg?: StateConfig<T>): State<T>
```

### provideState

Провайдер для регистрации модульного state-класса

```ts
function provideState<T extends object>(StateClass: TConstructor<T>): Provider
```

### useState

Функция для инжектирования модульного state-класса

```ts
function useState<T extends object>(
  StateClass: TConstructor<T>,
  cfg?: StateConfig<T>,
): State<T>
```

## StateManager

Менеджер-класс для управления state-классом. Создается в рамках поля **state** в типе `State`

**Интерфейс**

```ts
class StateManager<T extends object>  {
  public get<K extends Array<keyof T>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] }
  public patch(partialObject: Partial<T>): void; 
  public toRx<K extends keyof T>(key: K): Observable<T[K]>;
  public reset(...keys: Array<keyof T>): void;
}
```

**Описание**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `T[K] \| { [K in keyof T]: T[K] }` | Возвращает `untracked` значения полей по ключам |
| **patch** | `void` | Изменяет значения полей по переданному объекту |
| **toRx** | `Observable<T[K]>` | Возвращает подписку на поле в виде `Observable` объекта |
| **reset** | `void` | Сбрасывает значения полей до состояния по-умолчанию |


## Методы

Для описания работы методов создадим state-класс, зарегистрируем его в компоненте и получим к нему доступ. 

> **WARNING**
> При создании state-класса все поля должны иметь *initialValue*. Это обязательное требование, т.к. экземпляр класса будет трансформирован в объект с полями типа `WritableSignal`. Если значение не задано, то ключ для этого значения игнорируется и не попадает в экземпляр класса при создании. Эта особенность диктуется языком **TypeScript**.

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
    provideState(UsersState), // Регистрация
  ],
})
export class StateComponent {
  protected state: State<UsersState> = useState(UsersState); // Доступ
}
```

```html name="state.component.html" group="state-example"
  <p>{%raw%}{{ state.editModalVisibleState() }}{%endraw%}</p>
  <p>{%raw%}{{ state.isUserActive() }}{%endraw%}</p>
```

### get

Возвращает `untracked` значения полей по переданным ключам

**Интерфейс**
```ts
  get<K extends Array<keyof T>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] }
```

Работает в соответствии со следующими правилами:
  - Если в параметр `keys` передан только один ключ, то возвращает значение по этому ключу
  - Если в параметр `keys` передано более одного ключа, то возвращает объект типа ключ-значение

**Использование**

```ts
class StateComponent {
  public example(): void {
    // * Один ключ
    const isActive: boolean = this.state.state.get('isUserActive');

    // Несколько ключей
    const { editModalVisibleState, isUserActive } = this.state.state.get(
      'editModalVisibleState',
      'isUserActive',
    );
  }
}
```

### patch

Изменяет значения объекта по типу ключ-значение

**Интерфейс**
```ts
  patch(partialObject: Partial<T>): void
```

**Использование**

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

Возвращает подписку на изменение значения поля по ключу в виде объекта `Observable`

**Интерфейс**
```ts
  toRx<K extends keyof T>(key: K): Observable<T[K]>
```

**Использование**

```ts
class StateComponent {
  public example(): void {
    const isUserActive$: Observable<boolean> = this.state.state.toRx('isUserActive');

    isUserActive$.subscribe(() => {/**/})
  }
}
```

### reset

Сбрасывает значения полей по переданным ключам до значений по-умолчанию.

**Интерфейс**

```ts
  reset(...keys: Array<keyof T>): void
```

Работает в соответствии со следующими правилами:
  - Если в параметр `keys` **НЕ** передан ни один ключ, то сбрасывает значения для всех полей класса
  - Если в параметр `keys` передан один и более ключей, то сбрасывает значения только для переданных полей

**Использование**

```ts
class StateComponent {
  public example(): void {
    // Сбросить для всех полей
    this.state.state.reset()

    // Сбросить для одного поля
    this.state.state.reset('editModalVisibleState')
  }
}
```

## Types

### StateConfig

**Интерфейс**

```ts
type StateConfig<T extends object> = {
  onDestroy: {
    reset: Array<keyof T> | true
  };
};
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **onDestroy** | `{reset: keyof T[] \| true>}` | `false` | Вызывает метод `reset` у класса-менеджера по переданными ключами. Если передано значение `true`, тогда метод сбросит значения для всех полей state-класса |

**Использование onDestroy**

```ts {4,9}
class StateComponent {
  // * Для всех полей объекта
  protected state: State<UsersState> = useState(UsersState, {
    onDestroy: { reset: true },
  });

  // * Для одного поля
  protected state: State<UsersState> = useState(UsersState, {
    onDestroy: { reset: ['editModalVisibleState'] },
  });
}
```