---
keyword: PipesPage
---

Импортируется из `@ngmd/utils/pipes`

---


## Описание

Данный модуль предоставляет широкий набор пайпов, для автоматизации рутинных задач и поддержания единообразия кодовой базы 

## Pipes

### AffixPipe

Используется для добавления префикса или суффикса к строке или числу.

**Интерфейс**

```ts
transform(
  value: number | string,
  tag: number | string,
  placement: 'begin' | 'end' = 'end',
): string
```

**Использование**

```html
<!-- Добавление суффикса к базовой строке --> 
<p>{%raw%}{{ 'John' | affix:'Doe':'end' }}{%endraw%}</p> <!-- Выводит: JohnDoe -->

<p>{%raw%}{{ 'Doe' | affix:'John':'begin' }}{%endraw%}</p> <!-- Выводит: JohnDoe -->
```

### ConditionPipe

Возвращает одно из двух значений на основе предоставленного условия.

**Интерфейс**

```ts
transform<V1, V2>(
  condition: unknown, 
  ifValue: V1, 
  elseValue: V2
): V1 | V2
```

**Использование**

```html
<p>{%raw%}{{ isVisible() | condition:'ifValue':'elseValue' }}{%endraw%}</p>
```

### CurrencySymbolPipe

Преобразует код валюты в соответствующий символ валюты.

**Интерфейс**

```ts
transform(value: string): string
```

**Использование**

```html name="example.html" group="currency-symbol-pipe" active
<p>{%raw%}{{ 'USD' | currencySymbol }}{%endraw%}</p> 
<!-- Выводит: $ -->
```

```ts group="currency-symbol-pipe" name="currency-symbols-list.ts" file="../../../../../utils/pipes/src/currency-symbol.pipe.ts"#L1
```

### DefaultValuePipe

Используется для отображения значения по умолчанию, если переданное значение не определено или пусто.

**Интерфейс**

```ts
transform<T, V>(value: T, defaultValue: V): T | V
```

**Использование**

```html
<p>{%raw%}{{ user.name | defaultValue:'Аноним' }}{%endraw%}</p>
```

### DefinedPipe

Проверяет значение на `null` или `undefined`, но не реагирует на пустую строку или другие **falsy** значения, которые могут считаться валидными.

**Интерфейс**

```ts
transform(value: unknown): boolean
```

**Использование**

```html 
@if(some.value | defined) {
  <p>Content</p>
}
```

### EndsWithPipe

Проверяет, заканчивается ли строка указанным суффиксом. Возвращает `true`, если строка заканчивается суффиксом, и `false` в противном случае.

**Интерфейс**

```ts
transform(value: string, suffix: string): boolean
```

**Использование**

```html 
@for(comment of comments; track $index) {
  <p [class.highlight]="comment.text | endsWith:'?'">
    {%raw%}{{ comment.text }}{%endraw%}
  </p>
}
```

### EqualPipe

Сравнивает два значения и возвращает `true`, если они равны.

**Интерфейс**

```ts
transform(predicate: unknown, value: unknown): boolean
```

**Использование**

```html name="example-one.html" group="equal-pipe"
@if(btnType | equal : 'info') {
  <button (click)="showInfo()">Info</button>
}
```

```html name="example-two.html" group="equal-pipe"
<input [attr.maxlength]="maxLength | equal:0 | condition:null:maxLength">
```

### ExcludePropertiesPipe

Удаляет указанные свойства из объекта и возвращает новый объект без этих свойств.

**Интерфейс**

```ts
transform<T extends object, K extends Array<keyof T>>(
    object: T,
    props: K,
): { [Q in K[number]]: T[Q] }
```

**Использование**

```html name="example.html" group="exclude-props-pipe" active
@for(user of users; track $index) {
  <pre>
    {%raw%}{{ user | excludeProps:['password', 'secretQuestion'] | json }}{%endraw%}
  </pre>
}
<!-- 
  {
    name : "Иван Иванов",
    email: "ivanov@example.com"
  }
  -->
```

```ts name="example.ts" group="exclude-props-pipe"
protected users: User[] = [
  {
    name: "Иван Иванов",
    email: "ivanov@example.com",
    password: "123456",
    secretQuestion: "Имя первой собаки?"
  },
];
```

### ExistPipe

