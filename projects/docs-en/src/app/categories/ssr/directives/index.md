---
keyword: DirectivesPage
---

Imported from `@ngmd/utils/ssr`

---

## Description

Here is a list of directives that can be useful for working in applications using `@angular/ssr`


## BrowserRenderDirective

Renders template content only in the browser. If the application is running on the server, the content will not be displayed. This is useful for performing DOM manipulations and using third-party libraries that only work in the browser.

In client-side rendering, the main work of creating the HTML page is performed on the client side (in the browser) using JavaScript.

**Usage**

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

These examples show that such code will only work in the client environment. DOM manipulations and connecting third-party libraries, for example, for creating charts and animations, will only work in the browser. This prevents code execution on the server, which can lead to errors.

> **WARNING**
> If your application supports SSR, don't forget to check during local development that there are no errors.

## ServerRenderDirective

Renders template content only on the server. This is useful for preloading data and displaying it on the page before the page is loaded in the browser.

In server-side rendering, the HTML page is fully generated on the server and sent to the client. This provides fast initial page loading and better SEO optimization.

**Usage**

On the server, you can preload data and display it on the page before the page is loaded in the browser. This allows you to speed up page loading and improve user experience, especially with slow connections.

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
> If your application supports SSR, don't forget to check during local development that there are no errors.