---
keyword: DecoratorsPage
---

Imported from `@ngmd/utils/decorators`

---

## Description

This module provides a small set of `typescript` decorators for simplifying and optimizing your codebase.

## Decorators

### Bind

Automatically binds a method to the class instance context, ensuring that _this_ always refers to the correct object.

**Interface**

```ts
function Bind(ctx?: unknown): MethodDecorator;
```

**Parameters**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **ctx** | `unknown` | `false` | `undefined` | Used when you need to replace the context. By default, always executes in the context of the class instance. |

**Usage**

In this example, the context inside the `map` pipe is lost because the pipe calls the method without explicitly binding the context to the original class. The `Bind` decorator solves this problem by ensuring the method is always called with the correct context.

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

Used for caching the results of a method execution.

**Interface**

```ts
function Cache(clearCacheBeforeDestroy?: boolean): MethodDecorator;
```

**Parameters**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **clearCacheBeforeDestroy** | `boolean` | `false` | `false` | Whether to clear cached results after the component or service's `ngOnDestroy`. |

**Usage**

In this example, you need to generate a QR code for a payment based on its type. This operation is computationally expensive. Since the number of payment types is limited, you can use this decorator so that the QR code is generated only once for each payment type. On subsequent calls, the decorator checks if it has already created a QR code for this payment type and returns the cached result, skipping repeated calculations.

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

Allows you to subscribe to changes of **input** parameters in a component. When the keys specified in the decorator change, the decorated method is called. Works for fields declared via `@Input` and for `InputSignal`. Based on the `ngOnChanges` lifecycle hook and serialization of the `SimpleChanges` object.

**Interface**

```ts
function OnChange(dependsOn: string | string[]): MethodDecorator;
```

**Parameters**

| Name | Type | Required | Default value | Description |
|----------|----------|----------|----------|----------|
| **dependsOn** | `string \| string[]` | `true` | `undefined` | Names of input fields to watch. If a string is passed, the function is called with the field value as the first parameter. If an array is passed, an object with key-value pairs is returned as the first parameter. |

**Usage**

  - In the `onInputIdChange` method (*1), we watch for changes to the `id` field. Each time this input parameter changes externally, the method is called with the updated value as the first parameter.
  - In the `onInputMultiChange` method (*2), we watch for changes to two fields: `name` and `age`. Each time either input parameter changes externally, the method is called with the updated values as an object with `name` and `age` fields. Note that even if only one parameter changes, the method receives an object with the new value for the changed parameter and the current value for the unchanged parameter.

```ts name="example.component.ts" {1, 10, 15}
import { OnChange } from '@ngmd/utils/decorators';

@Component({/*...*/})
class ExampleComponent {
  public id: InputSignal<string> = input.required();

  public name: InputSignal<string> = input.required();
  public age: InputSignal<number> = input.required();

  @OnChange('id') // * 1
  private onInputIdChange(id: string): void {
    console.log(id); // value of id;
  }

  @OnChange(['name', 'age'])  // * 2
  private onInputMultiChange(obj: { name: string; age: number; }): void {
    console.log(obj.name, obj.age); // object with 2 fields name and age
  }
}
```

### Initialize

Allows you to subscribe to the `OnInit` lifecycle hook. All methods using this decorator will be executed immediately after `ngOnInit` is called in the component. This avoids declaring the `ngOnInit` hook for typical and repetitive methods.

**Interface**

```ts
function Initialize(): MethodDecorator;
```

**Usage**

In this example, the `methodTwo` and `methodThree` methods will be called immediately after `ngOnInit`;

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
> When using the decorator, declaring the `OnInit` hook is optional.

### Destroy

Allows you to subscribe to the `OnDestroy` lifecycle hook. All methods using this decorator will be executed immediately after `ngOnDestroy` is called in the component or service. This avoids declaring the `ngOnDestroy` hook for typical and repetitive methods.

**Interface**

```ts
function Destroy(): MethodDecorator;
```

**Usage**

In this example, the `methodTwo` and `methodThree` methods will be called immediately after `ngOnDestroy`;

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
> When using the decorator, declaring the `OnDestroy` hook is optional.