Проверяет, содержится ли значение в массиве, и возвращает `true`, если значение найдено в массиве.

**Интерфейс**

```ts
transform<T>(value: T, array: T[] = []): boolean
```

**Использование** 

`ExistPipe` с комбинацией `ConditionPipe`:

```html name="example.html" group="exist-pipe" active
@for(product of products; track $index) {
  <p>{%raw%}{{ product.name }}{%endraw%}</p>
  <button (click)="toggleWishlist(product.id)">
    {%raw%}{{ product.id | exist:wishlistIds | condition: 'Remove from Wishlist' : 'Add to Wishlist' }}{%endraw%}
  </button>
}
```

```ts name="example.ts" group="exist-pipe"
protected products: Product = [
    { id: 1, name: 'Smartphone' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Tablet' }
  ];
protected wishlistIds: number[] = [1, 3];
```

### FilterPipe

Фильтрует массив объектов, возвращая те объекты, которые содержат указанную подстроку в определённом поле.

**Интерфейс**

```ts
transform<T extends object>(array: T[], field: keyof T, findStr: string): T[]
```

**Использование** 

`ExistPipe` с комбинацией `ConditionPipe`:

```html name="example.html"
<ul>
  @for(user of users | filter:'name':'john'; track $index) {
    <li>
      {%raw%}{{ user.name }}{%endraw%}
    </li>
  }
</ul>
```

### IncludesPipe

Проверяет, содержится ли элемент в массиве, и возвращает `true`, если элемент найден, и `false` в противном случае.

**Интерфейс**

```ts
transform<T>(items: T[], item: T): boolean
```

**Использование** 

```html
<!-- Проверяет, содержится ли число 5 в массиве чисел -->

<p>{%raw%}{{ [1, 2, 3, 5, 7] | includes:5 }}{%endraw%}</p> 

<!-- Выведет 'true' -->
```

### JsTypePipe

Проверяет, соответствует ли значение заданному типу данных **JavaScript**, включая специальную проверку для типа `date`.

**Интерфейс**

```ts
transform(value: unknown, type: TJSDataType | 'date'): boolean;
```

**Использование** 

```html name="example.html" group="Js-type-pipe" active
<!-- Проверяет, является ли объект датой -->

<p>{%raw%}{{ someValue | isJSType:'date' }}{%endraw%}</p> 

<!-- Выведет 'true' или 'false' -->
```

```ts name="js-data.type.ts" group="Js-type-pipe"
type TJSDataType =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';
```

### MapPipe

Применяет предоставленную функцию обработки к значению и возвращает результат. 

**Интерфейс**

```ts
transform<T, G>(value: T, mapHandler: (v: T, ...args: any[]) => G, ...args: unknown[]): G
```

**Использование** 

```html name="example.html" group="map-pipe" active
<img
  [alt]="Event"
  [src]="event.image | map : getAssetsPath"
/>
```

```ts name="example.ts" group="map-pipe"
getAssetsPath(filename: string): string {
  return `path/to/assets/images/folder/${filename}`
}
```

### NotDefinedPipe

Проверяет значение на `null` или `undefined` и возвращает `true`, если значение не определено. Инвертирует функционал `DefinedPipe`.

**Интерфейс**

```ts
transform(value: unknown): boolean
```

**Использование** 

```html
@if(unknownVar | notDefined) {
 <p>Значение не определено</p>
}
```

### NotEqualPipe

Сравнивает два значения на неравенство и возвращает `true`, если они не равны. Инвертирует функционал `EqualPipe`.

**Интерфейс**

```ts
transform(value: unknown, compareValue: unknown): boolean
```

**Использование** 

```html
@if(value | notEqual:otherValue) {
 <p>{%raw%}{{ value }}{%endraw%}</p>
}
```

### NotExistPipe

Инвертирует функциональность `ExistPipe` и проверяет, не содержится ли элемент в массиве, возвращая `true`, если элемент не найден.

**Интерфейс**

```ts
transform<T>(value: T, array: T[] = []): boolean
```

**Использование** 

```html
<!-- Проверяет, не содержится ли элемент в массиве -->
<p>{%raw%}{{ item | notExist:[1, 2, 3] ? 'Не содержится' : 'Содержится' }}{%endraw%}</p>
```

