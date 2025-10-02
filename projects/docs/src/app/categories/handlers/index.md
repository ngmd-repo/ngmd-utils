---
keyword: HandlersPage
---

Импортируется из `@ngmd/utils/handlers`

---

## Описание

Это модуль предлагает большой список функций для решения ряда типичных задач. Использование функциональности этого модуля позволяет автоматизировать процесс решения типичных задач, возникающих в ходе разработки приложения, уменьшая объем кодовой базы, а так же повышает читаемость за счет наличия удобного и понятного именования функций, выполняющих операции. 

Состоит модуль из наборов, разделенных по специфике применения. Список наборов выглядит следующим образом:

- [Condition](/handlers#condition)
- [RxJs](/handlers#rxjs)
- [String](/handlers#string)
- [Utility](/handlers#utility)


## Condition

В этом наборе представлен список функций, выполняющих действия проверки на основании условий и возврата значений типа `boolean` 

### isNotNullish

Проверяет, что значение не является _null_ или _undefined_.

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

Проверяет, что значение является _null_ или _undefined_.

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

Проверяет, что значение является указанного типа JavaScript.

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

Проверяет, что значение является объектом.

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

Проверяет, что все предоставленные значения являются указанного типа JavaScript.

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

Проверяет, что значение является экземпляром указанного конструктора.

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

Проверяет, являются ли два значения одинаковыми с использованием метода `Object.is`.

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

Проверяет, эквивалентны ли два значения на основе их JSON-представления.

```typescript
import { isEqualJSON } from '@ngmd/utils/handlers';

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const obj3 = { a: 1, b: 3 };

console.log(isEqualJSON(obj1, obj2)); // true
console.log(isEqualJSON(obj1, obj3)); // false
```

### isEmptyObject

Проверяет, пуст ли объект (не содержит собственных свойств).

```typescript
import { isEmptyObject } from '@ngmd/utils/handlers';

const emptyObj = {};
const nonEmptyObj = { key: 'value' };

console.log(isEmptyObject(emptyObj)); // true
console.log(isEmptyObject(nonEmptyObj)); // false
```

### arraysIsContain

Проверяет, содержат ли переданные массивы указанный элемент.

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

Проверяет, можно ли значение преобразовать в дату.


```typescript
import { isDate } from '@ngmd/utils/handlers';

const dateString = '2024-05-23';
const invalidDateString = 'not-a-date';

console.log(isDate(dateString)); // true
console.log(isDate(invalidDateString)); // false
```

### condition

Возвращает одно из двух значений в зависимости от условия.


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

Возвращает `true`, если все значения массива являются свойствами целевого объекта


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

Возвращает `true`, если хотя бы одно значение из массива является свойством целевого объекта

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

В этом наборе представлен список функций, являющихся **custom rxjs** операторами.

### ofType

Функция `ofType` фильтрует поток значений, пропуская только те из них, которые соответствуют одному из заданных типов действий.

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

Функция `pick` возвращает значение поля, если передан только один ключ и объект с полями-значениям, если передано от 2-ух ключей и больше.

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

Преобразует первую букву строки в заглавную.

```typescript
const result = titlecase('example');

console.log(result); // 'Example'
```

### prefix

Функция `prefix `  добавляет префикс к строке.


```typescript
const result = prefix('world', 'hello ');

console.log(result); // 'hello world'
```

### addPrefixIfNot

Добавляет префикс к строке, если префикс отсутствует.


```typescript
const result1 = addPrefixIfNot('world', 'hello ');
const result2 = addPrefixIfNot('bye world', 'bye ');

console.log(result1); // 'hello world'
console.log(result2); // 'bye world' (не добавляет)
```

### replace

Заменяет все вхождения строки на другую строку или число.


```typescript
const result = replace('hello world', 'world', 'everyone');

console.log(result); // 'hello everyone'
```

### suffix

Добавляет суффикс к строке.

```typescript
const result = suffix('hello', ' world');

console.log(result); // 'hello world'
```

### trim

Удаляет лишние пробелы в строке и обрезает пробелы по краям.


```typescript
const result = trim('   hello   world   ');

console.log(result); // 'hello world'
```

### removeSpaces

Удаляет все пробелы в строке.

```typescript
const result = removeSpaces('   hello   world   ');

console.log(result); // 'helloworld'
```

### trimStringValues

Удаляет пробелы в строковых значениях объекта.

```typescript
const obj = { name: '   Alice   ', age: 30 };

const result = trimStringValues(obj); // { name: 'Alice', age: 30 }
```

### joinUrl

Соединяет части URL.

```typescript
const result = joinUrl(['http:', '', 'example.com', 'path']);

console.log(result); // 'http://example.com/path'
```

### wrapString

Оборачивает строку заданными символами.

```typescript
const result = wrapString('hello', '*');

console.log(result); // '*hello*'
```

### testIncludeWord

Проверяет наличие слова в строке.

```typescript
const result = testIncludeWord('hello world', 'world');

console.log(result); // true
```

### lowercase

Приводит строку к нижнему регистру.

```typescript
const result = lowercase('HELLO WORLD');

console.log(result); // 'hello world'
```

### isEqualStrings

Проверяет, равны ли строки (независимо от регистра).

```typescript
const result = isEqualStrings('hello', 'Hello');

console.log(result); // true
```

### sliceStringToSegments

Разбивает строку на сегменты заданной длины.

```typescript
const result = sliceStringToSegments('hello world', 3);

console.log(result); // ['hel', 'lo ', 'wor', 'ld']
```

### removeSymbols

Удаляет указанные символы из строки.

```typescript
const result = removeSymbols('hello world!', '!');

console.log(result); // 'hello world'
```

### removeSideSymbols

Удаляет указанное количество символов с обеих сторон строки.

```typescript
import { removeSideSymbols } from '@ngmd/utils/handlers';

const originalString = "abcdef";
const countToRemove = 2;

const result = removeSideSymbols(originalString, countToRemove);

console.log(result); // "cd"
```

## Utility

### deepCopy

Функция `deepCopy` создаёт глубокую копию объекта.



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
> Так же безопасно копируются свойства, значения которых являются функциями.

### deepCopyArray

Создаёт глубокую копию массива.

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
> Так же безопасно копируются элементы, значения которых являются функциями.

### deepCopyWithGuard

Создаёт глубокую копию объекта или массива. Если значение является примитивом, то возвращается возвращается само значение без копирования. Работает аналогично функции `structuredClone`, за исключением, что `deepCopyWithGuard` безопасно копирует функции. 

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
> Так же безопасно копируются элементы, значения которых являются функциями.

### randomid

Генерирует случайный идентификатор UUID.

```typescript
const id = randomid();

console.log(id); // '3b241101-e2bb-4255-8caf-4136c566a962'
```

### nativeElement

Возвращает `nativeElement` у объекта `ElementRef` из Angular.

```ts
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

Копирует значения всех перечисляемых свойств из одного или более исходных объектов в новый целевой объект.

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

Перенаправляет пользователя на указанный URL в новом или текущем окне.

```typescript
import { redirectTo } from '@ngmd/utils/handlers';

redirectTo('https://example.com'); // Открывает страницу 'https://example.com' в новой вкладке
```

### isValidDate

Проверяет, является ли переданная дата допустимой.


```typescript
// Дано
const result = isValidDate('2024-05-21');

// Результат
console.log(result); //true
```

### copyDate

Создает копию переданной даты.

```typescript
// Дано
const originalDate = new Date('2024-05-21');

// Вызов
const copiedDate = copyDate(originalDate);

// Результат
console.log(copiedDate); // Копия даты '2024-05-21'
```

### getWeekDays

Возвращает массив дат для текущей или предыдущей недели. Если используется значение `'current-week'`, то будет возвращен массив с датами дней недели начиная с понедельника по текущий день. Т.е., если сегодня четверг, то будет возвращен массив дат длинной в 4 элемента с датами, начиная с понедельника по сегодняшний день. Для `'previous-week'` будет возвращаться всегда массив из 7 элементов с датами с понедельника по воскресенье.

**Интерфейс**

```ts
function getWeekDays(
  type: 'current-week' | 'previous-week',
  date: Date = new Date(),
): Date[] 
```

**Пример**

```typescript
// Дано
const type = 'current-week';

// Вызов
const weekDays = getWeekDays(type);

// Результат
console.log(weekDays); // Массив дат текущей недели
```

### getFirstAndLastElements

Возвращает первый и последний элементы массива.

```typescript
// Дано
const array = [1, 2, 3, 4];

// Вызов
const result = getFirstAndLastElements(array);

// Результат
console.log(result); // [1, 4]
```

### getNextSortDirection

Функция `getNextSortDirection` возвращает следующее направление сортировки.

```typescript
// Дано
const currentDirection = 'asc';

// Вызов
const nextDirection = getNextSortDirection(currentDirection);

// Результат
console.log(nextDirection); // 'desc'
```

### excludeObjValues

Исключает из объекта свойства с заданными значениями.

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

Исключает из объекта свойства с заданными ключами.

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

Исключает из объекта свойства с пустыми значениями.

```typescript
// Дано
const obj = { a: 1, b: null, c: undefined, d: 4 };

// Вызов
const result = excludeEmptyProps(obj);

// Результат
console.log(result); // { a: 1, d: 4 }
```

### pickEqualProps

Возвращает свойства объекта, которые совпадают в двух объектах.

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

Выбирает свойства объекта по заданным ключам.

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

Задает значение для всех свойств объекта.

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

Находит индекс элемента в массиве по значению его свойства.

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
Удаляет элемент из массива по значению его свойства.

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

Удаляет элемент из массива.

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

Обновляет элемент в массиве по значению его свойства.

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

Находит и объединяет элементы в массиве по значению их свойства.

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

Оборачивает строку в фигурные скобки.

```typescript
// Дано
const str = 'example';

// Вызов
const result = toTag(str);

// Результат
console.log(result); // '{{example}}'
```

### replaceTags

Заменяет теги в строке на значения из объекта тегов типа `TagsMap` из модуля `@ngmd/utils/types`.

```typescript
// Дано
const string: string =
    'String with primitive tag: {{primitive}}, signal tag: {{signal}}, function tag: {{fn}}';
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