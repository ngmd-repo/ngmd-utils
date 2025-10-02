---
keyword: ProvidersPage
---

Imported from `@ngmd/utils/ssr`

---

## Description

This page lists the providers for working with the `@ngmd/utils/ssr` module

### provideUtilsSsr

Provider function necessary for the correct operation of some tools in the `@ngmd/utils/ssr` module


**Interface**

```ts
import { Request, Response } from 'express';

function provideUtilsSsr(request: Request, response: Response): Provider[];
```

**Usage**

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




