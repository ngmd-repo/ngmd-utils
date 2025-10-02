---
keyword: HandlersPage
---

Imported from `@ngmd/utils/handlers`

---

## Description

This module offers a large set of functions for solving a range of common tasks. Using the functionality of this module helps automate the process of solving typical problems encountered during application development, reduces codebase size, and improves readability thanks to convenient and clear function naming.

The module consists of sets divided by application specificity. The list of sets is as follows:

- [Condition](/handlers#condition)
- [RxJs](/handlers#rxjs)
- [String](/handlers#string)
- [Utility](/handlers#utility)

## Condition

This set contains functions that perform checks based on conditions and return `boolean` values.

### isNotNullish

Checks that a value is not _null_ or _undefined_.

```typescript
import { isNotNullish } from '@ngmd/utils/handlers';

const value1 = 'тест';
const value2 = null;
const value3 = undefined;
const value4 = 0;
const value5 = '';

const result1 = isNotNullish(value1);
const result2 = isNotNullish(value2);
const result3 = isNotNullish(value3);
const result4 = isNotNullish(value4);
const result5 = isNotNullish(value5);

console.log(result1); // true
console.log(result2); // false
console.log(result3); // false
console.log(result4); // true
console.log(result5); // true
```

### isNullish

Checks that a value is _null_ or _undefined_.

```typescript
import { isNullish } from '@ngmd/utils/handlers';

const value1 = 'тест';
const value2 = null;
const value3 = undefined;
const value4 = 0;
const value5 = '';

const result1 = isNullish(value1);
const result2 = isNullish(value2);
const result3 = isNullish(value3);
const result4 = isNullish(value4);
const result5 = isNullish(value5);

console.log(result1); // false
console.log(result2); // true
console.log(result3); // true
console.log(result4); // false
console.log(result5); // false
```

### isJSType

Checks that a value is of the specified JavaScript type.

```typescript
import { isJSType } from '@ngmd/utils/handlers';

const value1 = 'тест';
const value2 = 123;
const value3 = {};

const result1 = isJSType(value1, 'string');
const result2 = isJSType(value2, 'number');
const result3 = isJSType(value3, 'object');

console.log(result1); // true
console.log(result2); // true
console.log(result3); // true
```

### isObject

Checks that a value is an object.

```typescript
import { isObject } from '@ngmd/utils/handlers';

const value1 = {};
const value2 = [];
const value3 = 'тест';

const result1 = isObject(value1);
const result2 = isObject(value2);
const result3 = isObject(value3);

console.log(result1); // true
console.log(result2); // false
console.log(result3); // false

```

### isEveryJSType

Checks that all provided values are of the specified JavaScript type.

```typescript
import { isEveryJSType } from '@ngmd/utils/handlers';

const values1 = ['тест', 'привет'];
const values2 = [1, 2, '3'];

const result1 = isEveryJSType('string', ...values1);
const result2 = isEveryJSType('number', ...values2);

console.log(result1); // true
console.log(result2); // false
```

### isInstance

Checks that a value is an instance of the specified constructor.

```typescript
import { isInstance } from '@ngmd/utils/handlers';

class MyClass {}

const instance = new MyClass();
const value = {};

const result1 = isInstance(instance, MyClass); 
const result2 = isInstance(value, MyClass);

console.log(result1); // true
console.log(result2); // false
```

### isEqual

Checks if two values are the same using `Object.is`.

```typescript
import { isEqual } from '@ngmd/utils/handlers';

const a = 'test';
const b = 'test';
const c = 'Test';

console.log(isEqual(a, b)); // true
console.log(isEqual(a, c)); // false
console.log(isEqual(0, -0)); // false
console.log(isEqual(NaN, NaN)); // true
```

### isEqualJSON

Checks if two values are equivalent based on their JSON representation.

```typescript
import { isEqualJSON } from '@ngmd/utils/handlers';

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const obj3 = { a: 1, b: 3 };

console.log(isEqualJSON(obj1, obj2)); // true
console.log(isEqualJSON(obj1, obj3)); // false
```

### isEmptyObject

Checks if an object is empty (has no own properties).

```typescript
import { isEmptyObject } from '@ngmd/utils/handlers';

const emptyObj = {};
const nonEmptyObj = { key: 'value' };

console.log(isEmptyObject(emptyObj)); // true
console.log(isEmptyObject(nonEmptyObj)); // false
```

### arraysIsContain

Checks if the provided arrays contain the specified element.

```typescript
import { arraysIsContain } from '@ngmd/utils/handlers';

const arrays = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(arraysIsContain(5, ...arrays)); // true
console.log(arraysIsContain(10, ...arrays)); // false
```

### isDate

Checks if a value can be converted to a date.

```typescript
import { isDate } from '@ngmd/utils/handlers';

const dateString = '2024-05-23';
const invalidDateString = 'not-a-date';

console.log(isDate(dateString)); // true
console.log(isDate(invalidDateString)); // false
```

### condition

Returns one of two values depending on the condition.

```typescript
import { condition } from '@ngmd/utils/handlers';

const isAuthenticated = true;
const user = 'John Doe';
const guest = 'Guest';

const displayName = condition(isAuthenticated, user, guest);

console.log(displayName); // 'John Doe'

const isAdmin = false;
const adminMessage = 'Welcome, admin!';
const userMessage = 'Welcome, user!';
const message = condition(isAdmin, adminMessage, userMessage);

console.log(message); // 'Welcome, user!'
```

### isExistAllObjectFields

Returns `true` if all values in the array are properties of the target object.

```typescript
import { isExistAllObjectFields } from '@ngmd/utils/handlers';

type SomeObject = { a: number; b: number; c: number }

const object: SomeObject  = { a: 1, b: 2, c: 3 };

const allKeys: boolean = isExistAllObjectFields(object, ['a','c']); // все ключи есть в объекте
const notAllKeys: boolean = isExistAllObjectFields(object, ['o','a','b']); // ключа 'o' нет в объекте

console.log(allKeys); // true
console.log(notAllKeys); // false
```

### isExistSomeFieldInObject

Returns `true` if at least one value from the array is a property of the target object.

```typescript
import { isExistSomeFieldInObject } from '@ngmd/utils/handlers';

type SomeObject = { a: number; b: number; c: number }

const object: SomeObject  = { a: 1, b: 2, c: 3 };

const haveKeys: boolean = isExistSomeFieldInObject(object, ['a','o']); // значение 'a' является свойством объекта
const dontHaveKeys: boolean = isExistSomeFieldInObject(object, ['o','z']); // ни одно значение не является свойством объекта

console.log(haveKeys); // true
console.log(dontHaveKeys); // false
```

## RxJs

This set contains functions that are **custom rxjs** operators.

### ofType

The `ofType` function filters a stream of values, passing only those that match one of the specified action types.

```typescript
import { of } from 'rxjs';
import { ofType } from '@ngmd/utils/handlers';
import { filter } from 'rxjs/operators';

const action$ = of('LOAD_DATA', 'LOAD_DATA_SUCCESS', 'LOAD_DATA_FAILURE', 'SAVE_DATA');

action$
    .pipe(ofType('LOAD_DATA', 'SAVE_DATA'))
    .subscribe(action => console.log(action));

// Результат
// 'LOAD_DATA'
// 'SAVE_DATA'

```

### pick

The `pick` function returns the value of a field if only one key is passed, or an object with key-value pairs if two or more keys are passed.

```typescript
import { of } from 'rxjs';
import { pick } from '@ngmd/utils/handlers';
import { filter } from 'rxjs/operators';

type TUser = { id: number, email: string, name: string, lastName: string };
type TFullName = { name: string, lastName: string };

const user: TUser = { id: 1, email: "example@email.com", name: "John", lastName: "Doe" }

const onlyId$ = of(user).pipe(pick('id'));
const fullName$ = of(user).pipe(pick('name', 'lastName'));

onlyId$.subscribe((id: number) => console.log(id)); // 1
fullName$.subscribe((fullName: TFullName) => console.log(fullName)); // { name: "John", lastName: "Doe" }
```

## String

### titlecase

Converts the first letter of a string to uppercase.

```typescript
const result = titlecase('example');

console.log(result); // 'Example'
```

### prefix

The `prefix` function adds a prefix to a string.


```typescript
const result = prefix('world', 'hello ');

console.log(result); // 'hello world'
```

### addPrefixIfNot

Adds a prefix to a string if the prefix is not already present.


```typescript
const result1 = addPrefixIfNot('world', 'hello ');
const result2 = addPrefixIfNot('bye world', 'bye ');

console.log(result1); // 'hello world'
console.log(result2); // 'bye world' (не добавляет)
```

### replace

Replaces all occurrences of a string with another string or number.


```typescript
const result = replace('hello world', 'world', 'everyone');

console.log(result); // 'hello everyone'
```

### suffix

Adds a suffix to a string.

```typescript
const result = suffix('hello', ' world');

console.log(result); // 'hello world'
```

### trim

Removes extra spaces in a string and trims spaces from the edges.


```typescript
const result = trim('   hello   world   ');

console.log(result); // 'hello world'
```

### removeSpaces

Removes all spaces from a string.

```typescript
const result = removeSpaces('   hello   world   ');

console.log(result); // 'helloworld'
```

### trimStringValues

Removes spaces from string values in an object.

```typescript
const obj = { name: '   Alice   ', age: 30 };

const result = trimStringValues(obj); // { name: 'Alice', age: 30 }
```

### joinUrl

Joins parts of a URL.

```typescript
const result = joinUrl(['http:', '', 'example.com', 'path']);

console.log(result); // 'http://example.com/path'
```

### wrapString

Wraps a string with specified characters.

```typescript
const result = wrapString('hello', '*');

console.log(result); // '*hello*'
```

### testIncludeWord

Checks if a word is present in a string.

```typescript
const result = testIncludeWord('hello world', 'world');

console.log(result); // true
```

### lowercase

Converts a string to lowercase.

```typescript
const result = lowercase('HELLO WORLD');

console.log(result); // 'hello world'
```

### isEqualStrings

Checks if strings are equal (case-insensitive).

```typescript
const result = isEqualStrings('hello', 'Hello');

console.log(result); // true
```

### sliceStringToSegments

Splits a string into segments of a specified length.

```typescript
const result = sliceStringToSegments('hello world', 3);

console.log(result); // ['hel', 'lo ', 'wor', 'ld']
```

### removeSymbols

Removes specified symbols from a string.

```typescript
const result = removeSymbols('hello world!', '!');

console.log(result); // 'hello world'
```

### removeSideSymbols

Removes a specified number of symbols from both sides of a string.

```typescript
import { removeSideSymbols } from '@ngmd/utils/handlers';

const originalString = "abcdef";
const countToRemove = 2;

const result = removeSideSymbols(originalString, countToRemove);

console.log(result); // "cd"
```

## Utility

### deepCopy

The `deepCopy` function creates a deep copy of an object.



```typescript
// Дано
const originalObject = { 
  a: 1, 
  b: { c: 2 },
  x: {
    y: () => console.log('Z'),
  } 
};

// Вызов
const copiedObject = deepCopy(originalObject);

// Результат
console.log(copiedObject); // { a: 1, b: { c: 2 } }
console.log(originalObject === copiedObject); // false
originalObject.x.y() // "Z"
copiedObject.x.y() // "Z"
```

> **NOTE**
> Properties whose values are functions are also safely copied.

### deepCopyArray

Creates a deep copy of an array.

```typescript

// Object
const originalObject = {
  a: 1,
  b: { c: 2 },
};
const copiedObject = deepCopyWithGuard(originalObject);

console.log(copiedObject); // { a: 1, b: { c: 2 } }
console.log(originalObject === copiedObject); // false

// Array
const originalArray: any = [
  { a: 1 },
  { b: 2 },
];
const copiedArray = deepCopyWithGuard(originalArray);

console.log(copiedArray); // [{ a: 1 }, { b: 2 }]
console.log(originalArray === copiedArray); // false


// Primitive
const primitiveValue = deepCopyWithGuard('Hello world');

console.log(primitiveValue); // 'Hello world'
```

> **NOTE**
> Elements whose values are functions are also safely copied.

### deepCopyWithGuard

Creates a deep copy of an object or array. If the value is a primitive, it returns the value itself without copying. Works similarly to `structuredClone`, except that `deepCopyWithGuard` safely copies functions.

```typescript
// Дано
const originalArray = [
  { a: 1 }, 
  { b: 2 }, 
  [
    () => console.log('Hello world')
  ]
];

// Вызов
const copiedArray = deepCopyArray(originalArray);

// Результат
console.log(copiedArray); // [ { a: 1 }, { b: 2 }, [() => console.log('Hello world')] ]
console.log(originalArray === copiedArray); // false
originalArray[2][0]() // "Hello world"
copiedArray[2][0]() // "Hello world"
```

> **NOTE**
> Elements whose values are functions are also safely copied.

### randomid

Generates a random UUID.

```typescript
const id = randomid();

console.log(id); // '3b241101-e2bb-4255-8caf-4136c566a962'
```

### nativeElement

Returns the `nativeElement` of an Angular `ElementRef` object.

```typescript
import { Directive, ElementRef } from '@angular/core';
import { nativeElement } from '@ngmd/utils/handlers';

@Directive({/*...*/})
export class ExampleDirective {
  private $el: ElementRef<HTMLElement> = inject(ElementRef);

  private exampleMethod(): void {
    const $el: HTMLElement = nativeElement(this.$el);

    console.log($el); // HTMLElement
  }
}
```

### assign

Copies the values of all enumerable properties from one or more source objects to a new target object.

```typescript
// Дано
const target = { a: 1 };
const source = { b: 2 };

// Вызов
const result = assign(target, source);

// Результат
console.log(result); // { a: 1, b: 2 }
```

### redirectTo

Redirects the user to the specified URL in a new or current window.

```typescript
import { redirectTo } from '@ngmd/utils/handlers';

redirectTo('https://example.com'); // Открывает страницу 'https://example.com' в новой вкладке
```

### isValidDate

Checks if the provided date is valid.

```typescript
// Дано
const result = isValidDate('2024-05-21');

// Результат
console.log(result); //true
```

### copyDate

Creates a copy of the provided date.

```typescript
// Дано
const originalDate = new Date('2024-05-21');

// Вызов
const copiedDate = copyDate(originalDate);

// Результат
console.log(copiedDate); // Копия даты '2024-05-21'
```

### getWeekDays

Returns an array of dates for the current or previous week. If `'current-week'` is used, returns an array of dates from Monday to the current day. If `'previous-week'` is used, always returns an array of 7 dates from Monday to Sunday.

**Interface**

```ts
function getWeekDays(
  type: 'current-week' | 'previous-week',
  date: Date = new Date(),
): Date[] 
```

**Example**

```typescript
// Дано
const type = 'current-week';

// Вызов
const weekDays = getWeekDays(type);

// Результат
console.log(weekDays); // Массив дат текущей недели
```

### getFirstAndLastElements

Returns the first and last elements of an array.

```typescript
// Дано
const array = [1, 2, 3, 4];

// Вызов
const result = getFirstAndLastElements(array);

// Результат
console.log(result); // [1, 4]
```

### getNextSortDirection

The `getNextSortDirection` function returns the next sort direction.

```typescript
// Дано
const currentDirection = 'asc';

// Вызов
const nextDirection = getNextSortDirection(currentDirection);

// Результат
console.log(nextDirection); // 'desc'
```

### excludeObjValues

Excludes object properties with specified values.

```typescript
// Дано
const obj = { a: 1, b: null, c: undefined, d: 4 };
const valuesToExclude = [null, undefined];

// Вызов
const result = excludeObjValues(obj, valuesToExclude);

// Результат
console.log(result); // { a: 1, d: 4 }
```

### excludeObjProps

Excludes object properties with specified keys.

```typescript
// Дано
const obj = { a: 1, b: 2, c: 3, d: 4 };
const keysToExclude = ['b', 'd'];

// Вызов
const result = excludeObjProps(obj, keysToExclude);

// Результат
console.log(result); // { a: 1, c: 3 }
```

### excludeEmptyProps

Excludes object properties with empty values.

```typescript
// Дано
const obj = { a: 1, b: null, c: undefined, d: 4 };

// Вызов
const result = excludeEmptyProps(obj);

// Результат
console.log(result); // { a: 1, d: 4 }
```

### pickEqualProps

Returns object properties that match in two objects.

```typescript
// Дано
const parent = { a: 1, b: 2, c: 3 };
const child = { a: 1, b: 22, c: 3 };

// Вызов
const result = pickEqualProps(parent, child);

// Результат
console.log(result); // { a: 1, c: 3 }
```

### selectObjectProps

Selects object properties by specified keys.

```typescript
// Дано
const obj = { a: 1, b: 2, c: 3, d: 4 };
const propsToSelect = ['a', 'd'];

// Вызов
const result = selectObjectProps(obj, propsToSelect);

// Результат
console.log(result); // { a: 1, d: 4 }
```

### setObjectValues

Sets the value for all properties of an object.

```typescript
// Дано
const obj = { a: 1, b: 2, c: 3 };
const value = 0;

// Вызов
const result = setObjectValues(obj, value);

// Результат
console.log(result); // { a: 0, b: 0, c: 0 }
```

### findIndexByProp

Finds the index of an array element by the value of its property.

```typescript
// Дано
const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
const prop = 'id';
const value = 2;

// Вызов
const result = findIndexByProp(items, prop, value);

// Результат
console.log(result); // 1
```

### removeItemByProp

Removes an element from an array by the value of its property.

```typescript
// Дано
const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
const item = { id: 2 };
const prop = 'id';

// Вызов
const result = removeItemByProp(items, item, prop);

// Результат
console.log(result); // [{ id: 1 }, { id: 3 }]
```

### removeItem

Removes an element from an array.

```typescript
// Дано
const items = [1, 2, 3];
const item = 2;

// Вызов
const result = removeItem(items, item);

// Результат
console.log(result); // [1, 3]
```

### updateItem

Updates an element in an array by the value of its property.

```typescript
// Дано
const items = [{ id: 1, value: 'a' }, { id: 2, value: 'b' }];
const item = { id: 2, value: 'c' };
const prop = 'id';

// Вызов
const result = updateItem(items, item, prop);

// Результат
console.log(result); // [{ id: 1, value: 'a' }, { id: 2, value: 'c' }]
```

### findAndMergeItems

Finds and merges elements in an array by the value of their property.

```typescript
// Дано
const newItems = [{ id: 2, value: 'c' }];
const currentItems = [{ id: 1, value: 'a' }, { id: 2, value: 'b' }];
const prop = 'id';

// Вызов
const result = findAndMergeItems(newItems, currentItems, prop);

// Результат
console.log(result); // [{ id: 1, value: 'a' }, { id: 2, value: 'c' }]
```

### createRangeArray

Создает массив чисел в заданном диапазоне.

```typescript
// Дано
const from = 1;
const to = 5;

// Вызов
const result = createRangeArray(from, to);

// Результат
console.log(result); // [1, 2, 3, 4]
```

### toFixed

Округляет число до указанного количества знаков после запятой.

```typescript
// Дано
const num = 1.23456;
const fixed = 2;

// Вызов
const result = toFixed(num, fixed);

// Результат
console.log(result); // 1.23
```

### sumNumber

Выполняет сложение или вычитание двух чисел, учитывая возможное наличие дробной части.

```typescript
// Дано
const a = 1.5;
const b = 2.25;
const action = 'inc';

// Вызов
const result = sumNumber(a, b, action);

// Результат
console.log(result); // 3.75
```

### toTag

Wraps a string in curly braces.

```typescript
// Дано
const str = 'example';

// Вызов
const result = toTag(str);

// Результат
console.log(result); // '{%raw%}{{example}}{%endraw%}'
```

### replaceTags

Replaces tags in a string with values from a tags object of type `TagsMap` from the `@ngmd/utils/types` module.

```typescript
// Дано
const string: string =
    'String with primitive tag: {%raw%}{{primitive}}{%endraw%}, signal tag: {%raw%}{{signal}}{%endraw%}, function tag: {%raw%}{{fn}}{%endraw%}';
const primitive: string = 'primitive';
const signal: WritableSignal<boolean> = signal(false);
const fn = () => 1000;
const tagsObj: TagsMap = { primitive, signal, fn };

// Вызов
const result = replaceTags(str, tagsObj);

// Результат
console.log(result); // 'String with primitive tag: primitive, signal tag: false, function tag: 1000'
```

### getEnumMap

Возвращает карту ключей и значений перечисления.

```typescript
// Дано
enum ExampleEnum {
  First = 1,
  Second = 2,
}

// Вызов
const result = getEnumMap(ExampleEnum);

// Результат
console.log(result); // { keys: ['First', 'Second'], values: [1, 2] }
```

### wrapToArray

Оборачивает значение в массив, если оно таковым не является.

```typescript
// Дано
const num = 1;
const arr = [1, 2, 3];

// Вызов
const result1 = wrapToArray(num); 
const result2 = wrapToArray(arr); // Вернет новый массив

// Результат
console.log(result1); // [1]
console.log(result2); // [1, 2, 3]
```

### serializeSimpleChanges

Предназначена для преобразования объекта **SimpleChanges** в простой объект, где значения представляют собой текущие значения свойств. В Angular **SimpleChanges** используется для отслеживания изменений входных свойств компонента, и он имеет структуру, включающую как текущее, так и предыдущее значения, а также информацию о первом изменении.

Функция `serializeSimpleChanges` упрощает структуру, сохраняя только текущие значения свойств, что может быть полезно для логирования, передачи данных или других случаев, когда необходимо только текущее состояние свойств.
```typescript
// Дано
const changes: SimpleChanges = {
exampleProp: {
  currentValue: 'newValue',
  previousValue: 'oldValue',
  firstChange: false,
  isFirstChange: () => false,
  },
};

// Вызов
const result = serializeSimpleChanges(changes);

// Результат
console.log(result); // { exampleProp: 'newValue' }
```

### fillObject

Заполняет все свойства объекта заданным значением.

```typescript
// Дано
const obj = { a: 1, b: 2, c: 3 };
const value = 0;

// Вызов
const result = fillObject(obj, value);

// Результат
console.log(result); // { a: 0, b: 0, c: 0 }
```

### recordObject

Создает объект, в котором ключи задаются массивом строк, а значения - заданным значением.

```typescript
// Дано
const fields = ['a', 'b', 'c'] as const;
const value = 0;

// Вызов
const result = recordObject(fields, value);

// Результат
console.log(result); // { a: 0, b: 0, c: 0 }
```

### deepReplaceValue

Проходит по переданной сущности и заменяет значение из второго аргумента на значения из третьего. По умолчанию заменяет пустые строки на null.

```typescript
// Дано
const data = { 
  a: 'John',
  b: '',
  c: ['John', '', 30]
} as const;

// Вызов
const result = deepReplaceValue(data);
const result2 = deepReplaceValue(data, 'John', 'Ivan');

// Результат
console.log(result); // { a: 'John', b: null, c: ['John', null, 30] }
console.log(result2); // { a: 'Ivan', b: '', c: ['Ivan', '', 30] }
```