import { assign, isJSType } from '@ngmd/utils/handlers';
import { ISimple } from '@ngmd/utils/interfaces';
import { TExtractParamsToObject } from '@ngmd/utils/types';

/**
 * @deprecated use @ngmd/requests
 */
export class RequestMeta<
  Value = any,
  Options extends TRequestOptions<TExtractParamsToObject<Url>> = null,
  const Url extends string = string,
> {
  public settings: TRequestSettings<Value, Url, Options> = null;

  constructor(urlOrSettings: TRequestSettings<Value, Url, Options> | Url) {
    const url: Record<'url', string> = isJSType(urlOrSettings, 'string')
      ? { url: urlOrSettings }
      : urlOrSettings;
    const settings: TRequestSettings<Value, Url, Options> = assign(
      {
        lazy: false,
        initialValue: null,
        options: null,
      },
      url,
    );

    this.settings = settings;
  }
}

export type TRequestSettings<
  Value,
  Url extends string,
  Options extends TRequestOptions<TExtractParamsToObject<Url>> = null,
> = {
  url: Url;
  lazy?: boolean;
  initialValue?: Value;
  options?: Options;
};

export type TRequestOptions<Params = null> = {
  params?: Params;
  query?: ISimple<boolean | number | string>;
};
