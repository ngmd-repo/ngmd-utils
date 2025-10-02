---
keyword: TokensPage
---

Imported from `@ngmd/utils/ssr`

---

## Description

This page lists the tokens provided by the `@ngmd/utils/ssr` module

## REQUEST

Request object token within `@angular/ssr`

**Interface**

```ts
import { Request } from 'express';

const REQUEST: InjectionToken<Request>;
```

> **WARNING**
> For the `REQUEST` token to work, you need to inject the `provideUtilsSsr` provider function

## RESPONSE

Response object token for requests within `@angular/ssr`

**Interface**

```ts
import { Response } from 'express';

const RESPONSE: InjectionToken<Request>;
```

> **WARNING**
> For the `RESPONSE` token to work, you need to inject the `provideUtilsSsr` provider function
