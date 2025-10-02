---
keyword: BrowserStoragePage
---

Импортируется из `@ngmd/utils/browser-storage`

---

## Описание

Данный модуль обеспечивает типизированную и безопасную работу с объектами веб-хранилищ `localStorage` и `sessionStorage`.

## provideBrowserStorage

Провайдер для регистрации инструментов по работе с веб-хранилищами.

**Интерфейс**

```ts
function provideBrowserStorage(
  config?: BrowserStorageConfig | (() => BrowserStorageConfig),
): Provider[];
```

**Параметры**

| Name | Type | Default value | Description |
|----------|----------|----------| ----------|
| **config** | `BrowserStorageConfig \| (() => BrowserStorageConfig)` | `{ storage: 'localStorage', strategy: 'json' }` | Определяют конфигурацию по работе методов сервиса `BrowserStorage` на уровне всего приложения. Значения по-умолчанию могут переопределяться непосредственно при вызове методов. |

> **NOTE**
> При необходимости объект конфигурации может передаваться, как функция-фабрика.

## useBrowserStorage

Функция для инжектирования сервиса по работе с веб-хранилищами.

**Интерфейс**

```ts
function useBrowserStorage<T extends object>(): BrowserStorage<T>;
```

## BrowserStorage

Сервис по работе с веб-хранилищами.

**Интерфейс**

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

**Описание**

| Name | ReturnType | Description |
|----------|----------|----------|
| **get** | `Storage[K] \| { [Key in keyof Storage]: Storage[Key] }` | Возвращает значения полей по ключам. |
| **set** | `void` | Изменяет значение по ключу. |
| **patch** | `void` | Изменяет значения полей по переданному объекту. |
| **remove** | `void` | Удаляет значения по переданным ключам. |
| **clear** | `void` | Очищает хранилище. |
| **keys** | `Array<keyof Storage>` | Возвращает все ключи хранилища. |
| **isEnabledBrowserStorage** | `boolean` | Возвращает булево значение о доступности веб-хранилища в браузере. |

> **WARNING**
> Параметры конфигурации `BrowserStorageConfig` используемые в методах, переопределяют дефолтное поведение конфигурации, установленной на уровне всего приложения в параметре **config** провайдера `provideBrowserStorage`. По-умолчанию поле `strategy` равно значению `json`, это значит, что все методы записи/чтения (`get`, `set`, `patch`) в сервисе будут использовать `JSON.stringify`/`JSON.parse` соответственно. Это позволяет сохранять исходный тип данных при работе с хранилищем. Поэтому не рекомендуется переопределять стратегию этого поведения.

> **ALERT**
> Если у пользователя через настройки браузера заблокировано использование веб-хранилищ, сервис `BrowserStorage` создаст объект-заглушку, который будет использоваться для записи/чтения данных. Это позволяет не ломать основную логику ваших приложений для таких случаев. Но так же стоит учитывать, что если страница у такого пользователя будет перезагружена, закрыта и повторно открыта, объект-заглушка будет создаваться каждый раз заново в таком случае. Если хранение данных в веб-хранилище играет для Вашей логики принципиальную роль, Вы можете использовать метод проверки или функцию (`isEnabledBrowserStorage`) ориентируясь на доступность хранилища перед записью/чтением.

**Методы**

Для описания работы методов сервиса `BrowserStorage` создадим интерфейс хранилища:

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

Зарегистрируем провайдер для работы с хранилищем:

```ts name="./src/app/app.config.ts" {5}
import { provideBrowserStorage } from '@ngmd/utils/browser-storage';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideBrowserStorage(),
    // ...
  ],
};
```

Внедрим сервис для работы с хранилищем в компонент:

```ts name="browser-storage.component.ts" {6}
import { BrowserStorage, useBrowserStorage } from '@ngmd/utils/browser-storage';
import { ILocalStorage } from './browser-storage';

@Component({/*...*/})
export class BrowserStorageComponent {
  private browserStorage: BrowserStorage<ILocalStorage> = useBrowserStorage();
}
```

### get

