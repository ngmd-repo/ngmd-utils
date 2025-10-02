---
keyword: DirectivesPage
---

Импортируется из `@ngmd/utils/directives`

---

## Описание

Данный модуль предоставляет список **angular directive's** для решения ряда типичных проблем.

## Directives

### AfkDirective

Предназначена для отслеживания активности пользователя и генерации события, если пользователь не совершает никаких действий (движение или клик мышкой, нажатие кнопки клавиатуры, touch на сенсорных экранах) в течение заданного времени.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngAfk** | `number \| string` | `false` | `2500` | Задержка в миллисекундах, после которой должно срабатывать событие о бездействии, если не было зафиксировано никаких действий пользователя.  |
| **ngAfkRetryCount** | `number \| string` | `false` | `Number.MAX_SAFE_INTEGER` | Количество раз, которое событие о бездействии может сработать. По умолчанию ограничение практически отсутствует. |
| **ngAfkDisabled** | `boolean` | `false` | `false` | Если `true`, директива не будет отслеживать действия пользователя.  |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **afk** | `void` | Событие, генерируемое при отсутствии активности пользователя в течение заданного времени в параметре `ngAfk`. |

**Использование**

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

Позволяет декларативно установить background image для элемента.

**Интерфейс**

```ts
@Directive({
  selector: '[ngBackgroundImage]',
})
export class BackgroundImageDirective {
  public ngBackgroundImage: InputSignal<string> = input.required();
}
```

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngBackgroundImage** | `string` | `true` | `undefined` | URL изображения. |

**Использование**

```html
<div
  ngBackgroundImage="http://some-url/logo.svg"
></div>
```

### ClosestDirective

Предназначена для определения, кликнул ли пользователь внутри заданного элемента или его дочерних элементов, основываясь на CSS-селекторах. Это может быть полезно для реализации функционала, подобного клику вне элемента для закрытия модального окна или выпадающего списка.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngClosest** | `string[] \| string` | `true` | `undefined` | CSS-селекторы, которые определяют элементы, для которых будет проверяться, произошел ли клик внутри этих элементов. Это может быть один селектор в виде строки или массив селекторов.  |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **closest** | `boolean` | Событие, которое генерируется при каждом клике. Возвращает true, если клик произошел внутри одного из указанных селекторов, и false в противном случае. |

**Использование**

Обработчик `emitHandler` получит `true`, если мы кликнем внутри компонента my-component или внутри div-обертки с классом parent или my-class.

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

Предназначена для копирования текста в буфер обмена при клике на элемент, к которому применена эта директива.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngCopy** | `string` | `true` | `undefined` | Текст для копирования в буфер обмена. |

**Использование**

```html
<button [ngCopy]="'текст который копируем в буфер обмена'">
    Копировать текст
</button>
```

### FocusDirective

Предназначена для программного управления фокусом элемента. Позволяет динамически устанавливать или убирать фокус с элемента.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngFocus** | `boolean` | `false` | `true` | Булево значение, которое управляет фокусом элемента. Если значение `true` или не задано, фокус устанавливается на элемент. Если `false`, фокус с элемента убирается. Это значение можно динамически изменять. |

**Использование**

Установить фокус на **input**

```html
<div>
    <input [ngFocus]="someCondition" />
</div>
<!-- Или просто -->
<div>
    <input ngFocus />
</div>
```

### InsertDirective

Предназначена для динамической вставки DOM-элементов в указанные места страницы. Она принимает два входных параметра: позицию вставки и селектор целевого элемента.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngInsert** | `InsertPosition` | `false` | `afterend` | Определяет позицию, куда должен быть вставлен элемент относительно целевого элемента. Принимает значения: `beforebegin` (перед целевым элементом, за его пределами), `afterbegin` (внутри целевого элемента, перед всем содержимым), `beforeend` (внутри целевого элемента, после всего содержимого), `afterend` (после целевого элемента, за его пределами). |
| **ngInsertTargetSelector** | `string` | `true` | `undefined` | CSS-селектор целевого элемента. Это значение указывает, к какому элементу в DOM применяется операция вставки. Элемент, определенный этим селектором, служит опорной точкой для вставки. |

**Использование**

```html
<!-- Целевой элемент -->
<section id="scrollArea">
  <!-- Элемент для вставки относительного целевого элемента -->
  <div 
    class="target"
    ngInsert="afterbegin"
    ngInsertTargetSelector="#scrollArea"
  >
      Какой-то контент
  </div>
</section>
```

### IntersectionDirective

Предназначена для отслеживания появления элемента в области видимости экрана (viewport). Она использует [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), чтобы определить, когда элемент, к которому применена директива, пересекает заданный порог видимости. Это полезно для реализации ленивой загрузки, анимаций появления и других действий, зависящих от того, видит ли пользователь элемент на экране или нет.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngIntersection** | `string` | `false` | `null` | CSS-селектор элемента, который используется в качестве области просмотра для проверки видимости целевого элемента. Должен быть предком целевого элемента. |
| **ngIntersectionDetect** | `boolean` | `false` | `true` | Директива будет инициировать обновление обнаружения изменений каждый раз, когда элемент пересекает порог видимости. |
| **ngIntersectionMargin** | `string` | `false` | `0px` | Задает отступы вокруг root элемента, изменяя размер области для проверки пересечения. Могут иметь значения как свойство css margin: "10px 20px 30px 40px" - (top, right, bottom, left). Значения можно задавать в процентах. По умолчанию все параметры установлены в нули. |
| **ngIntersectionThreshold** | `number \| string` | `false` | `1` | Число (от 0 до 1) указывающее, при каком проценте видимости целевого элемента должен сработать событие. Например, если значение установлено в 0.5, событие будет эмититься, когда 50% площади элемента окажется видимой в области просмотра. |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **intersection** | `IntersectionObserverEntry[]` | Событие, которое инициируется каждый раз, когда элемент входит или выходит из заданного порога видимости. Предоставляет массив объектов IntersectionObserverEntry, содержащих информацию о состоянии пересечения. |

