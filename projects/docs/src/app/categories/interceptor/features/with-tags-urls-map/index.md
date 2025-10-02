---
keyword: WithTagsUrlsMapPage
---

Импортируется из `@ngmd/utils/interceptor`

---

## Описание

*Feature-функция* для использования множественной **tag:host** конфигурации 

**Интерфейс**

```ts
function withTagsUrlsMap(tagsMap: 
  InterceptorTagsMap | () => InterceptorTagsMap
): TagsUrlsMapFeature 
```

>**NOTE**
> Параметр **tagsMap** может быть передан, как самостоятельный объект, так и в виде функции-фабрики, которая должна его возвращать. В рамках функции-фабрики можно производить инъекции зависимостей при помощи функции `inject` из `@angular/core`. Так же использование через функцию поможет избежать объявления геттер функций для полей конфига, если есть взаимосвязь с получением данных из `provideUtilsInitializer`

**Использование**

1. Обычный объект: 

```ts name="app.config.ts"
import { provideUtilsInterceptor, withTagsUrlsMap, InterceptorTagsMap } from '@ngmd/utils/interceptor';
import { environment } from '@env/environment';

const tagsMap: InterceptorTagsMap = {
  '@app': environment.API_HOST,
  '@products': environment.API_PRODUCTS_HOST,
};

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(withTagsUrlsMap(tagsMap))
  ],
};
```

2. Функция-фабрика: 

```ts name="app.config.ts"
function tagsMapFactory(): InterceptorTagsMap {
  const productsConfigService = inject(ProductsConfigService);

  return {
    '@app': environment.API_HOST,
    '@products': productsConfigService.getHost(), // используем инжектирование
  }
} 

export const AppConfig: ApplicationConfig = {
  providers: [
    provideUtilsInterceptor(
      withTagsUrlsMap(tagsMapFactory),
    )
  ],
};
```

Создание запросов:

```ts
@Component(/**/)
export class ExampleComponent {
  protected users$: GetRequest<IUser> = useGet("@app/users");
  protected createProduct$: PostRequest<ProductCandidate, IProduct> = usePost("@products/create");
}
```

Теперь во время выполнения всех запросов приложения теги будут заменяться на соответствующие им значения из объекта **tagsMap**.

## Types

### InterceptorTagsMap

Объект типа ключ-значение, где ключ - это тег, скрывающий хост URL адреса, а значение, сам host, на который будет заменяться тег 

**Интерфейс**
```ts
type InterceptorTagsMap = {
  [tag: string]: string; // tag:host
};
```
