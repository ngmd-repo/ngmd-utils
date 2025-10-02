---
keyword: InstallationPage
---

---


### Описание

Данная библиотека предоставляет множество инструментов для автоматизации и упрощения работы Ваших Angular приложений. Так же эта библиотека предлагает декларативные подходы в решении типичных проблем при разработке, что позволит поддерживать кодовую базу множества проектов в едином стиле, облегчая миграцию разработчиков между ними.

>**NOTE**
> Документация на английском языке находится [здесь](https://md-utils-en.web.app/getting-started/installation)

### Установка

```sh
yarn add @ngmd/utils
# or
npm i @ngmd/utils
```


### Использование 

```typescript {1, 7}
import { OnChange } from '@ngmd/utils/decorators';

@Component({...})
class SomeComponent {
  public id: InputSignal<string> = input.required();

  @OnChange('id') 
  private onInputIdChange(id: string): void {
    // some code when input id changes
  }
}
```