### NumberTransformPipe

Преобразует числа в более удобные для восприятия форматы с использованием суффиксов **K** (тысячи), **M** (миллионы) и **B** (миллиарды), в зависимости от размера числа.

**Интерфейс**

```ts
transform(value: number | string): number | string
```

**Использование** 

```html
<!-- Преобразует числовое значение в укороченный формат -->

<p>{%raw%}{{ 1500 | numberTransform }}{%endraw%}</p> 

<!-- Выведет '1.5K' -->
```

### PickPipe

Извлекает из объекта только те свойства, которые указаны в массиве ключей, и возвращает новый объект с этими свойствами.

**Интерфейс**

```ts
transform<T extends object, K extends Array<keyof T>>(
    value: T,
    keys: K,
): Pick<T, K[number]>
```

**Использование** 

```html
<!-- Выводит объект с выбранными свойствами -->

<div>{%raw%}{{ user | pick:['name', 'age'] | json }}{%endraw%}</div> 

<!-- Выведет '{"name": "John", "age": 30}' -->
```

### PickMapPipe

Извлекает определенное свойства из каждого объекта в массиве и возвращает новый массива, состоящего только из этих свойств.

**Интерфейс**

```ts
transform<T extends object>(items: T[], pickedProps: keyof T): Array<T[keyof T]>
```

**Использование** 

```ts name="example.ts" group="pick-map-pipe"
protected users: User = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Carol', email: 'carol@example.com' }
  ];
```

```html  name="example.html" group="pick-map-pipe" active
<!-- Создает массив значений указанного свойства из массива объектов -->
<ul>
  @for(name of users | pickMap:'name'; track $index) {
    <li>
      {%raw%}{{ name }}{%endraw%}
    </li>
  }
</ul>

<!-- Выведет -->
<ul>
  <li>Alice</li>
  <li>Bob</li>
  <li>Carol</li>
</ul>
```

### PluckPipe

Извлекает и возвращает значение указанного свойства из объекта. Если объект не определён, возвращает `null`.

**Интерфейс**

```ts
transform<T extends object>(value: T, key: keyof T): T[typeof key] | null
```

**Использование** 

```html
<!-- Выводит значение свойства 'name' объекта user -->
<p>{%raw%}{{ user | pluck:'name' }}{%endraw%}</p>
```

### RangePipe

Возвращает итерируемый объект, содержащий последовательность чисел или результатов выполнения переданной в него функции обработки на последовательности чисел.

**Интерфейс**

```ts
transform<T>(count: number, start: number = 0, value?: (value: number) => T): Iterable<T>
```

**Использование** 

```html name="example.html" group="range-pipe" active
<!-- Передан только параметр count -->
<ul>
  @for(number of 3 | range; track $index) {
    <li>{%raw%}{{ number }}{%endraw%}</li>
  }
</ul>

<!-- Выведет 3 последовательные числа начиная с 0 -->
<ul>
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ul>

<!-- Переданы параметры count и start -->
<ul>
  @for(number of 3 | range: 5; track $index) {
    <li>{%raw%}{{ number }}{%endraw%}</li>
  }
</ul>

<!-- Выведет 3 последовательные числа начиная с 5 -->
<ul>
  <li>5</li>
  <li>6</li>
  <li>7</li>
</ul>

<!-- Переданы все параметры (count, start и value) -->
<ul>
  @for (letter of 3 | range: 65 : fromCharCode; track $index) {
    <li>{%raw%}{{ letter }}{%endraw%}</li>
  }
</ul>

<!-- Выведет -->
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
```

```ts name="example.ts" group="range-pipe"
protected fromCharCode(value: number): string {
    return String.fromCharCode(value);
}
```

### ReplacePipe

Заменяет части строки, соответствующие регулярному выражению или строке, на другую строку.

**Интерфейс**

```ts
transform(value: string, regExp: RegExp | string, replacement: string = ''): string
```

**Использование** 

```html
<span>
<!-- вырежет все цифры 2, вывод hello world-->
  {%raw%}{{ 'hel2lo worl2d' | replace:'2' }}{%endraw%} 
</span>

<span>
<!-- вырежет все цифры 2 и заменит на "@", вывод  hel@lo worl@d -->
  {%raw%}{{ 'hel2lo worl2d' | replace:'2' : '@' }}{%endraw%}
</span>

<span>
<!-- вырежет все цифры, вывод  hello world -->
<!-- регулярку пишем в ts и прокидываем сюда переменной -->
  {%raw%}{{ 'hel2lo w1orl3d' | replace: /[\d]/gi }}{%endraw%}
</span>
```

