---
keyword: UseGetPage
---

Импортируется из `@ngmd/utils/http`

---

## Описание

На данной странице описан процесс взаимодействия с запросом типа **[GET]**

## useGet

Функция создания **[GET]** запроса

```ts
function useGet<Response, Options extends PartialUrlOptions = null>(
  meta: GetRequestMeta<Response, Options> | RequestUrl<UrlOptions>,
): GetRequest<Response, Options>
```

## GetRequest

Класс **[GET]** запроса

**Интерфейс**

```ts
class GetRequest<Response, Options extends UrlOptions = null> extends FetchRequest<
  Response,
  Options
> {
  // * Расширенные параметры
  constructor(urlOrMeta: GetRequestMeta<Response, Options> | RequestUrl<UrlOptions>) {}

  // * Дополнительные методы
  public load(opts?: GetLoadOptions<Response, Options>): Promise<Response> | Observable<Response>
}
```

## Методы

| Name | ReturnType | Description |
|----------|----------|----------|
| **load** | `Promise<Response>` \| `Observable<Response>` | Сделает запрос на сервер, если объект запроса **НЕ** находится в статусе `loaded` и вернет асинхронный поток (значение зависит от поля **valueLike**) с ожиданием результата этого запроса. Если объект запроса находится в статусе `loaded`, асинхронный поток вернет текущее `value`.<br>[Подробности](/http/resources/use-get#load) |


## Types

### GetRequestMeta

**Интерфейс**

```ts
type GetRequestMeta<Response, Options extends UrlOptions = null> = FetchRequestMeta<Response> & {
  force?: true | ForceMetaOptions<Options>,
};
```

**Описание**

| Name | Type | Required | Context | Description |
|----------|----------|----------|----------|----------|
| **force** | `ForceMetaOptions` \| `boolean` | `false` | <span class="tag" warning>Injection context only</span> | Отправить **http** запрос в момент создания объекта запроса.<br>[Подробности](/http/resources/use-get#force) |

### ForceMetaOptions

**Интерфейс**

```ts
type ForceMetaOptions<Options extends UrlOptions = null> = {
  urlOptions?: Options,
  httpOptions?: HttpClient?.GetMethodOptions,
};
```

### GetLoadOptions

**Интерфейс**

```ts
type GetLoadOptions<Response = any, Options extends UrlOptions = null> = {
  urlOptions?: Options,
  httpOptions?: HttpClient?.GetMethodOptions,
  sendOptions?: {
    stream: SendOptionsPipe<Response>
  },
  valueLike?: 'observer' | 'promise'
};
```

## Use cases

### load

Использование метода `load` может быть полезно в следующих случаях:

1.&nbsp;**Загрузка в** `ResolveFn`

Такое использование необходимо, когда компонент роутинга требует наличие данных в момент отрисовки

```ts name="service.ts" group="load-resolve"
class UserService {
  public user$: GetRequest<IUser, UrlOptions<{id: string}>> = useGet("@/users/{%raw%}{{id}}{%endraw%}");
}
```

```ts name="resolver.ts" group="load-resolve"
const userResolver: ResolveFn<Hero>= (
  route: ActivatedRouteSnapshot,
): Observable<IUser> => {
  const id: string = route.paramMap.get('id');

  return inject(UserService).user$.load({ urlOptions: { params: { id } } });
};
```

```ts name="route.ts" group="load-resolve"
const routes: Routes = [
  {
    path: 'users/:id',
    component: UserComponent,
    resolve: {user: userResolver},
    providers: [UserService]
  }
];
```

```ts name="user.component.ts" group="load-resolve"
@Component({...})
class UserComponent {
  public user: IUser = inject(UserService).user$.value();  // Данные загружены
}
```

<hr>

2.&nbsp;**Остановка потока**

Иногда возникают ситуации, когда дальнейшее кода выполнение невозможно без полученных данных. Для этого требуется остановить текущий поток кода, получить данные и далее продолжить сценарий

```ts name="service.ts" group="load-async"
class UserService {
  public user$: GetRequest<IUser, UrlOptions<{id: string}>> = useGet("@/users/{%raw%}{{id}}{%endraw%}");
}
```

```ts name="user.component.ts" group="load-async"
@Component({...})
class UserComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.loadUser();
  }

  private async loadUser(): Promise<void> {
    const id: string = this.route.snapshot.paramMap.get('id');
    const user: IUser = await this.userService.user$.load({
      urlOptions: { params: { id } },
      valueLike: 'promise',
    });

    console.log(user); // Данные загружены
  }
}
```

### force

Параметр `force` используется в момент создания `GetRequest` в рамках объекта `GetRequestMeta`.

При использовании этого параметра, вы буквально указываете следующее:

***В момент создания объекта запроса сделать *http* запрос за данными к api***

Т.о. данный параметр позволяет автоматизировать вызов **http** запроса при инициализации компонента

```ts {5, 11-13}
class UserComponent {
  // * Без параметров
  public users: GetRequest<IUser[]> = useGet({
    url: '@/users',
    force: true
  });

  // * С параметрами
  public user$: GetRequest<IUser, UrlOptions<{id: string}>> = useGet({
    url: '@/users/{%raw%}{{id}}{%endraw%}',
    force: {
      urlOptions: routeParams('id'),
    },
  });
}
```

Теперь каждый раз при создании компонента будет выполняться запрос.


> **WARNING**
> Данный параметр может использоваться при создании запроса только в рамках `injection-context` либо поля `force` типа `ApiHubConfig`