**Использование**

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

Предназначена для обеспечения перехода по URL, который указывается как параметр. Директива отслеживает клик пользователя по элементу, к которому применена, и осуществляет переход на заданный URL.

**Интерфейс**

```ts
@Directive({
  selector: '[ngLink]',
})
export class LinkDirective {
  public ngLink: InputSignal<string> = input.required();
}
```

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngLink** | `string` | `true` | `undefined` | URL, на который будет выполнен переход при клике на элемент. |

**Использование**

```html
<div>
  <a ngLink="https://example.com">Перейти на example.com</a>
</div>
```

### PageEndpointDirective

Предназначена для отслеживания, когда пользователь доскролил страницу или элемент до определенных границ, к примеру до низа, верха, лево или право.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngPageEndpoint** | `TSide[]` | `false` | `['bottom']` | Список границ для отслеживания, допустимые значения `'bottom' | 'left' | 'right' | 'top'`. |
| **ngEndpointDisabled** | `boolean` | `false` | `false` | При `true` любое отслеживание прекращается. |
| **ngEndpointElement** | `'document' \| 'element'` | `document` | Выбор, будут ли отслеживаться границы всей страницы или конкретного элемента. При выборе `document` отслеживаем скролл браузера, при выборе `element` отслеживаем скролл этого элемента. |

**Outputs**

| Name | Type | Description |
|----------|----------|----------|
| **endpoint** | `string` | Событие, которое активируется, когда достигнута одна из указанных границ. Событие сообщает, какая именно граница была достигнута (`'bottom' \| 'left' \| 'right' \| 'top'`). |

**Использование**

Отслеживаем скролл данного div на top и bottom. Как только скролл достигнет верха, эмит-колбэк передаст 'top', низа - 'bottom'.

```html
<div
  ngEndpointElement="element"
  [pageEndpoint]="['bottom', 'top']"
  (endpoint)="emitHandler($event)"
></div>
```

### SelectorStylesDirective

Предназначена для отслеживания, когда пользователь доскролил страницу или элемент до определенных границ, к примеру до низа, верха, лево или право.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngSelectorStyles** | `ISimple<number \| string>` | `true` | `undefined` | Объект, ключи которого — названия CSS-свойств, а значения — соответствующие значения этих свойств. |
| **ngSelector** | `string` | `true` | `undefined` | CSS-селектор элемента, к которому будут применены стили. Это может быть любой валидный селектор, например, идентификатор, класс или тег. |

**Использование**

В данном примере, при инициализации элемента, к **body** применяем стили, указанные в `ngSelectorStyles`.

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
> При ngOnDestroy стили убираются 

### SwitchContainDirective

Это структурная директива, которая определяет какой элемент по условию должен быть отображен. Аналог служебной директивы Ангуляра `ngSwitch`. Использует вспомогательные директивы `SwitchContainCaseDirective` и `SwitchContainDefaultDirective`.

**Интерфейс**

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

**Параметры**

**SwitchContainDirective Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngSwitchContain** | `unknown` | `true` | `undefined` | Значение на основе которого определяется, какой кейс отобразить. |


**SwitchContainCaseDirective Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngSwitchContainCase** | `unknown[]` | `true` | `undefined` | Массив значений, если переданное в `ngSwitchContain` значение будет содержаться в массиве, директива активирует отображение связанного с ней шаблона. |

**Использование**

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
    Это содержимое, если selectedValue = value1 или value3.
  </ng-template>
  <ng-template [ngSwitchContainCase]="['value2']">
    Это содержимое если selectedValue = value2.
  </ng-template>
  <ng-template ngSwitchContainDefault>
    Это содержимое отображается по умолчанию, 
    если selectedValue не равен ни одному из значений выше
  </ng-template>
</div>
```

### DownloadDirective

Позволяет скачать файл, получив на вход сам файл или ссылку на него, в том числе обработанную через токен `DOWNLOAD_URL_TRANSFORMER`.

**Интерфейс**

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

**Параметры**

**Inputs**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ngDownload** | `string` | `true` | `undefined` | Файл или ссылка на него (см. ngDownloadType). |
| **ngDownloadType** | `string` | `true` | `undefined` | Тип файла, где `file` - объект типа File, `request` - ссылка, обработанная через токен `DOWNLOAD_URL_TRANSFORMER` (по-умолчанию переданная ссылка без изменений), `url` - прямая ссылка на файл. |
| **ngDownloadName** | `string` | `false` | `null` | Имя файла. В случае отсутствия возьмет имя файла в ссылке для типов `url` и `request`, а для типа `file` возьмет значение из поля name. |
| **ngDownloadDisabled** | `string` | `false` | `false` | Блокировка скачивания. |

**Использование**

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

Токен, преобразующий ссылку при использовании `request` в `ngDownloadType`. По умолчанию вернет переданную ссылку. 

**Интерфейс**

```ts
const DOWNLOAD_URL_TRANSFORMER: InjectionToken<(url: string) => string>;
```

**Использование**

Пример использования с переопределением `@/file.jpg` на `www.example.com/file.jpп`

```typescript
providers: [
  {
    provide: DOWNLOAD_URL_TRANSFORMER,
    useValue: (url: string) => url.replace('@', 'www.example.com'),
  },
]
```