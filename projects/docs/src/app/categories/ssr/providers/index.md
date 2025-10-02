---
keyword: ProvidersPage
---

Импортируется из `@ngmd/utils/ssr`

---

## Описание

Данный страница перечисляет список список провайдеров для работы с модулем `@ngmd/utils/ssr`

### provideUtilsSsr

Функция-провайдер, необходимая для корректной работы некоторых инструментов модуля `@ngmd/utils/ssr`


**Интерфейс**

```ts
import { Request, Response } from 'express';

function provideUtilsSsr(request: Request, response: Response): Provider[];
```

**Использование**

```ts name="server.ts" {2,18}
import { CommonEngine } from '@angular/ssr/node';
import { provideUtilsSsr } from '@ngmd/utils/ssr';
import express from 'express';

export function app(): express.Express {
  const server = express();
  const commonEngine = new CommonEngine();

  // ...

  server.get('**', (req, res, next) => {
    // ...
    commonEngine
      .render({
        // ...
        providers: [
          // ...
          provideUtilsSsr(req, res),
        ],
      })
      .then(html => res.send(html))
      .catch(err => next(err));
  });

  return server;
}
```




