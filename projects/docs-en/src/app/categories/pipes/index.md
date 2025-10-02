---
keyword: PipesPage
---

Imported from `@ngmd/utils/pipes`

---


## Description

This module provides a wide range of pipes for automating routine tasks and maintaining code base consistency 

## Pipes

### AffixPipe

Used to add a prefix or suffix to a string or number.

**Interface**

```ts
transform(
  value: number | string,
  tag: number | string,
  placement: 'begin' | 'end' = 'end',
): string
```

**Usage**

```html
<!-- Adding suffix to base string --> 
<p>{%raw%}{{ 'John' | affix:'Doe':'end' }}{%endraw%}</p> <!-- Outputs: JohnDoe -->

<p>{%raw%}{{ 'Doe' | affix:'John':'begin' }}{%endraw%}</p> <!-- Outputs: JohnDoe -->
```

### ConditionPipe

Returns one of two values based on the provided condition.

**Interface**

```ts
transform<V1, V2>(
  condition: unknown, 
  ifValue: V1, 
  elseValue: V2
): V1 | V2
```

**Usage**

```html
<p>{%raw%}{{ isVisible() | condition:'ifValue':'elseValue' }}{%endraw%}</p>
```

### CurrencySymbolPipe

Converts currency code to the corresponding currency symbol.

**Interface**

```ts
transform(value: string): string
```

**Usage**

```html name="example.html" group="currency-symbol-pipe" active
<p>{%raw%}{{ 'USD' | currencySymbol }}{%endraw%}</p> 
<!-- Outputs: $ -->
```

```ts group="currency-symbol-pipe" name="currency-symbols-list.ts" file="../../../../../utils/pipes/src/currency-symbol.pipe.ts"#L1
```

### DefaultValuePipe

Used to display a default value if the passed value is undefined or empty.

**Interface**

```ts
transform<T, V>(value: T, defaultValue: V): T | V
```

**Usage**

```html
<p>{%raw%}{{ user.name | defaultValue:'Anonymous' }}{%endraw%}</p>
```

### DefinedPipe

Checks value for `null` or `undefined`, but doesn't react to empty string or other **falsy** values that may be considered valid.

**Interface**

```ts
transform(value: unknown): boolean
```

**Usage**

```html 
@if(some.value | defined) {
  <p>Content</p>
}
```

### EndsWithPipe

Checks if a string ends with the specified suffix. Returns `true` if the string ends with the suffix, and `false` otherwise.

**Interface**

```ts
transform(value: string, suffix: string): boolean
```

**Usage**

```html 
@for(comment of comments; track $index) {
  <p [class.highlight]="comment.text | endsWith:'?'">
    {%raw%}{{ comment.text }}{%endraw%}
  </p>
}
```

### EqualPipe

Compares two values and returns `true` if they are equal.

**Interface**

```ts
transform(predicate: unknown, value: unknown): boolean
```

**Usage**

```html name="example-one.html" group="equal-pipe"
@if(btnType | equal : 'info') {
  <button (click)="showInfo()">Info</button>
}
```

```html name="example-two.html" group="equal-pipe"
<input [attr.maxlength]="maxLength | equal:0 | condition:null:maxLength">
```

### ExcludePropertiesPipe

Removes specified properties from an object and returns a new object without these properties.

**Interface**

```ts
transform<T extends object, K extends Array<keyof T>>(
    object: T,
    props: K,
): { [Q in K[number]]: T[Q] }
```

**Usage**

```html name="example.html" group="exclude-props-pipe" active
@for(user of users; track $index) {
  <pre>
    {%raw%}{{ user | excludeProps:['password', 'secretQuestion'] | json }}{%endraw%}
  </pre>
}
<!-- 
  {
    name : "John Doe",
    email: "johndoe@example.com"
  }
  -->
```

```ts name="example.ts" group="exclude-props-pipe"
protected users: User[] = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "123456",
    secretQuestion: "Name of your first pet?"
  },
];
```

### ExistPipe

Checks if a value is contained in an array and returns `true` if the value is found in the array.

**Interface**

```ts
transform<T>(value: T, array: T[] = []): boolean
```

**Usage** 

`ExistPipe` with `ConditionPipe` combination:

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

Filters an array of objects, returning those objects that contain the specified substring in a particular field.

**Interface**

```ts
transform<T extends object>(array: T[], field: keyof T, findStr: string): T[]
```

**Usage** 

`FilterPipe` usage example:

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

Checks if an element is contained in an array and returns `true` if the element is found, and `false` otherwise.

**Interface**

```ts
transform<T>(items: T[], item: T): boolean
```

**Usage** 

