---
keyword: StorePage
---

Импортируется из `@ngmd/utils/store`

[`Style guides`](/getting-started/style-guides#store)

---

## Описание

Менеджер для централизованного хранения различных данных с общим доступом в рамках DI. Расширяет класс состояния менеджер-свойством **store** с менеджер-классом `StoreManager`, предоставляя дополнительные методы общего управления классом, а так же **переводит все поля класса в тип `WritableSignal`**, обеспечивая возможность реактивного взаимодействия. Рекомендуется использовать для хранения данных, приходящих с **api**

**Интерфейс**

```ts
type Store<T extends object> = {
  [K in keyof T]: WritableSignal<T[K]>;
  store: StoreManager<T>;
}
```

## Providers

### provideRootStore

Провайдер для регистрации корневого store-класса

```ts
function provideRootStore<T extends TConstructor>(StoreClass: T): Provider
```

> **NOTE**
> Используется для регистрации хранилищ с полями, которые нужны в рамках всего приложения 

### useRootStore

Функция для инжектирования корневого store-класса
```ts
function useRootStore<T extends object>(cfg?: StoreConfig<T>): Store<T>
```

### provideStore

Провайдер для регистрации модульного store-класса

```ts
function provideStore<T extends TConstructor>(StoreClass: T): Provider
```

### useStore

Функция для инжектирования модульного store-класса

```ts
function useStore<T extends object>(
  StoreClass: TConstructor<T>,
  cfg?: StoreConfig<T>,
): Store<T>
```

## StoreManager

Менеджер-класс для управления store-классом. Создается в рамках поля **store** в типе `Store`

**Интерфейс**

```ts
class StoreManager<T extends object>  {
  public get<K extends Array<keyof T>>(...keys: K): K['length'] extends 1 ? T[K[0]] : { [Key in K[number]]: T[Key] }
  public selectFirstDefinedValue(key: keyof T, mode: 'observer' | 'promise'): Observable<T[K]> | Promise<T[K]>
  public patch(partialObject: Partial<T>): void; 
  public toRx<K extends keyof T>(key: K): Observable<T[K]>;
  public reset(...keys: Array<keyof T>): void;
}
```

**Описание**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `T[K] \| { [K in keyof T]: T[K] }` | Возвращает `untracked` значения полей по ключам |
| **selectFirstDefinedValue** | `Observable<T[K]> \| Promise<T[K]>` | Возвращает подписку на ожидание первого **nonNullish** значения |
| **patch** | `void` | Изменяет значения полей по переданному объекту |
| **toRx** | `Observable<T[K]>` | Возвращает подписку на поле в виде `Observable` объекта |
| **reset** | `void` | Сбрасывает значения полей до состояния по-умолчанию |


## Методы

Для описания работы методов создадим store-класс, зарегистрируем его в компоненте и получим к нему доступ. 

> **WARNING**
> При создании store-класса все поля должны иметь *initialValue*. Это обязательное требование, т.к. экземпляр класса будет трансформирован в объект с полями типа `WritableSignal`. Если значение не задано, то ключ для этого значения игнорируется и не попадает в экземпляр класса при создании. Эта особенность диктуется языком **TypeScript**.

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
    provideStore(UsersStore), // Регистрация
  ],
})
export class StoreComponent {
  protected store: Store<UsersStore> = useStore(UsersStore); // Доступ
}
```

```html name="store.component.html" group="store-example"
  <p>{%raw%}{{ store.users() | json }}{%endraw%}</p>
  <p>{%raw%}{{ store.user() | json }}{%endraw%}</p>
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
class StoreComponent {
  public example(): void {
    // * Один ключ
    const user: IUser = this.store.store.get('user');

    // Несколько ключей
    const { user, users } = this.store.store.get('user', 'users');
  }
}
```

### selectFirstDefinedValue

Возвращает наблюдаемое значение, ожидающее первого **nonNullish** значения

**Интерфейс**
```ts
  selectFirstDefinedValue(key: keyof T, mode: 'observer' | 'promise' = 'observer'): Observable<T[K]> | Promise<T[K]>
```

Работает в соответствии со следующими правилами:
  - Если параметр `mode` равен `observer`, то возвращает наблюдаемый объект типа `Observable`. Является значением по-умолчанию
  - Если параметр `mode` равен `promise`, то возвращает наблюдаемый объект типа `Promise`

**Использование**

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

Изменяет значения объекта по типу ключ-значение

**Интерфейс**
```ts
  patch(partialObject: Partial<T>): void
```

**Использование**

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

Возвращает подписку на изменение значения поля по ключу в виде объекта `Observable`

**Интерфейс**
```ts
  toRx<K extends keyof T>(key: K): Observable<T[K]>
```

**Использование**

```ts
class StoreComponent {
  public example(): void {
    const user$: Observable<IUser> = this.store.store.toRx('user')

    user$.subscribe(() => {/**/})
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
class StoreComponent {
  public example(): void {
    // Сбросить для всех полей
    this.store.store.reset()

    // Сбросить для одного поля
    this.store.store.reset('user')
  }
}
```

## Types

### StoreConfig

**Интерфейс**

```ts
type StoreConfig<T extends object> = {
  onDestroy: {
    reset: Array<keyof T> | true
  };
};
```

**Описание**

| Name | Type | Required | Description |
|----------|----------|----------|----------|
| **onDestroy** | `{reset: keyof T[] \| true>}` | `false` | Вызывает метод `reset` у класса-менеджера по переданными ключами. Если передано значение `true`, тогда метод сбросит значения для все полей store-класса |

**Использование onDestroy**

```ts {4,9}
class StoreComponent {
  // * Для всех полей объекта
  protected store: Store<UsersStore> = useStore(UsersStore, {
    onDestroy: { reset: true },
  });

  // * Для одного поля
  protected store: Store<UsersStore> = useStore(UsersStore, {
    onDestroy: { reset: ['user'] },
  });
}
```