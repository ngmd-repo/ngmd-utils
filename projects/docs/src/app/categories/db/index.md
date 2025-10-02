---
keyword: DBPage
---

Импортируется из `@ngmd/utils/db`

[`Style guides`](/getting-started/style-guides#db)

---

## Описание

Менеджер для централизованного хранения и автоматической типизации статических данных.

**Интерфейс**

```ts
class StaticDB<T extends object> = {
  get(keys: keyof TPath, isCopy?: boolean): T[TPath];
}
```

## Providers

### provideRootDB

Провайдер для регистрации корневого хранилища

```ts
function provideRootDB<DB extends object>(db: DB): Provider
```

> **NOTE**
> Используется для регистрации хранилищ, которые нужны в рамках всего приложения 

### useRootDB

Функция для инжектирования корневого хранилища

```ts
function useRootDB<DB extends object>(): StaticDB<DB>
```

### useDB

Функция для инжектирования модульного хранилища

```ts
function useDB<DB extends object>(db: DB): StaticDB<DB>
```

> **NOTE**
> Обратите внимание, что для использования модульного хранилища функция-провайдер не нужна

## Методы

Для описания работы методов создадим объект-хранилище со статическими данными и получим доступ к нему в компоненте через менеджер-класс `StaticDB`


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
> Обратите внимание, что при создании объекта хранилища указывается жесткая привязка типа через `as const` в конце объявления объекта.


### get

Метод для получения данных из объекта-хранилища. Все получаемые значения типизируются автоматически при получении.

**Интерфейс**

```ts
  get(keys: keyof TPath, isCopy?: boolean): T[TPath];
```


**Параметры**

| Name | Required | Default | Description |
|----------|----------|----------|----------|
| **keys** | `true` | `null` | Список ключей, составляющий путь до целевого значения в объекте |
| **isCopy** | `false` | `true` | Отвечает за копирование целевого значения. Актуально при изменении значений ссылочных данных (объектов, массивов) после их получения из хранилища. По-умолчанию всегда копирует. |

**Использование**

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

**Нюансы**

Если вы хотите привязать конкретное значение для типа примитива, вы можете использовать ключевое слово `as`:

- В рамках создания поля в объекте-хранилище

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

- В рамках получения поля в компоненте

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


При хранении ссылочных типов данных манипуляций, описанных выше, делать не нужно:


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

Функция, работающая аналогично методу [`get`](/db#get) класса `StaticDB`. Может использоваться, если создавать менеджер нет необходимости

**Интерфейс**

```ts
function getDataFromDB<T extends object>(db: T, keys: keyof TPath, isCopy?: boolean): T[TPath];
```

**Параметры**

| Name | Required | Default | Description |
|----------|----------|----------|----------|
| **db** | `true` | `null` | Объект-хранилище |
| **keys** | `true` | `null` | Список ключей, составляющий путь до целевого значения в хранилище |
| **isCopy** | `false` | `true` | Отвечает за копирование целевого значения. Актуально при изменении значений ссылочных данных (объектов, массивов) после их получения из хранилища. По-умолчанию всегда копирует. |

**Использование**

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