### SanitizerPipe

Безопасно преобразует строку в безопасный HTML, URL, стиль, скрипт или URL ресурса, в зависимости от указанного типа.

**Интерфейс**

```ts
transform(value: unknown, type: TSanitizer): SafeResourceUrl | null
```

**Использование** 

```html name="example.html" group="sanitize-pipe" active
<!-- Безопасно преобразует строку в HTML -->
<div [innerHTML]="'<p>Text</p>' | sanitize:'html'"></div>
```

```ts name="sanitizer.type.ts" group="sanitize-pipe"
type TSanitizer = 'html' | 'resource-url' | 'script' | 'style' | 'url';
```

### SplitStringPipe

Разделяет строку на массив подстрок на основе указанного разделителя.

**Интерфейс**

```ts
transform(value: number | string, separator: string = ''): string[]
```

**Использование** 

```html
<!-- Разделяет строку по запятым -->
<ul>
  @for(tag of 'apple,banana,orange' | splitString : ',') {
    <li>
      {%raw%}{{ tag.trim() }}{%endraw%}
    </li>
  }
</ul>

<!--Выведет-->
<ul>
  <li>apple</li>
  <li>banana</li>
  <li>orange</li>
</ul>
```

### StringLimitPipe

Обрезает строку до указанной длины и добавляет три точки, если длина исходной строки превышает заданный лимит.

**Интерфейс**

```ts
transform(value: string, length: number, suffix: string = '...'): string
```

**Использование** 

```html
<!-- Обрезает строку до 5 символов -->
<p>{%raw%}{{ 'Hello World' | stringLimit:5 }}{%endraw%}</p>
<!-- Выведет 'Hello...' -->
```

### SymbolLimit

Аналогичен `StringLimitPipe`, но предназначен для более общего использования с числами и строками. Он обрезает содержимое до заданного количества символов и добавляет указанное окончание.

**Интерфейс**

```ts
transform(value: number | string, limit: number, endsWith: string = '...'): string
```

**Использование** 

```html
<!-- Обрезает содержимое до 3 символов -->
<p>{%raw%}{{ 12345 | symbollimit:3 }}{%endraw%}</p>
<!-- Выведет '123...' -->
```

### TagReplacerPipe

Заменяет теги в строке значениями из предоставленного объекта. Это позволяет динамически подставлять данные в строку. Внутри использует функцию `replaceTags`

**Интерфейс**

```ts
transform(value: string, tagsObj: TagsMap): string
```

**Использование** 

```html
 <!-- Заменяет теги в строке на значения из объекта -->

<p>{%raw%}{{ 'Hello, {name}!' | tagReplacer:{name: 'John'} }}{%endraw%}</p>

<!-- Выведет 'Hello, John!' -->
```

### TypeParserPipe

Преобразует значение в указанный тип данных, включая базовые типы, массивы, даты, и JSON.

**Интерфейс**

```ts
transform(value: unknown, type: TParseTypes): unknown
```

**Использование** 

```html name="example.html" group="type-parser-pipe" active
 <!-- Преобразует строковое значение в число -->
<p>{%raw%}{{ '123' | toType:'number' }}{%endraw%}</p>
<!-- Выведет 123 -->
```

```ts name="type-parser.type.ts" group="type-parser-pipe"
type TParseTypes =
  | 'boolean'
  | 'number'
  | 'string'
  | 'array'
  | 'date'
  | 'json'
  | 'stringify';
```

### WrapToArrayPipe

Оборачивает одиночное значение в массив, если оно уже не является массивом. Это удобно для унификации форматов данных.

**Интерфейс**

```ts
transform<T>(value: T | T[]): T[]
```

**Использование** 

```html
<!-- Предполагая, что 'inputData' может быть либо объектом, либо массивом объектов -->
<ul>
  @for(item of inputData | wrapToArray; track $index) {
    <li>
      {%raw%}{{ item.name }}{%endraw%}
    </li>
  }
</ul>
```
