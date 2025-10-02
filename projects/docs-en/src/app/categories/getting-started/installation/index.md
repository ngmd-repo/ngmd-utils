---
keyword: InstallationPage
---

---

### Description

This library provides a wide range of tools for automating and simplifying your Angular applications. It also offers declarative approaches to solving common development problems, helping you maintain a consistent codebase across multiple projects and making developer migration between them easier.

>**NOTE**
> The documentation in RU language is [here](https://md-utils.web.app)


### Installation

```sh
yarn add @ngmd/utils
# or
npm i @ngmd/utils
```

### Usage

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
