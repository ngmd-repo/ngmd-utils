---
keyword: CookiesPage
---

Импортируется из `@ngmd/utils/cookies`

---


## Описание 

Данный модуль представляет возможность работать с `cookies` документа через специальный сервис. Реализация данного модуля предусматривает так же работу с `cookies` в рамках `ssr` приложений, что позволяет избегать ошибок в разных средах выполнения.

## Providers

### provideUtilsCookies

Функцию-провайдер для работы с **cookies** 

**Интерфейс**

```ts
function provideUtilsCookies(...features: CookiesFeatures[]): Provider[]
```

**Параметры**

| Name | Type | Default value | Description |
|----------|----------|----------| ----------|
| **features** | `CookiesFeatures` | `null` | Набор **feature** функций, расширяющих работу `CookiesService` |


## CookiesService

Сервис для работы с **cookies**. Предоставляет удобный интерфейс для работы с куками (cookies) как в браузере, так и на ssr. Он абстрагирует различия между клиентской и ssr средами, позволяя работать с куками единым образом вне зависимости от контекста выполнения (в среде ssr - только `has`, `get` и `getAll`, на остальные действия стоит заглушка). Если куки отключены в браузере, сервис переключается на режим заглушки, где все операции ведут к логированию в консоль.

**Интерфейс**

```ts
class CookiesService {
  public has(name: string): boolean;
  public get(name: string): string;
  public getAll(): ISimple<string>;
  public set(name: string, value: string, options: Partial<ICookieOptions> = {}): void;
  public delete(
    name: string,
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;
  public deleteAll(
    sameSite: TSameSite = 'Lax',
    path?: ICookieOptions['path'],
    domain?: ICookieOptions['domain'],
    secure?: ICookieOptions['secure'],
  ): void;
}
```

Для описания работы методов сервиса `CookiesService` зарегистрируем провайдер в корне приложения:

```ts name="app.config.ts" {5}
import { provideUtilsCookies } from '@ngmd/utils/cookies';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsCookies(),
    // ...
  ],
};
```

Инжектируем сервис в компонент:

```ts name="cookies.components.ts"
@Component({/**/})
export class CookiesComponent {
  private cookiesService: CookiesService = inject(CookiesService);
}
```

**Методы**

### has 

Проверяет наличие куки.

**Интерфейс**

```ts
has(name: string): boolean;
```

**Использование**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    const hasCookie: boolean = this.cookiesService.has('testCookie');

    console.log('Has testCookie:', hasCookie);
  }
}
```

### get 

Получить куку.

**Интерфейс**

```ts
get(name: string): string;
```

**Использование**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    const cookieValue: string = this.cookiesService.get('testCookie');

    console.log('Test Cookie:', cookieValue);
  }
}
```

### getAll 

Получить все куки.

**Интерфейс**

```ts
getAll(): ISimple<string>;
```

**Использование**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    const cookies: ISimple<string> = this.cookiesService.getAll();

    console.log('All cookies:', cookies);
  }
}
```

### set 

Изменить куку.

**Интерфейс**

```ts
set(name: string, value: string, options: Partial<ICookieOptions> = {}): void;
```

**Использование**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    this.cookiesService.set('testCookie', 'testValue', { expires: 7 });
  }
}
```

### delete 

Удалить куку.

**Интерфейс**

```ts
delete(
  name: string,
  sameSite: TSameSite = 'Lax',
  path?: ICookieOptions['path'],
  domain?: ICookieOptions['domain'],
  secure?: ICookieOptions['secure'],
): void;
```

**Использование**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    this.cookiesService.delete('testCookie');
  }
}
```

### deleteAll 

Удалить все куки.

**Интерфейс**

```ts
deleteAll(
  sameSite: TSameSite = 'Lax',
  path?: ICookieOptions['path'],
  domain?: ICookieOptions['domain'],
  secure?: ICookieOptions['secure'],
): void;
```

**Использование**

```ts {4}
@Component({/**/})
export class CookiesComponent {
  private example(): void {
    this.cookiesService.deleteAll();
  }
}
```

## Types

### ICookieOptions

Интерфейс для работы с методами сервиса `CookiesService`.

Назначение полей описано в [статье](https://learn.javascript.ru/cookie)

**Интерфейс**

```ts
interface ICookieOptions {
  expires: Date | number;
  path: string;
  domain: string;
  secure: boolean;
  sameSite: TSameSite;
  partitioned: boolean;
}
```

### TSameSite

Тип, описывающий возможные значения для куки с ключом `samesite`.

**Интерфейс**

```ts
type TSameSite = 'Lax' | 'None' | 'Strict';
```

### CookiesFeatures

Union-тип для feature-функций, которые используются в рамках параметра features функции-провайдера `provideUtilsCookies`

**Интерфейс**

```ts
type CookiesFeatures = CookiesSsrManagerFeature;
```

