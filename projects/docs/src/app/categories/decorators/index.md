---
keyword: DecoratorsPage
---

Импортируется из `@ngmd/utils/decorators`

---

## Описание

Данный модуль предоставляет небольшой список `typescript` декораторов для упрощения и оптимизации кодовой базы.


## Decorators

### Bind

Автоматически привязывает метод к контексту экземпляра класса, гарантируя, что _this_ всегда ссылается на правильный объект.

**Интерфейс**

```ts
function Bind(ctx?: unknown): MethodDecorator;
```

**Параметры**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ctx** | `unknown` | `false` | `undefined` | Используется при необходимости замены контекста. По-умолчанию всегда выполняется в рамках контекста экземпляра класса. |

**Использование**

В данном примере контекст внутри пайпа `map` теряется, потому что пайп вызывает метод без явного привязывания контекста к исходному классу. Декоратор `Bind` решает эту проблему, гарантируя, что метод всегда будет вызываться с правильным контекстом.

```ts name="example.component.ts" group="bind-example" {1, 11}
import { Bind } from '@ngmd/utils/decorators';

@Component({
  imports: [MapPipe]
})
class ExampleComponent {
  private article: IArticle = {
    author: { name: 'John Doe' }
  };

  @Bind()
  public getName(type: TAuthorType): string {
    return this.article[type].author.name;
  }
}
```

```html name="example.component.html" group="bind-example"
<a
  target="_blank"
  href="#"
>
<p>{%raw%}{{ type | map : getName }}{%endraw%}</p>
</a>
```

### Cache

Используется для кеширования результатов выполнения метода. 

**Интерфейс**

```ts
function Cache(clearCacheBeforeDestroy?: boolean): MethodDecorator;
```

**Параметры**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **clearCacheBeforeDestroy** | `boolean` | `false` | `false` | Нужно ли сбросить кешированные результаты после `ngOnDestroy` компонента или сервиса. |

**Использование**

В данном примере необходимо генерировать QR код для платежа исходя из его типа. Это операция является затратной по вычислениям. Т.к. количество типов платежа ограничено, мы можем использовать данный декоратор, чтобы операция создания QR кода выполнялась единожды для каждого типа платежа. Во второй и последующие разы декоратор будет проверять, создавал ли он ранее для этого типа платежа QR код или нет. И если по такому типу платежа QR код был создан, он отдаст готовый результат, минуя повторные вычисления.

```ts name="example.component.ts" group="cache-example" {1, 9}
import { Cache } from '@ngmd/utils/decorators';

type TPaymentType = 'OPEN-BANKING' | 'BANK-CARD' | 'GOOGLE-PAY';

@Component({/**/})
class ExampleComponent {
  public paymentType: InputSignal<TPaymentType> = input.required();

  @Cache()
  public getQrCodeByPaymentType(paymentType: TPaymentType): string {
    return generateQrCodeByType(paymentType);
  }
}
```

```html name="example.component.html" group="cache-example" {4}
<qrcode
  [imageHeight]="51"
  [imageWidth]="51"
  [qrdata]="getQrCodeByPaymentType(paymentType())"
/>
```

### OnChange

Позволяет подписаться на изменения входящих **input** параметров в компоненте. При изменении переданных в декоратор ключей **input** параметров, будет вызван декорируемый метод. Работает как для полей, объявленных через `@Input`, так и для `InputSignal`. Основан на работе хука жизненного цикла **ngOnChanges** и сериализации объекта `SimpleChanges`.

**Интерфейс**

```ts
function OnChange(dependsOn: string | string[]): MethodDecorator;
```

**Параметры**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **dependsOn** | `string \| string[]` | `true` | `undefined` | Названия полей input параметров, за которыми нужно следить. Если передано строка, то функция выполнится со значением поля в качестве первого параметра функции. Если передан массив строк, то будет возращен объект ключ-значение в качестве первого параметра функции. |

**Использование**

  - В методе `onInputIdChange` (*1) мы следим за изменением поля `id`. При каждом изменении этого input параметра извне, метод `onInputIdChange` будет выполняться с обновленным значением в качестве первого параметра. 
  - В методе `onInputMultiChange` (*2) мы следим за изменением 2-ух полей: `name` и `age`. При каждом изменении любого из этих input параметров извне, метод `onInputMultiChange` будет выполняться с обновленными значениями в виде объекта с полями `name` и `age`. Обратите внимание, что даже при изменении одного параметра в метод будет приходить объект c новым значением для изменяемого параметра и текущим для неизменяемого параметра.

```ts name="example.component.ts" {1, 10, 15}
import { OnChange } from '@ngmd/utils/decorators';

@Component({/*...*/})
class ExampleComponent {
  public id: InputSignal<string> = input.required();

  public name: InputSignal<string> = input.required();
  public age: InputSignal<number> = input.required();

  @OnChange('id') // * 1
  private onInputIdChange(id: string): void {
    console.log(id); // значение id;
  }

  @OnChange(['name', 'age'])  // * 2
  private onInputMultiChange(obj: { name: string; age: number; }): void {
    console.log(obj.name, obj.age); // объект с 2 полями name и age
  }
}
```

### Initialize

Позволяет подписаться на хук жизненного цикла `OnInit`. Все методы, использующие этот декоратор будут выполнены сразу после вызова `ngOnInit` в компоненте. Это позволяет избежать объявления хука `ngOnInit` для вызова типичных и повторяющихся методов.

**Интерфейс**

```ts
function Initialize(): MethodDecorator;
```

**Использование**

В этом примере методы `methodTwo` и `methodThree` будут вызваны сразу после `ngOnInit`;

```ts name="example.component.ts" {1, 10, 15}
import { Initialize } from '@ngmd/utils/decorators';

@Component({/**/})
class ExampleComponent implements OnInit {
  
  ngOnInit(): void {
    console.log(1);
  }

  @Initialize()
  private methodTwo(): {
    console.log(2);
  }

  @Initialize()
  private methodThree(): {
    console.log(3);
  }
}
```

> **NOTE**
> При использовании декоратора, объявление хука `OnInit` не обязательно.

### Destroy

Позволяет подписаться на хук жизненного цикла `OnDestroy`. Все методы, использующие этот декоратор будут выполнены сразу после вызова `ngOnDestroy` в компоненте или сервисе. Это позволяет избежать объявления хука `ngOnDestroy` для вызова типичных и повторяющихся методов.

**Интерфейс**

```ts
function Destroy(): MethodDecorator;
```

**Использование**

В этом примере методы `methodTwo` и `methodThree` будут вызваны сразу после `ngOnDestroy`;

```ts name="example.component.ts" {1, 10, 15}
import { Destroy } from '@ngmd/utils/decorators';

@Component({/**/})
class ExampleComponent implements OnDestroy {
  
  ngOnDestroy(): void {
    console.log(1);
  }

  @Destroy()
  private methodTwo(): {
    console.log(2);
  }

  @Destroy()
  private methodThree(): {
    console.log(3);
  }
}
```

> **NOTE**
> При использовании декоратора, объявление хука `OnDestroy` не обязательно.