---
keyword: DirectivesPage
---

Imported from `@ngmd/utils/directives`

---

## Description

This module provides a set of **Angular directives** for solving a range of common problems.

## Directives

### AfkDirective

Designed to track user activity and emit an event if the user does not perform any actions (mouse movement or click, keyboard press, touch on touchscreens) within a specified time.

**Interface**

```ts
@Directive({
  selector: '[ngAfk]',
})
export class AfkDirective {
  // * Inputs
  public ngAfk: InputSignal<number | string> = input(2500);
  public ngAfkRetryCount: InputSignal<number | string> = input(Number.MAX_SAFE_INTEGER);
  public ngAfkDisabled: InputSignal<boolean> = input<boolean>(false);

  // * Outputs
  public afk: OutputEmitterRef<void> = output();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngAfk** | `number \| string` | `false` | `2500` | Delay in milliseconds after which the inactivity event is triggered if no user actions are detected.  |
| **ngAfkRetryCount** | `number \| string` | `false` | `Number.MAX_SAFE_INTEGER` | Number of times the inactivity event can be triggered. By default, there is practically no limit. |
| **ngAfkDisabled** | `boolean` | `false` | `false` | If `true`, the directive will not track user actions.  |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **afk** | `void` | Event emitted when there is no user activity for the specified time in the `ngAfk` parameter. |

**Usage**

```html
<div>
  <my-custom-component 
    [ngAfk]="5000"
    [ngAfkRetryCount]="3"
    [ngAfkDisabled]="false"
    (afk)="emitHandler()"  
  /> 
</div>
```

### BackgroundImageDirective

Allows you to declaratively set a background image for an element.

**Interface**

```ts
@Directive({
  selector: '[ngBackgroundImage]',
})
export class BackgroundImageDirective {
  public ngBackgroundImage: InputSignal<string> = input.required();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngBackgroundImage** | `string` | `true` | `undefined` | Image URL. |

**Usage**

```html
<div
  ngBackgroundImage="http://some-url/logo.svg"
></div>
```

### ClosestDirective

Designed to determine whether the user clicked inside a given element or its child elements, based on CSS selectors. Useful for implementing functionality like clicking outside an element to close a modal or dropdown.

**Interface**

```ts
@Directive({
  selector: '[ngClosest]',
})
export class ClosestDirective {
  // * Inputs
  public ngClosest: InputSignal<string[] | string> = input.required();

  // * Outputs
  public closest: OutputEmitterRef<boolean> = output();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngClosest** | `string[] \| string` | `true` | `undefined` | CSS selectors that define elements to check if a click occurred inside them. Can be a single selector string or an array of selectors.  |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **closest** | `boolean` | Event emitted on every click. Returns true if the click occurred inside one of the specified selectors, false otherwise. |

**Usage**

The `emitHandler` will receive `true` if you click inside the `my-component` or inside the parent div with the class `parent` or `my-class`.

```html
<div class="parent" style="padding: 100px;">
  <my-component
    class="child"
    [ngClosest]="['.parent','.my-class']"
    (closest)="emitHandler($event)"
  /> 
</div>
```

### CopyDirective

Designed to copy text to the clipboard when clicking on the element to which the directive is applied.

**Interface**

```ts
@Directive({
  selector: '[ngCopy]',
})
export class CopyDirective {
  // * Inputs
  public ngCopy: InputSignal<string> = input.required();