Возвращает значения полей из веб-хранилища по переданным ключам.

**Интерфейс**

```ts
get(keys: keyof Storage | Array<keyof Storage>, options?: BrowserStorageConfig): Storage[Key] | { [Key in keyof Storage]: Storage[Key] };
```

Работает в соответствии со следующими правилами:
  - Если в параметр `keys` передан только один ключ, то возвращает значение по этому ключу
  - Если в параметр `keys` передано более одного ключа, то возвращает объект типа ключ-значение

**Использование**

```ts
import { TMode } from './browser-storage';

@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    // * Один ключ
    const mode: TMode = this.browserStorage.get('mode');

    // Несколько ключей
    const { mode, role } = this.browserStorage.get(['mode', 'role']);
  }
}
```

### set

Изменяет значение поля в веб-хранилище по переданному ключу.

**Интерфейс**

```ts
set(key: keyof Storage, value: Storage[Key], options?: BrowserStorageConfig): void;
```

**Использование**

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

Изменяет значения веб-хранилища по типу ключ-значение

**Интерфейс**

```ts
patch(obj: Partial<Storage>, options?: BrowserStorageConfig): void;
```

**Использование**

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

Удаляет значения из веб-хранилища по типу ключ-значение.

**Интерфейс**

```ts
remove(key: keyof Storage | Array<keyof Storage>, storage?: BrowserStorageType): void;
```

**Использование**

```ts
import { EnAppStatus, TRole } from './browser-storage';

@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    // * Один ключ
    this.browserStorage.remove('mode');

    // Несколько ключей
    this.browserStorage.remove(['mode', 'role']);
  }
}
```

### clear

Удаляет все значения из веб-хранилища.

**Интерфейс**

```ts
clear(storage?: BrowserStorageType): void;
```

**Использование**

```ts
@Component({/*...*/})
class BrowserStorageComponent {
  public example(): void {
    this.browserStorage.clear(); // Хранилище полностью очищено
  }
}
```

### keys

Возвращает в виде массива все ключи из веб-хранилища.

**Интерфейс**

```ts
keys(storageType: BrowserStorageType): keyof Storage[];
```

**Использование**

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

Возвращает статус доступности хранилища в браузере.

**Интерфейс**

```ts
isEnabledBrowserStorage(storage: BrowserStorageType = this.config.storage): boolean;
```

**Использование**

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

Список используемых типов для работы с инструментами хранилища.

### BrowserStorageType

Тип хранилища, с которым нужно работать.

**Интерфейс**

```ts
type BrowserStorageType = 'localStorage' | 'sessionStorage';
```

**Описание**

| Значение | Description |
|----------|----------|
| `localStorage` | Работа с `localStorage` |
| `sessionStorage` | Работа с `sessionStorage` |

### BrowserStorageStrategy

Стратегия для работы с методами записи/чтения в веб-хранилище.

**Интерфейс**

```ts
type BrowserStorageStrategy = 'default' | 'json';
```

**Описание**

| Значение | Description |
|----------|----------|
| `default` | При записи/чтении значений никаких модификаций не производится. |
| `json` | 1. При записи в хранилище, значение будет преобразовано через функцию `JSON.stringify(value)` <br/> 2. При чтении из хранилища, возвращаемое значение будет преобразовано через функцию `JSON.parse(value)` |


### BrowserStorageConfig

Конфигурация для работы с хранилищем.

**Интерфейс**

```ts
type BrowserStorageConfig = {
  storage?: BrowserStorageType;
  strategy?: BrowserStorageStrategy;
};
```

**Описание**

| Name | Type | Description |
|----------|----------|----------|
| **storage** | `BrowserStorageType` | Тип хранилища, с которым нужно работать |
| **strategy** | `BrowserStorageStrategy` | Стратегия для работы с методами записи/чтения в веб-хранилище |

## Handlers

### isEnabledBrowserStorage

Глобальная функция, возвращающая булево значение о доступности веб-хранилища в браузере.

**Интерфейс**

```ts
function isEnabledBrowserStorage(storage: BrowserStorageType = 'localStorage'): boolean;
```


