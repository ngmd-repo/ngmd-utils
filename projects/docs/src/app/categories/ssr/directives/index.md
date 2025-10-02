---
keyword: DirectivesPage
---

Импортируется из `@ngmd/utils/ssr`

---

## Описание

Здесь представлен список директив, которые могут полезны для работы в приложениях, использующих `@angular/ssr`


## BrowserRenderDirective

Рендерит содержимое шаблона только в браузере. Если приложение выполняется на сервере, содержимое не будет отображаться.  Это полезно для выполнения манипуляций с DOM и использования сторонних библиотек, которые работают только в браузере.

При клиентском рендеринге основная работа по созданию HTML-страницы выполняется на стороне клиента (в браузере) с помощью JavaScript.

**Использование**

```html name="example.component.html" group="browser-render-group"
<div *ngBrowserRender>
  <button (click)="changeStyle()">Click me</button>
  <p #textElement>Some text here</p>
</div>

<!-- Or -->

<div *ngBrowserRender>
  <canvas id="myChart"></canvas>
</div>
```
```ts name="example.component.ts" group="browser-render-group" {1,5}
import { BrowserRenderDirective } from '@ngmd/utils/ssr';

@Component({
  imports: [
    BrowserRenderDirective
  ],
  // ...
})
export class ExampleComponent {}
```

Эти примеры показывают, что такой код будет работать только в клиентской среде. Манипуляции с DOM и подключение сторонних библиотек, например, для создания графиков и анимаций, будут работать только в браузере. Это предотвращает выполнение кода на сервере, что может привести к ошибкам.

> **WARNING**
> Если ваше приложение поддерживает SSR, то не забываете проверять при локальном запуске, что нет каких либо ошибок.

## ServerRenderDirective

Рендерит содержимое шаблона только на сервере. Это полезно для предзагрузки данных и отображения их на странице до того, как страница будет загружена в браузере.

При серверном рендеринге HTML-страница полностью генерируется на сервере и отправляется на клиент. Это обеспечивает быструю начальную загрузку страницы и лучшую SEO-оптимизацию.

**Использование**

На сервере можно предзагрузить данные и отобразить их на странице до того, как страница будет загружена в браузере. Это позволяет ускорить загрузку страницы и улучшить пользовательский опыт, особенно при медленном соединении.

```html name="example.component.html" group="server-render-group"
<div *ngServerRender>
  <p>Loading data from server...</p>
</div>
```
```ts name="example.component.ts" group="server-render-group" {1,5}
import { ServerRenderDirective } from '@ngmd/utils/ssr';

@Component({
  imports: [
    ServerRenderDirective
  ],
  // ...
})
export class ExampleComponent {}
```

> **WARNING**
> Если ваше приложение поддерживает SSR, то не забываете проверять при локальном запуске, что нет каких либо ошибок.