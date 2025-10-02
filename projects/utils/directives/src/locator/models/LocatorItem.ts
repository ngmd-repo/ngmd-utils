import { EnHtmlLocator } from '../enums/locator.directive.enums';

export class LocatorItem {
  constructor(
    public locatorValue: unknown,
    public locatorName: string = EnHtmlLocator.DEFAULT_KEY,
    public locatorChildren: TLocatorItemChild[] = null,
  ) {}

  public set<K extends keyof LocatorItem, V extends LocatorItem[K]>(
    this: LocatorItem,
    key: K,
    value: V,
  ): LocatorItem {
    this[key] = value;

    return this;
  }
}

export type TLocatorItemChild = {
  selector: string;
  locator: LocatorItem;
};
