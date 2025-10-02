---
keyword: TokensPage
---

Импортируется из `@ngmd/utils/ssr`

---

## Описание

Данный страница перечисляет список токенов предоставляемых модулем `@ngmd/utils/ssr`

## REQUEST

Токен объекта запроса в рамках `@angular/ssr` 

**Интерфейс**

```ts
import { Request } from 'express';

const REQUEST: InjectionToken<Request>;
```

> **WARNING**
> Для работы токена `REQUEST` необходимо внедрить функцию-провайдер `provideUtilsSsr`

## RESPONSE

Токен объекта ответа на запрос в рамках `@angular/ssr` 

**Интерфейс**

```ts
import { Response } from 'express';

const RESPONSE: InjectionToken<Request>;
```

> **WARNING**
> Для работы токена `RESPONSE` необходимо внедрить функцию-провайдер `provideUtilsSsr`