  // * Public methods
  public copy(): void;
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngCopy** | `string` | `true` | `undefined` | Text to copy to the clipboard. |

**Usage**

```html
<button [ngCopy]="'text to copy to clipboard'">
    Copy text
</button>
```

### FocusDirective

Designed for programmatically managing the focus of an element. Allows you to dynamically set or remove focus from an element.

**Interface**

```ts
@Directive({
  selector: '[ngFocus]',
})
export class FocusDirective {
  // * Inputs
  public ngFocus: InputSignal<boolean> = input(true);

  // * Public methods
  public focus(isFocused: boolean): void;
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngFocus** | `boolean` | `false` | `true` | Boolean value that controls the focus of the element. If `true` or not set, focus is set on the element. If `false`, focus is removed. This value can be changed dynamically. |

**Usage**

Set focus on **input**

```html
<div>
    <input [ngFocus]="someCondition" />
</div>
<!-- Or simply -->
<div>
    <input ngFocus />
</div>
```

### InsertDirective

Designed for dynamically inserting DOM elements into specified places on the page. It takes two input parameters: the insertion position and the target element selector.

**Interface**

```ts
@Directive({
  selector: '[ngInsert]',
})
export class InsertDirective {
  // * Inputs
  public ngInsert: InputSignal<InsertPosition> = input<InsertPosition>('afterend');
  public ngInsertTargetSelector: InputSignal<string> = input.required();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngInsert** | `InsertPosition` | `false` | `afterend` | Defines the position where the element should be inserted relative to the target element. Accepts: `beforebegin` (before the target element, outside), `afterbegin` (inside the target element, before all content), `beforeend` (inside the target element, after all content), `afterend` (after the target element, outside). |
| **ngInsertTargetSelector** | `string` | `true` | `undefined` | CSS selector of the target element. This value specifies which DOM element the insertion operation applies to. The element defined by this selector serves as the reference point for insertion. |

**Usage**

```html
<!-- Target element -->
<section id="scrollArea">
  <!-- Element to insert relative to the target element -->
  <div 
    class="target"
    ngInsert="afterbegin"
    ngInsertTargetSelector="#scrollArea"
  >
      Some content
  </div>
</section>
```

### IntersectionDirective

Designed to track when an element appears in the viewport. It uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to determine when the element to which the directive is applied crosses a specified visibility threshold. Useful for implementing lazy loading, appearance animations, and other actions depending on whether the user sees the element on the screen.

**Interface**

```ts
@Directive({
  selector: '[ngIntersection]',
  exportAs: 'ngIntersectionRef',
})
export class IntersectionDirective {
  // * Inputs
  public ngIntersection: InputSignal<string> = input(null);
  public ngIntersectionDetect: InputSignal<boolean> = input(true);
  public ngIntersectionMargin: InputSignal<string> = input('0px');
  public ngIntersectionThreshold: InputSignal<number | string> = input<number | string>(1);

  // * Outputs
  public intersection: OutputEmitterRef<IntersectionObserverEntry[]> = output();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngIntersection** | `string` | `false` | `null` | CSS selector of the element used as the viewport for checking visibility of the target element. Should be an ancestor of the target element. |
| **ngIntersectionDetect** | `boolean` | `false` | `true` | The directive will trigger change detection every time the element crosses the visibility threshold. |
| **ngIntersectionMargin** | `string` | `false` | `0px` | Sets margins around the root element, changing the size of the area for intersection checking. Can have values like the CSS margin property: "10px 20px 30px 40px" - (top, right, bottom, left). Values can be set in percentages. Defaults to zero for all parameters. |
| **ngIntersectionThreshold** | `number \| string` | `false` | `1` | Number (from 0 to 1) indicating at what percentage of the target element's visibility the event should be triggered. For example, if set to 0.5, the event will be emitted when 50% of the element's area is visible in the viewport. |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **intersection** | `IntersectionObserverEntry[]` | Event triggered every time the element enters or leaves the specified visibility threshold. Provides an array of IntersectionObserverEntry objects containing intersection state information. |

**Usage**

```html
<div class="wrapper">
  <div
    ngIntersection=".wrapper"
    [ngIntersectionDetect]="true"
    [ngIntersectionThreshold]="1"
    [ngIntersectionMargin]="'10px'"
    (intersection)="emitHandler($event)"
  ></div>
</div>
```

### LinkDirective

Designed to provide navigation to a URL specified as a parameter. The directive tracks user clicks on the element to which it is applied and navigates to the specified URL.

**Interface**

```ts
@Directive({
  selector: '[ngLink]',
})
export class LinkDirective {
  public ngLink: InputSignal<string> = input.required();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngLink** | `string` | `true` | `undefined` | URL to navigate to when the element is clicked. |

**Usage**

```html
<div>
  <a ngLink="https://example.com">Go to example.com</a>
</div>
```

### PageEndpointDirective

Designed to track when the user scrolls the page or element to certain boundaries, such as bottom, top, left, or right.

**Interface**

```ts
@Directive({
  selector: '[ngPageEndpoint]',
})
export class PageEndpointDirective {
  // * Inputs
  public ngPageEndpoint: InputSignal<TSide[]> = input<TSide[]>(['bottom']);
  public ngEndpointDisabled: InputSignal<boolean> = input(false);
  public ngEndpointElement: InputSignal<'document' | 'element'> = input<'document' | 'element'>(
    'document'
  );

  // * Outputs
  public endpoint: OutputEmitterRef<TSide> = output();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngPageEndpoint** | `TSide[]` | `false` | `['bottom']` | List of boundaries to track, allowed values: `'bottom' | 'left' | 'right' | 'top'`. |
| **ngEndpointDisabled** | `boolean` | `false` | `false` | If `true`, any tracking is stopped. |
| **ngEndpointElement** | `'document' \| 'element'` | `document` | Specifies whether to track boundaries of the entire page or a specific element. If `document`, tracks browser scroll; if `element`, tracks scroll of that element. |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **endpoint** | `string` | Event triggered when one of the specified boundaries is reached. The event indicates which boundary was reached (`'bottom' \| 'left' \| 'right' \| 'top'`). |

**Usage**

Track scroll of this div to top and bottom. When the scroll reaches the top, the emit callback will send 'top', when it reaches the bottom, it will send 'bottom'.

```html
<div
  ngEndpointElement="element"
  [pageEndpoint]="['bottom', 'top']"
  (endpoint)="emitHandler($event)"
></div>
```

### SelectorStylesDirective

Designed to apply styles to an element selected by a CSS selector.

**Interface**

```ts
@Directive({
  selector: '[ngSelectorStyles]',
})
export class SelectorStylesDirective {
  // * Inputs
  public ngSelectorStyles: InputSignal<ISimple<number | string>> = input.required();
  public ngSelector: InputSignal<string> = input.required();
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngSelectorStyles** | `ISimple<number \| string>` | `true` | `undefined` | Object whose keys are CSS property names and values are corresponding property values. |
| **ngSelector** | `string` | `true` | `undefined` | CSS selector of the element to which styles will be applied. Can be any valid selector, such as an ID, class, or tag. |

**Usage**

In this example, when the element is initialized, the styles specified in `ngSelectorStyles` are applied to **body**.

```html
<div
  class="shadow"
  ngSelector="body"
  [ngSelectorStyles]="{ overflow: 'hidden' }"
>
  <my-modal-component></my-modal-component>
</div>
```

> **NOTE**
> On ngOnDestroy, the styles are removed.

### SwitchContainDirective

This is a structural directive that determines which element to display based on a condition. Similar to Angular's built-in `ngSwitch`. Uses helper directives `SwitchContainCaseDirective` and `SwitchContainDefaultDirective`.

**Interface**

```ts name="SwitchContainDirective" group="switch-contain-interface"
@Directive({
  selector: '[ngSwitchContain]',
})
export class SwitchContainDirective {
  // * Inputs
  public ngSwitchContain: InputSignal<unknown> = input.required();
}
```
```ts name="SwitchContainCaseDirective" group="switch-contain-interface"
@Directive({
  selector: '[ngSwitchContainCase]',
})
export class SwitchContainCaseDirective {
  // * Inputs
  public ngSwitchContainCase: InputSignal<unknown[]> = input.required();
}
```

**Parameters**

**SwitchContainDirective Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngSwitchContain** | `unknown` | `true` | `undefined` | The value used to determine which case to display. |


**SwitchContainCaseDirective Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngSwitchContainCase** | `unknown[]` | `true` | `undefined` | Array of values; if the value passed to `ngSwitchContain` is contained in the array, the directive activates the associated template. |

**Usage**

```ts name="example.component.ts" group="switch-contain-example"
import {
  SwitchContainDirective,
  SwitchContainCaseDirective,
  SwitchContainDefaultDirective,
} from '@ngmd/utils/directives'

@Component({
  selector: 'ng-example',
  imports: [
    SwitchContainDirective,
    SwitchContainCaseDirective,
    SwitchContainDefaultDirective,
  ],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {
  protected selectedValue: string = 'value3';
}
```
```html name="example.component.html" group="switch-contain-example"
<div [ngSwitchContain]="selectedValue">
  <ng-template [ngSwitchContainCase]="['value1', 'value3']">
    This content is shown if selectedValue = value1 or value3.
  </ng-template>
  <ng-template [ngSwitchContainCase]="['value2']">
    This content is shown if selectedValue = value2.
  </ng-template>
  <ng-template ngSwitchContainDefault>
    This content is shown by default,
    if selectedValue does not match any of the values above
  </ng-template>
</div>
```

### DownloadDirective

Allows you to download a file, either by passing the file itself or a link to it, including links processed via the `DOWNLOAD_URL_TRANSFORMER` token.

**Interface**

```ts
@Directive({
  selector: '[ngDownload]',
})
export class DownloadDirective {
  public ngDownload: InputSignal<File | string> = input.required();
  public ngDownloadType: InputSignal<TDownload> = input.required();
  public ngDownloadName: InputSignal<string> = input(null);
  public ngDownloadDisabled: InputSignal<boolean> = input(false);
}
```

**Parameters**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngDownload** | `string` | `true` | `undefined` | File or link to it (see ngDownloadType). |
| **ngDownloadType** | `string` | `true` | `undefined` | File type: `file` - File object, `request` - link processed via the `DOWNLOAD_URL_TRANSFORMER` token (by default, the link is unchanged), `url` - direct link to the file. |
| **ngDownloadName** | `string` | `false` | `null` | File name. If not specified, takes the file name from the link for `url` and `request` types, and for `file` type takes the value from the name field. |
| **ngDownloadDisabled** | `string` | `false` | `false` | Download lock. |

**Usage**

```html
<a
    [ngDownload]="'https://example.com/file.pdf'"
    [ngDownloadDisabled]="false"
    [ngDownloadName]="'pic.jpg'"
    [ngDownloadType]="'url'"
>
    Download
</a>
```

#### DOWNLOAD_URL_TRANSFORMER

Token for transforming the link when using `request` in `ngDownloadType`. By default, returns the passed link.

**Interface**

```ts
const DOWNLOAD_URL_TRANSFORMER: InjectionToken<(url: string) => string>;
```

**Usage**

Example of overriding `@/file.jpg` to `www.example.com/file.jpg`:

```typescript
providers: [
  {
    provide: DOWNLOAD_URL_TRANSFORMER,
    useValue: (url: string) => url.replace('@', 'www.example.com'),
  },
]
```