```html
<!-- Checks if number 5 is contained in the array of numbers -->

<p>{%raw%}{{ [1, 2, 3, 5, 7] | includes:5 }}{%endraw%}</p> 

<!-- Will output 'true' -->
```

### JsTypePipe

Checks if a value matches the given **JavaScript** data type, including special check for `date` type.

**Interface**

```ts
transform(value: unknown, type: TJSDataType | 'date'): boolean;
```

**Usage** 

```html name="example.html" group="Js-type-pipe" active
<!-- Checks if object is a date -->

<p>{%raw%}{{ someValue | isJSType:'date' }}{%endraw%}</p> 

<!-- Will output 'true' or 'false' -->
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

Applies the provided handler function to a value and returns the result.

**Interface**

```ts
transform<T, G>(value: T, mapHandler: (v: T, ...args: any[]) => G, ...args: unknown[]): G
```

**Usage** 

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

Checks value for `null` or `undefined` and returns `true` if the value is not defined. Inverts `DefinedPipe` functionality.

**Interface**

```ts
transform(value: unknown): boolean
```

**Usage** 

```html
@if(unknownVar | notDefined) {
 <p>Value is not defined</p>
}
```

### NotEqualPipe

Compares two values for inequality and returns `true` if they are not equal. Inverts `EqualPipe` functionality.

**Interface**

```ts
transform(value: unknown, compareValue: unknown): boolean
```

**Usage** 

```html
@if(value | notEqual:otherValue) {
 <p>{%raw%}{{ value }}{%endraw%}</p>
}
```

### NotExistPipe

Inverts `ExistPipe` functionality and checks if an element is not contained in an array, returning `true` if the element is not found.

**Interface**

```ts
transform<T>(value: T, array: T[] = []): boolean
```

**Usage** 

```html
<!-- Checks if element is not contained in array -->
<p>{%raw%}{{ item | notExist:[1, 2, 3] ? 'Not contained' : 'Contained' }}{%endraw%}</p>
```

### NumberTransformPipe

Transforms numbers into more readable formats using suffixes **K** (thousands), **M** (millions) and **B** (billions), depending on the number size.

**Interface**

```ts
transform(value: number | string): number | string
```

**Usage** 

```html
<!-- Transforms numeric value to shortened format -->

<p>{%raw%}{{ 1500 | numberTransform }}{%endraw%}</p> 

<!-- Will output '1.5K' -->
```

### PickPipe

Extracts from an object only those properties that are specified in the keys array and returns a new object with these properties.

**Interface**

```ts
transform<T extends object, K extends Array<keyof T>>(
    value: T,
    keys: K,
): Pick<T, K[number]>
```

**Usage** 

```html
<!-- Outputs object with selected properties -->

<div>{%raw%}{{ user | pick:['name', 'age'] | json }}{%endraw%}</div> 

<!-- Will output '{"name": "John", "age": 30}' -->
```

### PickMapPipe

Extracts specific properties from each object in an array and returns a new array consisting only of these properties.

**Interface**

```ts
transform<T extends object>(items: T[], pickedProps: keyof T): Array<T[keyof T]>
```

**Usage** 

```ts name="example.ts" group="pick-map-pipe"
protected users: User = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Carol', email: 'carol@example.com' }
  ];
```

```html  name="example.html" group="pick-map-pipe" active
<!-- Creates array of values of specified property from array of objects -->
<ul>
  @for(name of users | pickMap:'name'; track $index) {
    <li>
      {%raw%}{{ name }}{%endraw%}
    </li>
  }
</ul>

<!-- Will output -->
<ul>
  <li>Alice</li>
  <li>Bob</li>
  <li>Carol</li>
</ul>
```

### PluckPipe

Extracts and returns the value of the specified property from an object. If the object is not defined, returns `null`.

**Interface**

```ts
transform<T extends object>(value: T, key: keyof T): T[typeof key] | null
```

**Usage** 

```html
<!-- Outputs value of 'name' property from user object -->
<p>{%raw%}{{ user | pluck:'name' }}{%endraw%}</p>
```

### RangePipe

Returns an iterable object containing a sequence of numbers or results of executing the handler function passed to it on a sequence of numbers.

**Interface**

```ts
transform<T>(count: number, start: number = 0, value?: (value: number) => T): Iterable<T>
```

**Usage** 

```html name="example.html" group="range-pipe" active
<!-- Only count parameter passed -->
<ul>
  @for(number of 3 | range; track $index) {
    <li>{%raw%}{{ number }}{%endraw%}</li>
  }
</ul>

<!-- Will output 3 consecutive numbers starting from 0 -->
<ul>
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ul>

<!-- Count and start parameters passed -->
<ul>
  @for(number of 3 | range: 5; track $index) {
    <li>{%raw%}{{ number }}{%endraw%}</li>
  }
