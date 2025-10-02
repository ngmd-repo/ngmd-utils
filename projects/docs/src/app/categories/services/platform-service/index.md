---
keyword: PlatformServicePage
---

Импортируется из `@ngmd/utils/services`

---


## Описание

Сервис определения платформы по идентификатору `PLATFORM_ID`

## PlatformService

**Интерфейс**

```ts
@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  public isBrowser(): boolean;
  public isServer(): boolean;
}
```

## Методы

### isBrowser

Метод возвращает `true`, если вызываемый код исполняется в **браузерной** среде  

### isServer

Метод возвращает `true`, если вызываемый код исполняется в **серверной** среде  