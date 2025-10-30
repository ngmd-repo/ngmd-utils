---
keyword: StyleGuidesPage
---

---

### Description  

This guide describes the main rules for writing code in SPA applications. It helps keep most of the company's project codebases in a unified style, making developer migration between projects easier and reducing routine questions.

### List of Rules  

1. [General](/getting-started/style-guides#general)
2. [Pages](/getting-started/style-guides#pages)
3. [Modules](/getting-started/style-guides#modules)
4. [Features](/getting-started/style-guides#features)
5. [Components](/getting-started/style-guides#components)
6. [Routes](/getting-started/style-guides#routes)
7. [Interfaces](/getting-started/style-guides#interfaces)
8. [Types](/getting-started/style-guides#types)
9. [Enums](/getting-started/style-guides#enums)
10. [Classes](/getting-started/style-guides#classes)
11. [Models](/getting-started/style-guides#models)
12. [API](/getting-started/style-guides#api)
13. [Service](/getting-started/style-guides#service)
14. [State](/getting-started/style-guides#state)
15. [Actions](/getting-started/style-guides#actions)
16. [Store](/getting-started/style-guides#store)
17. [DB](/getting-started/style-guides#db)
18. [Constants](/getting-started/style-guides#constants)
19. [Handlers](/getting-started/style-guides#handlers)
20. [Application](/getting-started/style-guides#application)
21. [Libraries](/getting-started/style-guides#libraries)

### General

When creating any Angular project, before starting development, you must install:

1. [`@ngmd/git-flow`](https://github.com/ngmd-repo/ngmd-git-flow) - library for standardization and validation of commit messages, branch names  
2. [`@ngmd/linter`](https://github.com/ngmd-repo/ngmd-linter) - a library for standardizing the rules of writing code using eslint, tslint, stylelint, prettier

> **NOTE**
> Please note that each library has **cli** commands for automatically connecting project configuration files.

### Pages
 
1. All pages must be stored in the ***./pages*** folder

    1.1 All root pages must be stored at ***./src/app/pages***
    
    1.2 All internal pages (routes) used in the parent route template must be stored at ***./{parent-page}/pages/{child-page}***

2. Use `kebab-case` for folder naming

3. A page is a component that has its own path in the routing tree

4. All child components used in the parent component template must be stored in the ***./components*** folder

5. All internal **pages** (routes) must repeat the file structure of the root directory of the parent route.

6. All shared types, services, models, etc. for components and child routes must be stored in the root directory of the parent route

7. Each page, if necessary, must have an ***index.ts*** file in the root directory, exporting elements needed by other pages

Example of a correct structure for the **documents** page with child pages (routes) **agreement**, **maf**, **nda**:


![Page](assets/images/getting-started/style-guides/pages.png)

### Modules

1. Modules must be stored in the ***./modules*** folder

2. Use `kebab-case` for folder naming

3. The module name must include the parent component name

4. Module location can be:

    4.1 ***.src/core*** directory if the module is used throughout the application
    
    4.2 ***./modules*** directory of the parent **page** (route) if the module is used within the page and its descendants

5. Module creation may be based on the following rules:

    5.1 The module must have its own component, not being a separate page

    5.2 The module must have an API connection
    
    5.3 The module may be used in one or more places in the application, isolating functionality not directly related to the usage context

6. The module must repeat the folder and file structure presented in this guide

7. If the module exports services, a provide function must be implemented in ***./providers/index.ts***. Example:  

    ```ts name="./providers/index.ts"
    export function provideWeatherModule(): Provider[] {...}
    ```

8. The module's root directory must have an ***./index.ts*** file exporting all public elements of the module

Example of a **weather** module used in **app.component**:

![Modules](assets/images/getting-started/style-guides/modules.png)

### Features

1. All features must be stored in the ***./features*** folder

2. Use `kebab-case` for folder naming

3. Use the `{PascalCase}Feature` pattern for exported feature service class names

4. Feature location can be:

    4.1 ***.src/core*** directory if the feature is used throughout the application

    4.2 ***./features*** directory of the parent **page** (route) if the feature is used within the page and its descendants

5. Feature creation may be based on the following rules:

    5.1 The feature <b style="color: #ed4141">SHOULD NOT</b> have its own component

    5.2 The feature may/should (depending on context) have an API connection

    5.3 The feature may be used in one or more places in the application

6. Most often, feature functionality is implemented in one or more services

7. The feature must repeat the folder and file structure presented in this guide

8. To export services, a provide function must be implemented in ***./providers/index.ts***. Example:  

      ```ts name="./providers/index.ts"
      export function provideWebsocketFeature(): Provider {...}
      ```

9. The feature's root directory must have an ***./index.ts*** file exporting all public elements

Example of a websocket module initialized in app.component:

![Features](assets/images/getting-started/style-guides/features.png)

### Components
 

1. All components must be stored in the ***./components*** folder

2. If the component decorator's imports or providers field has more than 2 imported entities, move them to ***./imports/index.ts***

3. Use `{PascalCase}Imports` and `{PascalCase}Providers` for naming imports and providers arrays: 

    ```ts name="./imports/index.ts"
      import { Provider, Type } from '@angular/core';
      import { RouterOutlet } from '@angular/router';

      export const ExampleComponentImports: Type<unknown>[] = [RouterOutlet];
      
      export const ExampleComponentProviders: Provider[] = [SomeService];
    ```

4. All component fields used in the template must have the `protected` access modifier, unless referenced via `viewChild`, `contentChild`, etc.

5. All fields not used in the template must have the `private` access modifier, unless used in inheritance.

6. All nested components must be in the ***./components*** folder of the parent component and always have an identical folder structure.

Example of a correct structure for the ***./components/modal-popup*** component:

![Components](assets/images/getting-started/style-guides/components.png)

### Routes

1. The routes file must be stored in the ***./routes*** folder

2. The ***./routes*** folder must be in the root of the parent component of this route

3. The file name must be ***index.ts***

4. Use the **{PascalCase}Routes** pattern for naming the routes array

5. If more than 2 services are registered in the **providers** field of a route, they must be placed in a constant named `{PascalCase}RouteProviders` in the current routes file

6. All **children** fields in the route object must be imported arrays from the directories of their root modules.

7. All child routes must repeat the identical structure

Example of correct **routes** creation:

```ts name="./routes/index.ts"
import { SomePageChildrenRoutes, somePageRouteProviders } from '../pages/some-page';

const AppRouteProviders: (EnvironmentProviders | Provider)[] = [AppService, AnotherAppService];

export const appRoutes: Routes  = [
  { 
    path: '', 
    component: AppComponent, 
    providers: AppRouteProviders,
  },
  { 
    path: 'some-page', 
    loadComponent: () => import("../pages/some-page/some-page.component").then(({ SomePageComponent }) => SomePageComponent), 
    children: SomePageChildrenRoutes, 
    providers: somePageRouteProviders() 
  },
];
```

### Interfaces

1. All interfaces must be stored in the ***./interfaces*** folder

2. Use the `{kebab-case}.interface.ts` pattern for file naming

3. Use the `I{PascalCase}` pattern for interface naming

4. Interface storage levels are determined by component nesting levels:

    4.1 If the interface is used in parallel components, it must be stored in the root of the parent component.

    4.2 If the interface is used only in the component and/or its descendants, it must be stored in the root of that component

5. Creating an interface is justified in the following cases:

    5.1 If the described data is received or sent via API

    5.2 If the interface is implemented by multiple entities such as [Classes](/getting-started/style-guides#classes) or [Models](/getting-started/style-guides#models)

    5.3 If the interface describes the functionality of any `InjectionToken` (directive, component, pipe, service, etc.)

6. The interface declaration must always be at the top of the file. Related parts such as enums, types, etc. must be placed below the parent interface declaration. This allows you to focus on the main entity when opening the file.

Example of correct interface creation:

```ts name="./interfaces/user.interface.ts"
  export interface IUser {
    id: string;
    status: TUserStatus;
    role: EnUserRole;
  }

  export type TUserStatus = "active" | "disabled";

  export const enum EnUserRole {
    DEFAULT,
    ADMIN
  }
```

### Types

1. Type files must be stored in the ***./types*** folder

2. File naming must follow these rules:

    2.1 If there is only one file - ***index.ts***

    2.2 If more than one file - `{kebab-case}.types.ts`

3. Use the `T{PascalCase}` pattern for type naming

4. Type storage conditions:

    4.1 If the type is used only in the component and its descendants, it must be stored within its component.

    4.2 If the type is used in parallel components, it must be stored within the parent component.

    4.3 If the type relates only to an entity such as [Classes](/getting-started/style-guides#classes), [Models](/getting-started/style-guides#models), [Interfaces](/getting-started/style-guides#interfaces), [States](/getting-started/style-guides#states), it must be stored in the file of its entity

5. Types <b style="color: #ed4141">SHOULD NOT</b> be used when interacting with API (in most cases)

Example of correct type storage:

```ts name="./types/index.ts"
  export type THeaderConfig = {
    title: string;
    description: string;
  }

  export type TNavOption = {
  url: string;
  title: string;
  }

  export type TNavOptions = TNavOption[];
```

### Enums

1. Enum files must be stored in the ***./enums*** folder

2. File naming must follow these rules:

    2.1 If there is only one file - ***index.ts***
    
    2.2 If more than one file - `{kebab-case}.enum(s).ts`

3. Enum storage conditions:

    3.1 If the enum is used only in the component and its descendants, it must be stored within its component.

    3.2 If the enum is used in parallel components, it must be stored within their parent component.

    3.3 If the enum relates only to an entity such as [Classes](/getting-started/style-guides#classes), [Models](/getting-started/style-guides#models), [Interfaces](/getting-started/style-guides#interfaces), [States](/getting-started/style-guides#states), it must be stored in the file of its entity

4. All enums must be declared using `const`

5. All enum fields must use the `SNAKE_UPPER_CASE` notation

6. Use the `En{PascalCase}` pattern for enum naming

Example of correct **enum** creation:

```ts name="./enums/index.ts"
  export const enum EnMessageState {
    FAILED,
    WARNING,
    SUCCESS
  }
  export const enum EnSomeType = {
    SOME_TYPE,
    ANOTHER_SOME_TYPE
  }
```

### Classes
 
1. Class files must be stored in the ***./classes*** folder

2. Use the `{kebab-case}.class.ts` pattern for file naming

3. Use the `PascalCase` pattern for class naming

4. Class storage conditions:

    4.1 If the class is used only in the component and its descendants, it must be stored within its component.

    4.2 If the class is used in parallel components, it must be stored within their parent component.

5. The class declaration must always be at the top of the file. Related parts such as enums, types, etc. must be placed below the parent class declaration.

6. Creating a class is justified in the following cases:

    6.1 If the class implements logic for working with, storing, mapping, managing, etc. various data (for example, hides the implementation for working with step-by-step form data)

    6.2 If the class isolates a certain set of semantically related functionality (for example, implements a set of methods for form validation)

Example of correct class usage:

```ts name="./classes/form-pattern.class.ts"
export class FormPattern {

  public static get NUMBERS(): RegExp {
    return new RegExp(/^[0-9]+$/);
  }

  public static get HTTP_URL(): RegExp {
    return new RegExp(/^(https?:\/\/)?([a-z0-9-]+[.]{1}){1,3}\w{2,10}$/i);
  }

  public static get EMAIL(): RegExp {
    return new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  }
  // ...
}
```

### Models
 
1. Model files must be stored in the ***./models*** folder

2. Use the **{kebab-case}.model.ts** pattern for file naming

3. Use the `PascalCase` pattern for class naming

4. Model storage conditions:

    4.1 If the model is used only in the component and its descendants, it must be stored within its component.

    4.2 If the model is used in parallel components, it must be stored within their parent component.

5. The model declaration must always be at the top of the file. Related parts such as enums, types, etc. must be placed below the parent model declaration.

6. Creating a model is justified in the following cases:

    6.1 If the described data is received or sent via API, but minimal logic is required when preparing the data (for example, modifying incoming values when creating a class instance, using default values) 

    6.2 If the described data requires the same conditions as in point 4.1, without API binding (for example, a getter method that transforms stored model data into the required format)

Example of correct model usage:

```ts name="./models/form-range.model.ts"
export class FormRange {
  constructor(
    public from: number,
    public to: number,
  ) {}

  public getRangePercents(): string {
    const { from, to } = this;

    return `${from}-${to}`;
 }
}
```

### API

1. For working with **API** use the [**@ngmd/utils/http**](/http) module

2. ApiHub must be stored in the ***./api*** folder

3. ApiHub file naming must follow these rules:

    3.1 If there is only one file - ***index.ts***

    3.2 If more than one file - `{kebab-case}.api-hub.ts`

4. The ApiHub class name must follow the ***{PascalCase}ApiHub*** pattern:

    ```ts name="./api/index.ts"
    export class UsersApiHub {
      public getUsers$: GetRequest<IUser[]> = useGet("@/users"); 
    }
    ```

5. The ApiHub variable name when used in a component must follow the `{camelCase}Hub$` pattern:

    ```ts
    public usersHub$: ApiHub<UsersApiHub> = useApiHub(UsersApiHub);
    ```

6. When creating a request, the variable name must follow the final notation:

    ```ts
    public getUsers$: GetRequest<IUser[]> = useGet("@/users");
    ```

7. For creating urlOptions parameters always use the `UrlOptions` type

8. urlOptions can be created:

  8.1 In components if these types are not exported

  8.2 In the **ApiHub** file under the class definition, in the ***./types/index.ts*** folder if types are exported 

### Service

1. The service file must be stored in the **./services** folder 

2. File naming must follow these rules:

    2.1 If there is only one file - **index.ts**

    2.2 If more than one file - `{kebab-case}.service.ts`

3. Use the `{PascalCase}Service` pattern for class naming

4. The following entities may have a service:

    4.1 [Page](/getting-started/style-guides#pages)

    4.2 [Module](/getting-started/style-guides#modules)

    4.3 [Feature](/getting-started/style-guides#features)

    4.4 [Component](/getting-started/style-guides#components)

5. Service storage conditions:

    5.1 If the service is used in the component and its descendants, it must be stored within its component.

    5.2 If the service is used in parallel components, it must be stored within their parent component.

    5.3 If the service is used in entities other than a component, it must be stored in the root directory of its entity

6. **Service** may have its own set of [Actions](/getting-started/style-guides#actions)

7. Service tasks may include:

    7.1 Providing communication between parent and child components via shared states and methods

    7.2 Implementing API request logic and handling

    7.2 Isolating contextual logic within the entity to which the service belongs

8. All child entities may inject the parent entity's service 

9. To return the service to its default state, depending on context, use the `ngOnDestroy` or `destroy` methods

Example of a correctly created service file belonging to a component:

![Service](assets/images/getting-started/style-guides/service.png)

### State

1. For working with state use the [**@ngmd/utils/state**](/state) module

2. The state file must be stored at ***./state***

3. File naming must follow these rules:

    3.1 If there is only one file - **index.ts**

    3.2 If more than one file -  **{kebab-case}.state.ts**

4. Use the **{PascalCase}State** pattern for class naming

5. Use the **{camelCase}State** pattern for field naming in the component

Example of a correctly created **state** file:

```ts name="./state/index.ts"
import { TShowState } from '@ngmd/utils/types';

export class UsersState {
  public editModalVisibleState: TShowState = 'hide';
  public isUserActive: boolean = false;
}
```

### Actions

1. For working with events use the [**@ngmd/utils/actions**](/actions) module

2. The events file must be stored in the ***./actions*** folder

3. File naming must follow these rules:

    3.1 If there is only one file - either **index.ts**

    3.2 If more than one file - **{kebab-case}.actions.ts**

4. Use the **T{PascalCase}Actions** pattern for event list type naming

5. Use the `kebab-case` pattern for event string type naming

6. Use the **{SNAKE_CASE}_ACTIONS** pattern for event access token naming

7. Use the **{camelCase}Actions$** pattern for variable naming in the component

Example of a correctly created event list file:

```ts name="./actions/index.ts"
export type TModalActions =
  | ChannelAction<'hide-modal'>
  | ChannelAction<'show-modal', boolean>
  | ChannelAction<'toggle-modal', TShowState>; // event list

export const MODAL_ACTIONS = ActionsChannelToken<TModalActions>('MODAL'); // token 
```

### Store
 
1. For working with storage use the [**@ngmd/utils/store**](/store) module

2. The storage file must be stored in the ***./store*** folder

3. File naming must follow these rules:

    3.1 If there is only one file - **index.ts**

    3.2 If more than one file -  **{kebab-case}.store.ts**

4. Use the **{PascalCase}Store** pattern for class naming

5. Use the **{camelCase}Store** pattern for field naming in the component

6. Store may only be used for storing data received via API

Example of a correctly created storage file:

```ts name="./store/index.ts"
import { IUser } from '../interface/user.interface';

export class UsersStore {
  public users: IUser[] = null;
  public user: IUser = null;
}
```

### DB
 
1. For working with static data use the [**@ngmd/utils/db**](/db) module

2. The data file must be stored at ***./db***

3. File naming must follow these rules:

    3.1 If there is only one file - **index.ts**
    
    3.2 If more than one file -  **{kebab-case}.db.ts**

4. Use the **{PascalCase}DB** pattern for object naming 

5. All static data used in the business logic of the application must be stored in **db**

6. For naming keys with data related to a specific component, it is preferable to create a key with the component name and a value as an object containing only that component's data

Example of correct static data storage:


```ts name="./db/index.ts"
export const ExampleDB = {
  header: {
    default: {
      title: 'Default title',
      description: 'Default description'
    },
    security: {
      title: 'Security title',
      description: 'Security description'
    }
    //...
  },
  footer: {
    options: [
      new FooterOption(/*...*/),
      new FooterOption(/*...*/),
      new FooterOption(/*...*/)
    ]
  }
  //...
} as const; // using as const is optional
```

### Constants

1. The constants file must be stored in the **./constants** folder

2. File naming must follow these rules:

    2.1 If there is only one file - **index.ts**

    2.2 If more than one file - `{kebab-case}.constants.ts`

3. Use the `{SNAKE_UPPER_CASE}` pattern for constant naming

4. For storing technical or strict constant values in libraries or applications, it is allowed to use constants if values need to be isolated from storage in [DB](/getting-started/style-guides#db) or [Enums](/getting-started/style-guides#enums).

### Handlers

1. The handlers file must be stored in the **./handlers** folder

2. File naming must follow these rules:

    2.1 If there is only one file - either **index.ts**

    2.2 If more than one file -  `{kebab-case}.handlers.ts`

3. For isolating certain logic, it is also allowed to create and use helper functions that implement routine repetitive logic in many parts of the application.

4. For choosing storage, follow these rules:
    4.1 If the function is used throughout the application, it should be stored at ***./app/core/handlers/index.ts***. If there are many helpers, you can use contextual naming: ***string.handlers.ts***, ***condition.handlers.ts***, etc. In this case, **index.ts** will re-export the functionality of these files.

    4.2 If the function is used only in a specific entity and/or its descendants, it should be stored in the root directory of its entity

Example of the **handlers** directory for the entire application ***./app/core/handlers***:


![Handlers](assets/images/getting-started/style-guides/handlers.png)
 

And functionality in the example file **string.handlers.ts**:

```ts name="./handlers/string.handlers.ts"
export function titlecase<T extends string>(str: T): Capitalize<T> {
  // ...
}
export function prefix(str: unknown, tag: string): string {
  // ...
}
// ...
```

### Application
 

All product applications:

1. Must have the prefix `ng`

2. Must use `scss` for styling

3. Must be `standalone`

4. Use the `OnPush` strategy

5. For storing the most common parts of the application (components, pipes, directives, etc.), use the ***./app/core*** directory with the alias tag `@core` specified in the `paths` field of ***tsconfig.json***. Each module must also have an **index.ts** file exporting the necessary entities.

Example of a correctly structured ***./src/app/core*** folder:

![Application Core](assets/images/getting-started/style-guides/application-core.png)

### Libraries

All libraries:

1. Must have a library name prefix (shortened if the name is long) 

2. Must use `scss` for styling

3. Must be `standalone`

4. Use the `OnPush` strategy

5. Have an exported provide function for injection into consumer applications (e.g. `provideSomeLibrary()`)

6. Export only functionality intended for external use