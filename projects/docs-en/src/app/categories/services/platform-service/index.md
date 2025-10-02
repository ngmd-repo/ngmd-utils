---
keyword: PlatformServicePage
---

Imported from `@ngmd/utils/services`

---


## Description

Platform detection service by `PLATFORM_ID` identifier

## PlatformService

**Interface**

```ts
@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  public isBrowser(): boolean;
  public isServer(): boolean;
}
```

## Methods

### isBrowser

Method returns `true` if the called code is executed in a **browser** environment

### isServer

Method returns `true` if the called code is executed in a **server** environment  