</ul>

<!-- Will output 3 consecutive numbers starting from 5 -->
<ul>
  <li>5</li>
  <li>6</li>
  <li>7</li>
</ul>

<!-- All parameters passed (count, start and value) -->
<ul>
  @for (letter of 3 | range: 65 : fromCharCode; track $index) {
    <li>{%raw%}{{ letter }}{%endraw%}</li>
  }
</ul>

<!-- Will output -->
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

Replaces parts of a string that match a regular expression or string with another string.

**Interface**

```ts
transform(value: string, regExp: RegExp | string, replacement: string = ''): string
```

**Usage** 

```html
<span>
<!-- will cut all digits 2, output hello world-->
  {%raw%}{{ 'hel2lo worl2d' | replace:'2' }}{%endraw%} 
</span>

<span>
<!-- will cut all digits 2 and replace with "@", output  hel@lo worl@d -->
  {%raw%}{{ 'hel2lo worl2d' | replace:'2' : '@' }}{%endraw%}
</span>

<span>
<!-- will cut all digits, output  hello world -->
<!-- write regex in ts and pass here as variable -->
  {%raw%}{{ 'hel2lo w1orl3d' | replace: /[\d]/gi }}{%endraw%}
</span>
```

### SanitizerPipe

Safely converts a string to safe HTML, URL, style, script or resource URL, depending on the specified type.

**Interface**

```ts
transform(value: unknown, type: TSanitizer): SafeResourceUrl | null
```

**Usage** 

```html name="example.html" group="sanitize-pipe" active
<!-- Safely converts string to HTML -->
<div [innerHTML]="'<p>Text</p>' | sanitize:'html'"></div>
```

```ts name="sanitizer.type.ts" group="sanitize-pipe"
type TSanitizer = 'html' | 'resource-url' | 'script' | 'style' | 'url';
```

### SplitStringPipe

Splits a string into an array of substrings based on the specified separator.

**Interface**

```ts
transform(value: number | string, separator: string = ''): string[]
```

**Usage** 

```html
<!-- Splits string by commas -->
<ul>
  @for(tag of 'apple,banana,orange' | splitString : ',') {
    <li>
      {%raw%}{{ tag.trim() }}{%endraw%}
    </li>
  }
</ul>

<!--Will output-->
<ul>
  <li>apple</li>
  <li>banana</li>
  <li>orange</li>
</ul>
```

### StringLimitPipe

Truncates a string to the specified length and adds three dots if the original string length exceeds the given limit.

**Interface**

```ts
transform(value: string, length: number, suffix: string = '...'): string
```

**Usage** 

```html
<!-- Truncates string to 5 characters -->
<p>{%raw%}{{ 'Hello World' | stringLimit:5 }}{%endraw%}</p>
<!-- Will output 'Hello...' -->
```

### SymbolLimit

Similar to `StringLimitPipe`, but designed for more general use with numbers and strings. It truncates content to the specified number of characters and adds the specified ending.

**Interface**

```ts
transform(value: number | string, limit: number, endsWith: string = '...'): string
```

**Usage** 

```html
<!-- Truncates content to 3 characters -->
<p>{%raw%}{{ 12345 | symbollimit:3 }}{%endraw%}</p>
<!-- Will output '123...' -->
```

### TagReplacerPipe

Replaces tags in a string with values from the provided object. This allows dynamic data substitution in strings. Uses `replaceTags` function internally.

**Interface**

```ts
transform(value: string, tagsObj: TagsMap): string
```

**Usage** 

```html
 <!-- Replaces tags in string with values from object -->

<p>{%raw%}{{ 'Hello, {name}!' | tagReplacer:{name: 'John'} }}{%endraw%}</p>

<!-- Will output 'Hello, John!' -->
```

### TypeParserPipe

Converts value to the specified data type, including basic types, arrays, dates, and JSON.

**Interface**

```ts
transform(value: unknown, type: TParseTypes): unknown
```

**Usage** 

```html name="example.html" group="type-parser-pipe" active
 <!-- Converts string value to number -->
<p>{%raw%}{{ '123' | toType:'number' }}{%endraw%}</p>
<!-- Will output 123 -->
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

Wraps a single value in an array if it's not already an array. This is convenient for unifying data formats.

**Interface**

```ts
transform<T>(value: T | T[]): T[]
```

**Usage** 

```html
<!-- Assuming 'inputData' can be either an object or an array of objects -->
<ul>
  @for(item of inputData | wrapToArray; track $index) {
    <li>
      {%raw%}{{ item.name }}{%endraw%}
    </li>
  }
</ul>
```
